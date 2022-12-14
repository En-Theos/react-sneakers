import { useRef, useState, memo } from 'react';

import adidasLogo from './image/adidas_logo.png';
import arrowNext from './image/arrow_next.svg';
import './slider.scss'

const Slider = memo(() => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const sliderTape = useRef(null);

    const slides = [];

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

    for (let i = 0; i < 3; i++) {
        slides.push(<Slide key={i}/>);
    }

    return (
        <section className='slider'>
            <div className="limit">
                <div className="sliderWindow">
                    <div className="sliderTape" ref={sliderTape}>
                        {slides}
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

function Slide({refSlides}) {
    return (
        <div ref={refSlides} className="slide">
            <div className='logo'>
                <img src={adidasLogo} alt="adidasLogo" />
            </div>
            <div className='slogan'>
                <h2><span>Stan Smith</span>, <br /> Forever!</h2>
                <button disabled>Купити</button>
            </div>
        </div>
    )
}