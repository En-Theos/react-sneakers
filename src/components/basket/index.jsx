import Status from '../status';

import cross from './image/cross.svg';
import './basket.scss';

export default function Basket() {
    const itemStatus = (
        <div className='boxStatus'>
            <Status status={"formalization"}/>
        </div>
    )

    return (
        <aside className='basket'>
            <div className='basketMain'>
                <p>Корзина</p>
                {itemStatus}
            </div>
        </aside>
    )
}

function AddingGoods() {
    return (
        <div className='addingGoods'>
            <div className='cardsBasket'>
                <div className='cardBasket'>
                    <div className="image">
                        <img src="image/product1.png" alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>Мужские Кроссовки Nike Air Max 270</p>
                        <p className='price'>12 999 руб.</p>
                    </div>
                    <button className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
                <div className='cardBasket'>
                    <div className="image">
                        <img src="image/product1.png" alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>Мужские Кроссовки Nike Air Max 270</p>
                        <p className='price'>12 999 руб.</p>
                    </div>
                    <button className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
                <div className='cardBasket'>
                    <div className="image">
                        <img src="image/product1.png" alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>Мужские Кроссовки Nike Air Max 270</p>
                        <p className='price'>12 999 руб.</p>
                    </div>
                    <button className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
                <div className='cardBasket'>
                    <div className="image">
                        <img src="image/product1.png" alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>Мужские Кроссовки Nike Air Max 270</p>
                        <p className='price'>12 999 руб.</p>
                    </div>
                    <button className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
                <div className='cardBasket'>
                    <div className="image">
                        <img src="image/product1.png" alt="" />
                    </div>
                    <div className='info'>
                        <p className='name'>Мужские Кроссовки Nike Air Max 270</p>
                        <p className='price'>12 999 руб.</p>
                    </div>
                    <button className='delete'>
                        <img src={cross} alt="cross" />
                    </button>
                </div>
            </div>
            <div className='submitOrder'>
                <div className='totalPrice'><pre>Итого: </pre><pre> 21 498 руб.</pre></div>
                <div className='tax'><pre>Налог 5%: </pre><pre> 1074 руб.</pre></div>
                <button className='order'>
                    <p>Оформить заказ</p>
                </button>
            </div>
        </div>
    )
}