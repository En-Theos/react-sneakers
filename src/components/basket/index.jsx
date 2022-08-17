import { useEffect, useState } from 'react';
import axios from 'axios';

import Status from '../status';

import cross from './image/cross.svg';
import './basket.scss';

export default function Basket(props) {
    const { showIf, setShowBasket, sumPrice, onSumPrice, data, onBasketData } = props;
    const [status, setStatus] = useState('empty');

    const display = showIf ? {display: "flex"} : {display: "none"};

    if (showIf) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <aside className='basket' style={display} onClick={(event) => {
            if (event.target.classList.contains("basket")) {
                setShowBasket(false);
                setStatus("empty");
            }
        }}>
            <div className='basketMain'>
                <p>Корзина</p>
                {+localStorage.getItem("basket") 
                ? <AddingGoods setStatus={setStatus} data={data} sumPrice={sumPrice} onSumPrice={onSumPrice} onBasketData={onBasketData}/> 
                : <ItemStatus status={status} setShowBasket={setShowBasket} setStatus={setStatus}/>}
            </div>
        </aside>
    )
}

function ItemStatus(props) {
    const { status, setShowBasket, setStatus } = props;

    return (
        <div className='boxStatus'>
            <Status mod={status} setStatus={setStatus} setShowBasket={setShowBasket}/>
        </div>
    )
}

function AddingGoods(props) {
    const { data, sumPrice, onSumPrice, setStatus, onBasketData } = props;

    const elements = [];

    data.forEach(item => {
        elements.push((
            <div  className='cardBasket' key={item.id}>
                <div className="image">
                    <img src={item.image} alt="" />
                </div>
                <div className='info'>
                    <p className='name'>{item.sneakerName}</p>
                    <p className='price'>{item.price}</p>
                </div>
                <button onClick={() => {
                    item.basket = false;
                    axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${item.id}`, item).then(() => {
                        onBasketData(item, "delete");
                        onSumPrice(-(+item.price.replace(/\D/g, '')));
                        localStorage.setItem("basket", +localStorage.getItem("basket") - 1);
                    });
                }} className='delete'>
                    <img src={cross} alt="cross" />
                </button>
            </div>
        ));
    });

    function onSubmit() {
        const request = data.map(item => {
            item.basket = false;
            item.purchases = true;
            return axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${item.id}`, item);
        });

        Promise.all(request).then(() => {
            setStatus("formalization");
            localStorage.setItem("basket", 0);
            localStorage.setItem("purchases", data.length);
            onSumPrice(-sumPrice);
        });
    }

    return (
        <div className='addingGoods'>
            <div className='cardsBasket'>
                {elements}
            </div>
            <div className='submitOrder'>
                <div className='totalPrice'><pre>Итого: </pre><pre> {sumPrice} руб.</pre></div>
                <div className='tax'><pre>Налог 5%: </pre><pre> {Math.round(sumPrice * 0.05)} руб.</pre></div>
                <button onClick={onSubmit} className='order'>
                    <p>Оформить заказ</p>
                </button>
            </div>
        </div>
    )
}