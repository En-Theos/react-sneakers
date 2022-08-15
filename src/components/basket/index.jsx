import { useEffect, useState } from 'react';
import axios from 'axios';

import Status from '../status';

import cross from './image/cross.svg';
import './basket.scss';

export default function Basket(props) {
    const { showIf, onShowBasket, sumPrice, onSumPrice } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (showIf) {
            axios.get("https://62f8d7563eab3503d1dc1d9a.mockapi.io/all").then((d) => {
                setData(d.data);
            });
        }
    }, [showIf])

    const display = showIf ? {display: "flex"} : {display: "none"};

    if (showIf) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }

    return (
        <aside className='basket' style={display} onClick={(event) => {
            if (event.target.classList.contains("basket")) {
                onShowBasket(false);
            }
        }}>
            <div className='basketMain'>
                <p>Корзина</p>
                {+localStorage.getItem("basket") ? <AddingGoods data={data} sumPrice={sumPrice} onSumPrice={onSumPrice}/> : <ItemStatus onShowBasket={onShowBasket}/>}
            </div>
        </aside>
    )
}

function ItemStatus({onShowBasket}) {
    return (
        <div className='boxStatus'>
            <Status mod={"empty"} onShowBasket={onShowBasket}/>
        </div>
    )
}

function AddingGoods(props) {
    const { data, sumPrice, onSumPrice } = props;

    const elements = [];

    data.forEach(item => {
        if (item.basket) {
            elements.push((
                <div  className='cardBasket' key={item.id}>
                    <div className="image">
                        <img src={item.image} alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>{item.sneakerName}</p>
                        <p className='price'>{item.price}</p>
                    </div>
                    <button onClick={(event) => {
                        const element = event.currentTarget;
                        item.basket = false;
                        axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${item.id}`, item).then(() => {
                            element.parentElement.style.display = 'none';
                            onSumPrice(-(+item.price.replace(/\D/g, '')));
                            localStorage.setItem("basket", +localStorage.getItem("basket") - 1);
                        });
                    }} className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
            ));
        }
    });

    return (
        <div className='addingGoods'>
            <div className='cardsBasket'>
                {elements}
            </div>
            <div className='submitOrder'>
                <div className='totalPrice'><pre>Итого: </pre><pre> {sumPrice} руб.</pre></div>
                <div className='tax'><pre>Налог 5%: </pre><pre> {Math.round(sumPrice * 0.05)} руб.</pre></div>
                <button className='order'>
                    <p>Оформить заказ</p>
                </button>
            </div>
        </div>
    )
}