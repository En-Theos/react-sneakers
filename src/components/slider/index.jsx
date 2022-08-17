import { useRef, useState, memo } from 'react';

import adidasLogo from './image/adidas_logo.png';
import arrowNext from './image/arrow_next.svg';
import './slider.scss'

const Slider = memo(() => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const sliderTape = useRef(null);

    const maxCurrentSlide = 2;
    
    function onSwitchSlide() {
        setCurrentSlide((prev) => {
            if (maxCurrentSlide === prev) {
                return 0
            }
            return prev + 1;
        });
        sliderTape.current.style.transform = `translateX(${-(currentSlide * 960)}px)`;
    }

    return (
        <section className='slider'>
            <div className="limit">
                <div className="sliderWindow">
                    <div className="sliderTape" ref={sliderTape}>
                        <div className="slide">
                            <div className='logo'>
                                <img src={adidasLogo} alt="adidasLogo" />
                            </div>
                            <div className='slogan'>
                                <h2><span>Stan Smith</span>, <br /> Forever!</h2>
                                <button>Купить</button>
                            </div>
                        </div>
                        <div className="slide">
                            <div className='logo'>
                                <img src={adidasLogo} alt="adidasLogo" />
                            </div>
                            <div className='slogan'>
                                <h2><span>Stan Smith</span>, <br /> Forever!</h2>
                                <button>Купить</button>
                            </div>
                        </div>
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
                <button onClick={onSwitchSlide} className="buttonNext">
                    <img src={arrowNext} alt="arrowNext" />
                </button>
            </div>
        </section>
    )
});

export default Slider;