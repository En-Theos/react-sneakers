import axios from 'axios';
import { memo, useRef } from 'react';

import plus from './image/plus.svg';
import sheck from './image/check.svg';
import redHeart from './image/red_heart.svg';
import borderHeart from './image/border_heart.svg';
import './productCard.scss';

function propsCompare(prevProps, nextProps) {
    const resulultIf = [];

    for (const key in prevProps.data) {
        resulultIf.push(prevProps.data[key] === nextProps.data[key]);
    }
    
    return resulultIf.every(item => item);
}

const ProductCard = memo((props) => {
    const { data, onSumPrice, onAllData, mod } = props;
    const { data: { image, sneakerName, price, id, favorites, basket, purchases, quantityInStock} } = props;
    let refSumSneaker = useRef(+price.replace(/\D/g, '') * basket);
    let refResetInput = useRef(null);
    let refMessage = useRef(null);
    let refMainButton = useRef(null);

    const managementFavorites = {
        localIf: favorites,
        disabled: false
    }
    const managementBasket = {
        localIf: basket,
        disabled: false
    }

    function onAddСategory(category, management) {
        management.disabled = true;

        if (!management.localIf) {
            const newData = {...data, [category]: category === 'favorites' ? true : 1};
            management.localIf = true;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, newData).then(() => {
                onAllData([newData], [newData.id]);
                localStorage.setItem(category, (+localStorage.getItem(category) || 0) + 1);
                management.disabled = false;
            });
        } else {
            const newData = {...data, [category]: false};
            management.localIf = false;
            axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, newData).then(() => {
                onAllData([newData], [newData.id]);
                localStorage.setItem(category, +localStorage.getItem(category) - 1);
                management.disabled = false;
                refMessage.current.classList.remove("messageActive");
            });
        }
    }

    const favoritesClass = 'favorites' + (favorites ? " favoritesActive" : ' '),
    favoritesImage = favorites ? redHeart : borderHeart,
    favoritesAlt = favorites ? "favorites" : "no favorites";
    
    const basketClass = 'basketButton' + (basket ? " orderActive" : ' '),
    counterOrderClass = 'counterOrder' + (basket ? " counterOrderActive" : ' '),
    basketImage = basket ? sheck : plus,
    basketAlt = basket ? "added order" : "add order";

    function favoritesEvent() {
        if (!managementFavorites.disabled) {
            onAddСategory("favorites", managementFavorites);
        }
    }

    function basketEvent(event) {
        if (!managementBasket.disabled  && (event.target.classList.contains('basketButton') || event.target.tagName === 'IMG')) {
            onAddСategory("basket", managementBasket);
            if (managementBasket.localIf) {
                refResetInput.current.value = 1;
                refSumSneaker.current = +price.replace(/\D/g, '')
            } else {
                refSumSneaker.current = -refSumSneaker.current;
                refResetInput.current.value = 1;
            }
            onSumPrice(refSumSneaker.current);
        }
    }

    function counterBlurEvent(event) {
        const newData = {...data, "basket": +event.target.value};
        axios.put(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all/${id}`, newData).then(() => {
            onAllData([newData], [newData.id]);
            onSumPrice(-refSumSneaker.current);
            refSumSneaker.current = +price.replace(/\D/g, '') * +event.target.value;
            onSumPrice(+refSumSneaker.current);
            managementBasket.disabled = false;
            refMainButton.current.classList.remove("orderDisabled");
        });
        if (!(+event.target.value)) {
            localStorage.setItem("basket", +localStorage.getItem("basket") - 1);
        }
    }

    function counterFocusEvent() {
        managementBasket.disabled = true;
        refMainButton.current.classList.add("orderDisabled");
    }

    function counterInputEvent(event) {
        if (event.target.value > quantityInStock) {
            let quantity = '' + quantityInStock;
            let formWord = '';

            if (['11', '12', '13', '14', '15', '16', '17', '18', '19'].includes(quantity)) {
                formWord = 'пар';
            } else if ('1'.includes(quantity[quantity.length - 1])) {
                formWord = 'пара';
            } else if ('234'.includes(quantity[quantity.length - 1])) {
                formWord = 'пари';
            } else if ('056789'.includes(quantity[quantity.length - 1]))  {
                formWord = 'пар';
            }

            event.target.value = quantityInStock;
            refMessage.current.textContent = `На складі тільки ${quantityInStock} ${formWord}`
            refMessage.current.classList.add("messageActive");
            setTimeout(() => {
                refMessage.current.classList.remove("messageActive");
            }, 4000);
        }
    }

    return (
        <div className="card">
            <button className={favoritesClass} onClick={favoritesEvent}>
                <img src={favoritesImage} alt={favoritesAlt} />
            </button>
            <div className='productImg'>
                <img src={image} alt="productImg" />
            </div>
            <p className='productName'>{sneakerName}</p>
            <div className='order'>
                <p><span>Ціна:</span><br />{price}</p>
                {mod === 'purchases' 
                ? <p>{purchases}</p> : 
                <>
                    <div className={counterOrderClass}>
                        <div ref={refMessage} className='message'></div>
                        <input ref={refResetInput} onInput={counterInputEvent} onFocus={counterFocusEvent} onBlur={counterBlurEvent} defaultValue={basket || 1} type="number"/>
                    </div>
                    <button ref={refMainButton} className={basketClass} onClick={basketEvent}>
                        <img src={basketImage} alt={basketAlt}/>
                    </button>
                </>
                }
            </div>
        </div>
    )
}, propsCompare);

export default ProductCard;