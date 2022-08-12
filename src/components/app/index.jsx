import Header from '../header';
import Slider from '../slider';
import Products from '../products';

import './app.scss';

export default function App() {
  return (
    <div className="App">
      <div className="mainLimit">
        <Header/>
        <main>
          <Slider/>
          <Products/>
        </main>
      </div>
    </div>
  );
}