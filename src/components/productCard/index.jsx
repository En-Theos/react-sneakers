import plus from './image/plus.svg';
import sheck from './image/check.svg';
import redHeart from './image/red_heart.svg';
import borderHeart from './image/border_heart.svg';
import './productCard.scss';

export default function ProductCard() {
    return (
        <div className="card">
            <button className='favorites'>
                <img src={borderHeart} alt="no favorites" />
            </button>
            <div className='productImg'>
                <img src="image/product1.png" alt="productImg" />
            </div>
            <p className='productName'>Мужские Кроссовки Nike Blazer Mid Suede</p>
            <div className='order'>
                <p><span>Цена:</span><br />12 999 руб.</p>
                <button>
                    <img src={plus} alt="add order" />
                </button>
            </div>
        </div>
    )
}