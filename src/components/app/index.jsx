import Header from '../header';
import Slider from '../slider';
import Products from '../products';
import Basket from '../basket';

import './app.scss';

export default function App() {
  return (
    <div className="App">
      <div className="mainLimit">
        <Header/>
        <main>
          <Slider/>
          <Products searchIf={true} backIf={false} contentHeader={"Все кроссовки"}/>
        </main>
      </div>
    </div>
  );
}