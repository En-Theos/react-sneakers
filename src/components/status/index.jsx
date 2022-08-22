import { Link } from 'react-router-dom';

import empty from './image/empty.png';
import formalization from './image/formalization.png';
import noBookmarks from './image/no_bookmarks.png';
import noOrders from './image/no_orders.png';
import './status.scss';

export default function Status(props) {
    const { mod, setShowBasket, setStatus } = props;

    let dataForStatus = {};

    // eslint-disable-next-line default-case
    switch (mod) {
        case "empty":
            dataForStatus = {
                header: "Кошик порожній",
                message: "Додати хоча б одну пару кросівок, щоб зробити замовлення.",
                image: empty,
                alt: "empty",
                width: "120px"
            }
            break;
        case "formalization":
            dataForStatus = {
                header: "Замовлення оформлене!",
                message: "Ваше замовлення #18 незабаром буде передано кур'єрській доставці",
                image: formalization,
                alt: "formalization",
                width: "83px"
            }
            break;
        case "favorites":
            dataForStatus = {
                header: "Закладок немає :(",
                message: "Ви нічого не додавали до закладок",
                image: noBookmarks,
                alt: "no bookmarks",
                width: "70px"
            }
            break;
        case "purchases":
            dataForStatus = {
                header: "У вас немає замовлень",
                message: "Оформіть хоча б одне замовлення.",
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
                    setShowBasket(false);
                    setStatus("empty");
                }}>
                    <p>Повернутися назад</p>
                </button> 
                : 
                <Link to='..'>
                    <button>
                        <p>Повернутися назад</p>
                    </button> 
                </Link>
            }
        </div>
    )
}