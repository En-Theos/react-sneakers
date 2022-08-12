import adidasLogo from './image/adidas_logo.png';
import arrowNext from './image/arrow_next.svg';
import './slider.scss'

export default function Slider() {
    return (
        <section className='slider'>
            <div className="limit">
                <div className="sliderWindow">
                    <div className="sliderTape">
                        <div className="slide">
                            <div className='logo'>
                                <img src={adidasLogo} alt="adidasLogo" />
                            </div>
                            <div className='slogan'>
                                <h2><span>Stan Smith</span>, <br /> Forever!</h2>
                                <button>Купить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="buttonNext">
                    <img src={arrowNext} alt="arrowNext" />
                </button>
            </div>
        </section>
    )
}