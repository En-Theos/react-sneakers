import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../productCard';
import Status from '../status';
import Skeleton from '../skeleton';

import search from './image/search.svg';
import arrowNext from './image/arrow_next.svg';
import './products.scss';

export default function Products(props) {
    const { searchIf, backIf, contentHeader, style, mod, onSumPrice, sumPrice } = props;
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    let content = [];
    const loads = [];
    
    useEffect(() => {
        setLoad(true);

        axios.get(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all`).then(d => {
            setData(d.data);
            setLoad(false);
        });

    }, [mod]);

    useEffect(() => {
        if (!sumPrice) {
            onSumPrice(data.reduce((sum, item) => item.basket ? sum + +item.price.replace(/\D/g, '') : sum + 0, 0));
        }
    }, [data])

    for (let i = 0; i < +localStorage.getItem(mod); i++) {
        loads.push(<Skeleton key={i}/>);
    }
    if (data.length > 0) {
        data.forEach(item => {
            if (item[mod]) {
                content.push(<ProductCard key={item.id} data={item} onSumPrice={onSumPrice}/>);
            }
        });
    } 

    const itemSearch = searchIf ? <SearchInput /> : null;
    const itemBack = backIf ? <BackButton /> : null;
    const itemHeader = +localStorage.getItem(mod) ? <HeaderLocal itemSearch={itemSearch} itemBack={itemBack} contentHeader={contentHeader}/> : null;
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
}

function HeaderLocal(props) {
    const {itemBack, contentHeader, itemSearch} = props;

    return (
        <header className='headerProducts'>
            <h3>{itemBack} {contentHeader}</h3>
            {itemSearch}
        </header>
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