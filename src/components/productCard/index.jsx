import plus from './image/plus.svg';
import sheck from './image/check.svg';
import redHeart from './image/red_heart.svg';
import borderHeart from './image/border_heart.svg';
import './productCard.scss';

export default function ProductCard(props) {
    const { data: {image, sneakersName, price} } = props;

    return (
        <div className="card">
            <button className='favorites'>
                <img src={borderHeart} alt="no favorites" />
            </button>
            <div className='productImg'>
                <img src={image} alt="productImg" />
            </div>
            <p className='productName'>{sneakersName}</p>
            <div className='order'>
                <p><span>Цена:</span><br />{price}</p>
                <button>
                    <img src={plus} alt="add order" />
                </button>
            </div>
        </div>
    )
}