import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from '../header';
import Basket from '../basket';
import Slider from '../slider';
import Products from '../products';

import './app.scss';

export default function App() {
  const [onOffBasket, setOnOffBasket] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  function onShowBasket(onOff) {
    setOnOffBasket(onOff);
  }

  function onSumPrice(addPrice) {
    setSumPrice(prev => prev + addPrice);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="mainLimit">
            <Header onShowBasket={onShowBasket} sumPrice={sumPrice}/>
            <Routes>
              <Route path='/' element={(
                <main>
                  <Slider/>
                  <Products searchIf={true} 
                  backIf={false} 
                  contentHeader={"Все кроссовки"} 
                  mod={"all"} 
                  onSumPrice={onSumPrice}
                  sumPrice={sumPrice}/>
                </main>
              )}/>
              <Route path='shopping' element={
                <Products searchIf={false} 
                  backIf={true} 
                  contentHeader={"Мои покупки"} 
                  style={{paddingTop: "44px"}} 
                  mod={"purchases"}
                  onSumPrice={onSumPrice}
                  sumPrice={sumPrice}/>
              }/>
              <Route path='bookmarks' element={
                <Products 
                  searchIf={false} 
                  backIf={true} 
                  contentHeader={"Мои закладки"} 
                  style={{paddingTop: "44px"}}
                  mod={"favorites"}
                  onSumPrice={onSumPrice}
                  sumPrice={sumPrice}/>
              }/>
            </Routes>
        </div>
        <Basket showIf={onOffBasket} onShowBasket={onShowBasket} sumPrice={sumPrice} onSumPrice={onSumPrice}/>
      </BrowserRouter>
    </div>
  );
}