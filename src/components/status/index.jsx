import { Link } from 'react-router-dom';

import empty from './image/empty.png';
import formalization from './image/formalization.png';
import noBookmarks from './image/no_bookmarks.png';
import noOrders from './image/no_orders.png';
import './status.scss';

export default function Status(props) {
    const { mod, onShowBasket, setStatus } = props;

    let dataForStatus = {};

    // eslint-disable-next-line default-case
    switch (mod) {
        case "empty":
            dataForStatus = {
                header: "Корзина пустая",
                message: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.",
                image: empty,
                alt: "empty",
                width: "120px"
            }
            break;
        case "formalization":
            dataForStatus = {
                header: "Заказ оформлен!",
                message: "Ваш заказ #18 скоро будет передан курьерской доставке",
                image: formalization,
                alt: "formalization",
                width: "83px"
            }
            break;
        case "favorites":
            dataForStatus = {
                header: "Закладок нет :(",
                message: "Вы ничего не добавляли в закладки",
                image: noBookmarks,
                alt: "no bookmarks",
                width: "70px"
            }
            break;
        case "purchases":
            dataForStatus = {
                header: "У вас нет заказов",
                message: "Вы нищеброд? Оформите хотя бы один заказ.",
                image: noOrders,
                alt: "no orders",
                width: "70px"
            }
            break;
    }

    const styleFormalization = mod === "formalization" ? {color: "#87C20A"} : {};

    return (
        <div className='status'>
            <div className='image'>
                <img style={{width: dataForStatus.width}} src={dataForStatus.image} alt={dataForStatus.alt} />
            </div>
            <h5 style={styleFormalization}>{dataForStatus.header}</h5>
            <p>{dataForStatus.message}</p>
            {
               mod === 'empty' || mod === 'formalization' 
               ? 
                <button onClick={() => {
                    onShowBasket(false);
                    setStatus("empty");
                }}>
                    <p>Вернуться назад</p>
                </button> 
                : 
                <Link to='..'>
                    <button>
                        <p>Вернуться назад</p>
                    </button> 
                </Link>
            }
        </div>
    )
}