import { useState } from 'react';
import axios from 'axios';

import Status from '../status';

import cross from './image/cross.svg';
import './basket.scss';

export default function Basket(props) {
    const { showIf, setShowBasket, sumPrice, onSumPrice, data, onAllData } = props;
    const [status, setStatus] = useState('empty');

    const display = showIf ? { display: "flex" } : { display: "none" };

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
                <div className='basketHeader'>
                    <p>Корзина</p>
                    <button onClick={() => {
                        setShowBasket(false);
                        setStatus("empty");
                    }}>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
                {+localStorage.getItem("basket")
                    ? <AddingGoods setStatus={setStatus} data={data} sumPrice={sumPrice} onSumPrice={onSumPrice} onAllData={onAllData} />
                    : <ItemStatus status={status} setShowBasket={setShowBasket} setStatus={setStatus} />}
            </div>
        </aside>
    )
}

function ItemStatus(props) {
    const { status, setShowBasket, setStatus } = props;

    return (
        <div className='boxStatus'>
            <Status mod={status} setStatus={setStatus} setShowBasket={setShowBasket} />
        </div>
    )
}

function AddingGoods(props) {
    const { data, sumPrice, onSumPrice, setStatus, onAllData } = props;

    const basketItems = data.filter(item => item.basket);
    const elements = [];

    function onRemoveBasket(item) {
        const newData = { ...item, basket: false };
        axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${item.id}`, newData).then(() => {
            onAllData([newData], [newData.id]);
            onSumPrice(-(+item.price.replace(/\D/g, '') * item.basket));
            localStorage.setItem("basket", +localStorage.getItem("basket") - 1);
        });
    }

    basketItems.forEach(item => {
        elements.push((
            <div className='cardBasket' key={item.id}>
                <p className='count'>{item.basket}</p>
                <div className="image">
                    <img src={item.image} alt="" />
                </div>
                <div className='info'>
                    <p className='name'>{item.sneakerName}</p>
                    <p className='price'>{item.price}</p>
                </div>
                <button onClick={() => onRemoveBasket(item)} className='delete'>
                    <img src={cross} alt="cross" />
                </button>
            </div>
        ));
    });

    function onSubmit() {
        const newObj = [], indexObj = [];

        const request = basketItems.map(item => {
            const newData = { ...item, basket: false, 
                purchases: (+item.purchases + +item.basket), 
                quantityInStock: item.quantityInStock - item.basket};
            newObj.push(newData);
            indexObj.push(newData.id);
            return axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${item.id}`, newData);
        });

        Promise.all(request).then(() => {
            onAllData(newObj, indexObj)
            setStatus("formalization");
            localStorage.setItem("basket", 0);
            localStorage.setItem("purchases", newObj.length);
            onSumPrice(-sumPrice);
        });
    }

    return (
        <div className='addingGoods'>
            <div className='cardsBasket'>
                {elements}
            </div>
            <div className='submitOrder'>
                <div className='totalPrice'><pre>Разом: </pre><pre> {sumPrice} грн.</pre></div>
                <div className='tax'><pre>Податок 5%: </pre><pre> {Math.round(sumPrice * 0.05)} грн.</pre></div>
                <button onClick={onSubmit} className='order'>
                    <p>Оформити замовлення</p>
                </button>
            </div>
        </div>
    )
}