import { useCallback, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Header from '../header';
import Basket from '../basket';
import Slider from '../slider';
import Products from '../products';

import './app.scss';

export default function App() {
  const [allData, setAllData] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  const onSumPrice = useCallback(price => {
    setSumPrice(prev => prev + price)
  }, []);

  const onAllData = useCallback((arrObj, arrIndex) => {
    let indexArrObj = -1;

    setAllData(prev => prev.map(item => {
      if (arrIndex.includes(item.id)) {
        indexArrObj++;
        return arrObj[indexArrObj];
      } else {
        return item;
      }
    }));
  }, []);

  useEffect(() => {
    axios.get(`https://62f8d7563eab3503d1dc1d9a.mockapi.io/all`).then(response => {
      setAllData(response.data);
      localStorage.setItem('all', response.data.length);
      localStorage.setItem('favorites', response.data.filter(item => item.favorites).length);
      localStorage.setItem('purchases', response.data.filter(item => item.purchases).length);
      localStorage.setItem('basket', response.data.filter(item => item.basket).length);
      setSumPrice(response.data.reduce((sum, item) => item.basket ? sum + +item.price.replace(/\D/g, '') * item.basket : sum + 0, 0));
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
                  onAllData={onAllData}/>
              </main>
            )} />
            <Route path='shopping' element={
              <Products 
                contentHeader={"Мои покупки"}
                style={{ paddingTop: "44px" }}
                mod={"purchases"}
                onSumPrice={onSumPrice}
                data={allData}
                onAllData={onAllData}/>
            } />
            <Route path='bookmarks' element={
              <Products
                contentHeader={"Мои закладки"}
                style={{ paddingTop: "44px" }}
                mod={"favorites"}
                onSumPrice={onSumPrice}
                data={allData}
                onAllData={onAllData}/>
            } />
          </Routes>
        </div>
        <Basket 
          showIf={showBasket} 
          setShowBasket={setShowBasket} 
          sumPrice={sumPrice} 
          onSumPrice={onSumPrice} 
          data={allData}
          onAllData={onAllData}/>
      </BrowserRouter>
    </div>
  );
}