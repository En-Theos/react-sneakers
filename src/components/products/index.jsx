import ProductCard from '../productCard';

import search from './image/search.svg';
import arrowNext from './image/arrow_next.svg';
import './products.scss';

export default function Products(props) {
    const {searchIf, backIf, contentHeader} = props;

    const cards = [];

    for (let i = 0; i < 13; i++) {
        cards.push(<ProductCard key={i}/>);
    }

    const itemSearch = searchIf ? <SearchInput/> : null;
    const itemBack = backIf ? <BackButton/> : null;

    return (
        <section className='products'>
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
            <input type="text" name="search" placeholder='Поиск...'/>
        </div>
    )
}

function BackButton() {
    return (
        <button className='backButton'>
            <a href="">
                <img src={arrowNext} alt="arrow_next" />
            </a>
        </button>
    )
}