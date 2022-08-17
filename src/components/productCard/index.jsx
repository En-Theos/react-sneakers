import axios from 'axios';

import plus from './image/plus.svg';
import sheck from './image/check.svg';
import redHeart from './image/red_heart.svg';
import borderHeart from './image/border_heart.svg';
import './productCard.scss';


export default function ProductCard(props) {
    const { data, onSumPrice, mod } = props;
    const { data: { image, sneakerName, price, id, favorites, basket} } = props;

    const managementFavorites = {
        localIf: favorites,
        disabled: false
    }
    const managementBasket = {
        localIf: basket,
        disabled: false
    }

    function onAddСategory(event, category , management, active, defaultImg, activeImg) {
        management.disabled = true;
        const element = event.currentTarget;
        if (!(category === 'favorites' ? favorites : basket) && !management.localIf) {
            data[category] = true;
            management.localIf = true;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, data).then(() => {
                element.querySelector('img').src = activeImg;
                element.querySelector('img').alt = category;
                element.classList.add(active);
                localStorage.setItem(category, (+localStorage.getItem(category) || 0) + 1);
                management.disabled = false;
            });
        } else {
            data[category] = false;
            management.localIf = false;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, data).then(() => {
                element.querySelector('img').src = defaultImg;
                element.querySelector('img').alt = "no " + category;
                element.classList.remove(active);
                localStorage.setItem(category, +localStorage.getItem(category) - 1);
                management.disabled = false;
                if (!managementFavorites.localIf && mod === 'favorites') {
                    element.parentElement.style.display = 'none';
                }
            });
        }
    }

    const favoritesClass = 'favorites' + (favorites ? " favoritesActive" : ' '),
    favoritesImage = favorites ? redHeart : borderHeart,
    favoritesAlt = favorites ? "favorites" : "no favorites";
    
    const basketClass = basket ? "orderActive" : '',
    basketImage = basket ? sheck : plus,
    basketAlt = basket ? "added order" : "add order";

    function favoritesEvent(event) {
        if (!managementFavorites.disabled) {
            onAddСategory(event, "favorites", managementFavorites, "favoritesActive", borderHeart, redHeart);
        }
    }

    function basketEvent(event) {
        if (!managementBasket.disabled) {
            onAddСategory(event, "basket", managementBasket, "orderActive", plus, sheck);
            onSumPrice(!basket ? +price.replace(/\D/g, '') : -(+price.replace(/\D/g, '')));
        }
    }

    return (
        <div className="card" data-id={data.id}>
            <button className={favoritesClass} onClick={favoritesEvent}>
                <img src={favoritesImage} alt={favoritesAlt} />
            </button>
            <div className='productImg'>
                <img src={image} alt="productImg" />
            </div>
            <p className='productName'>{sneakerName}</p>
            <div className='order'>
                <p><span>Цена:</span><br />{price}</p>
                <button className={basketClass} onClick={basketEvent}>
                    <img src={basketImage} alt={basketAlt}/>
                </button>
            </div>
        </div>
    )
}