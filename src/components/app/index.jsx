import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from '../header';
import Basket from '../basket';
import Slider from '../slider';
import Products from '../products';

import './app.scss';

export default function App() {
  const [onOffBasket, setOnOffBasket] = useState(false);

  function onShowBasket(onOff) {
    setOnOffBasket(onOff);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="mainLimit">
            <Header onShowBasket={onShowBasket}/>
            <Routes>
              <Route path='/' element={(
                <main>
                  <Slider/>
                  <Products searchIf={true} backIf={false} contentHeader={"Все кроссовки"} mod={"all"}/>
                </main>
              )}/>
              <Route path='shopping' element={
                <Products searchIf={false} 
                  backIf={true} 
                  contentHeader={"Мои покупки"} 
                  style={{paddingTop: "44px"}} 
                  mod={"purchases"}/>
              }/>
              <Route path='bookmarks' element={
                <Products 
                  searchIf={false} 
                  backIf={true} 
                  contentHeader={"Мои закладки"} 
                  style={{paddingTop: "44px"}}
                  mod={"bookmarks"}/>
              }/>
            </Routes>
        </div>
        <Basket showIf={onOffBasket} onShowBasket={onShowBasket}/>
      </BrowserRouter>
    </div>
  );
}