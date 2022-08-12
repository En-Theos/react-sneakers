import logo from './images/logo.png';
import shop from './images/shop.svg';
import heart from './images/heart.svg';
import user from './images/user.svg'
import './header.scss';

export default function Header() {
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
                            <li className='shop'><a href=""><img src={shop} alt="shop" />1205 руб.</a></li>
                            <li className='heart'><a href=""><img src={heart} alt="heart" /></a></li>
                            <li className='user'><a href=""><img src={user} alt="user" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}