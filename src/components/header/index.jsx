import { Link } from 'react-router-dom';

import logo from './images/logo.png';
import shop from './images/shop.svg';
import heart from './images/heart.svg';
import user from './images/user.svg'
import './header.scss';

export default function Header(props) {
    const { setShowBasket, sumPrice } = props;

    return (
        <header className='headerMain'>
            <div className="limit">
                <div className="flexBox">
                    <div className="storeName">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="name">
                            <h1>REACT SNEAKERS</h1>
                            <h2>Магазин лучших кроссовок</h2>
                        </div>
                    </div>
                    <div className="functionalButtons">
                        <ul>
                            <li className='shop'><button onClick={() => setShowBasket(true)}><img src={shop} alt="shop" />{sumPrice} руб.</button></li>
                            <li className='heart'><Link to="bookmarks"><img src={heart} alt="heart" /></Link></li>
                            <li className='user'><Link to="shopping"><img src={user} alt="user" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}