import { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

import ProductCard from '../productCard';
import Status from '../status';
import Skeleton from '../skeleton';

import search from './image/search.svg';
import arrowNext from './image/arrow_next.svg';
import './products.scss';

const Products = memo((props) => {
    const { contentHeader, style, mod, onSumPrice, data, onFavoritesData, onBasketData } = props;
    const [load, setLoad] = useState(true);
    const [filterS, setFilterS] = useState('');

    let content = [];
    const loads = [];
    
    useEffect(() => {
        if (data.length > 0) {
            setLoad(false);
        }
    }, [data]);
    
    for (let i = 0; i < +localStorage.getItem(mod); i++) {
        loads.push(<Skeleton key={i}/>);
    }

    if (data.length > 0) {
        data.filter(item => item.sneakerName.includes(filterS)).forEach(item => {
            content.push(<ProductCard key={item.id} data={{...item}} onSumPrice={onSumPrice} onFavoritesData={onFavoritesData} onBasketData={onBasketData}/>);
        });
    } 

    const itemHeader = +localStorage.getItem(mod) || (mod === 'all') 
    ? <HeaderLocal>
        <h3>{mod !== 'all' && <BackButton />} {contentHeader}</h3>
        {mod === 'all' && <SearchInput filterS={filterS} setFilterS={setFilterS}/>}
    </HeaderLocal> : null;

    const itemContent =  load ? loads : content;

    return (
        <section className='products' style={style}>
            <div className="limit">
                {itemHeader}
                <main className='productCards'>
                    {(itemContent.length === 0 ? null : itemContent) || (mod !== 'all' ? <Status mod={mod}/> : null)}
                </main>
            </div>
        </section>
    )
});

export default Products;

const HeaderLocal = memo(({children}) => {
    return (
        <header className='headerProducts'>
            {children}
        </header>
    )
});

function SearchInput(props) {
    const { filterS, setFilterS } = props;

    return (
        <div className='search'>
            <img src={search} alt="search" />
            <input value={filterS} type="text" name="search" placeholder='Поиск...' onInput={(event) => setFilterS(event.target.value)}/>
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