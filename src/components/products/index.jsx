import { Link } from 'react-router-dom';

import ProductCard from '../productCard';
import Status from '../status';

import search from './image/search.svg';
import arrowNext from './image/arrow_next.svg';
import './products.scss';

export default function Products(props) {
    const { searchIf, backIf, contentHeader, style, mod } = props;

    let cards = [];

    // eslint-disable-next-line default-case
    switch (mod) {
        case "main":
            for (let i = 0; i < 13; i++) {
                cards.push(<ProductCard key={i} />);
            }
            break;
        case "shopping":
            cards = <Status mod={"noOrders"}/>
            break;
        case "bookmarks":
            cards = <Status mod={"noBookmarks"}/>
            break;
    }

    const itemSearch = searchIf ? <SearchInput /> : null;
    const itemBack = backIf ? <BackButton /> : null;

    return (
        <section className='products' style={style}>
            <div className="limit">
                <header className='headerProducts'>
                    <h3>{itemBack} {contentHeader}</h3>
                    {itemSearch}
                </header>
                <main className='productCards'>
                    {cards}
                </main>
            </div>
        </section>
    )
}

function SearchInput() {
    return (
        <div className='search'>
            <img src={search} alt="search" />
            <input type="text" name="search" placeholder='Поиск...' />
        </div>
    )
}

function BackButton() {
    return (
        <button className='backButton'>
            <Link to="..">
                <img src={arrowNext} alt="arrow_next" />
            </Link>
        </button>
    )
}