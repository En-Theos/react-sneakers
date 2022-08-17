import { useCallback, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Header from '../header';
import Basket from '../basket';
import Slider from '../slider';
import Products from '../products';

import './app.scss';

export default function App() {
  const [allData, setAllData] = useState([]),
  [purchasesData, setPurchasesData] = useState([]),
  [favoritesData, setFavoritesData] = useState([]),
  [basketData, setBasketData] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  const onSumPrice = useCallback(price => {
    setSumPrice(prev => prev + price)
  }, []);

  const onFavoritesData = useCallback((obj, action) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "add":
        setFavoritesData(prev => [...prev, obj]);
        break;
      case "delete":
        setFavoritesData(prev => prev.filter(item => item.id !== obj.id));
        setAllData(prev => prev.map(item => item.id === obj.id ? {...obj, favorites: false} : item));
        break;
    }
  }, []);

  const onBasketData = useCallback((obj, action) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "add":
        setBasketData(prev => [...prev, obj]);
        break;
      case "delete":
        setBasketData(prev => prev.filter(item => item.id !== obj.id));
        setAllData(prev => prev.map(item => item.id === obj.id ? {...obj, basket: false} : item));
        break;
    }
  }, []);

  useEffect(() => {
    axios.get(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all`).then(response => {
      setAllData(response.data);
      localStorage.setItem('all', response.data.length);
      setSumPrice(response.data.reduce((sum, item) => item.basket ? sum + +item.price.replace(/\D/g, '') : sum + 0, 0));
      setPurchasesData(response.data.filter(item => item.purchases));
      setFavoritesData(response.data.filter(item => item.favorites));
      setBasketData(response.data.filter(item => item.basket));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="mainLimit">
          <Header setShowBasket={setShowBasket} sumPrice={sumPrice} />
          <Routes>
            <Route path='/' element={(
              <main>
                <Slider />
                <Products 
                  contentHeader={"Все кроссовки"}
                  mod={"all"}
                  onSumPrice={onSumPrice}
                  data={allData}
                  onFavoritesData={onFavoritesData}
                  onBasketData={onBasketData}/>
              </main>
            )} />
            <Route path='shopping' element={
              <Products 
                contentHeader={"Мои покупки"}
                style={{ paddingTop: "44px" }}
                mod={"purchases"}
                onSumPrice={onSumPrice}
                data={purchasesData}
                onFavoritesData={onFavoritesData}
                onBasketData={onBasketData}/>
            } />
            <Route path='bookmarks' element={
              <Products
                contentHeader={"Мои закладки"}
                style={{ paddingTop: "44px" }}
                mod={"favorites"}
                onSumPrice={onSumPrice}
                data={favoritesData}
                onFavoritesData={onFavoritesData}
                onBasketData={onBasketData}/>
            } />
          </Routes>
        </div>
        <Basket 
          showIf={showBasket} 
          setShowBasket={setShowBasket} 
          sumPrice={sumPrice} 
          onSumPrice={onSumPrice} 
          data={basketData}
          onBasketData={onBasketData}/>
      </BrowserRouter>
    </div>
  );
}