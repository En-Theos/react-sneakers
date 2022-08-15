import { useRef } from 'react';
import axios from 'axios';

import plus from './image/plus.svg';
import sheck from './image/check.svg';
import redHeart from './image/red_heart.svg';
import borderHeart from './image/border_heart.svg';
import './productCard.scss';


export default function ProductCard(props) {
    const { data, mod } = props;
    const { data: {image, sneakersName, price, id, favorites} } = props;
    const forDelete = useRef(null);

    let localFavoritesIf = favorites;
    let disabled = false;

    function onAddFavorites(event) {
        disabled = true;
        const element = event.currentTarget;

        if (!favorites && !localFavoritesIf) {
            data.favorites = true;
            localFavoritesIf = true;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, data).then(() => {
                element.querySelector('img').src = redHeart;
                element.querySelector('img').alt = "favorites";
                element.classList.add("favoritesActive");
                localStorage.setItem('favorites', (+localStorage.getItem('favorites') || 0) + 1);
                disabled = false;
            });
        } else {
            console.log('asd');
            data.favorites = false;
            localFavoritesIf = false;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, data).then(() => {
                element.querySelector('img').src = borderHeart;
                element.querySelector('img').alt = "no favorites";
                element.classList.remove("favoritesActive");
                localStorage.setItem('favorites', +localStorage.getItem('favorites') - 1);
                disabled = false;
                if (mod === 'favorites') {
                    forDelete.current.remove();
                }
            });
        }
    }

    return (
        <div ref={forDelete} className="card">
            <button className={'favorites' + (favorites ? " favoritesActive" : ' ')} onClick={(event) => {
                if (!disabled) {
                    onAddFavorites(event);
                }
            }}>
                <img src={favorites ? redHeart : borderHeart} alt={favorites ? "favorites" : "no favorites"} />
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