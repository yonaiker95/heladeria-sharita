import { useState, useEffect } from 'react';
import CarouselItem from './CarouselItem';
import { carouselItems } from '../../(public)/data/carouselData';
// Asegúrate de que tu SCSS esté importado
// import '../assets/scss/style.scss';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Temporizador para el cambio automático
    const interval = setInterval(() => {
      setDirection('next');
      setIsAnimating(true);
      setPrevIndex(activeIndex);
      setActiveIndex((prevActiveIndex) =>
        prevActiveIndex === carouselItems.length - 1 ? 0 : prevActiveIndex + 1
      );
    }, 5000);

    // Detiene la animación una vez que termina la transición CSS
    const animationTimeout = setTimeout(() => {
        setIsAnimating(false);
        setPrevIndex(null);
    }, 600); // La duración debe coincidir con la transición en tu SCSS

    // Función de limpieza para evitar fugas de memoria
    return () => {
        clearInterval(interval);
        clearTimeout(animationTimeout);
    };
  }, [activeIndex]);

  const handleManualSlide = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setDirection(newIndex > activeIndex || (newIndex === 0 && activeIndex === carouselItems.length - 1) ? 'next' : 'prev');
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    
    // Detiene la animación manual
  };

  return (
    <div className="container-fluid p-0 mb-5 pb-5">
      <div id="header-carousel" className="carousel slide">
        <div className="carousel-inner">
          {carouselItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isLeaving = index === prevIndex && prevIndex !== null;
            
            let slideClass = '';
            if (isLeaving) {
              slideClass = direction === 'next' ? 'carousel-item-prev' : 'carousel-item-next';
            } else if (isActive && isAnimating) {
              slideClass = direction === 'next' ? 'carousel-item-next' : 'carousel-item-prev';
            }

            return (
              <CarouselItem
                key={index}
                item={item}
                className={`carousel-item ${isActive ? 'active' : ''} ${slideClass}`}
              />
            );
          })}
        </div>

        <a className="carousel-control-prev" onClick={() => handleManualSlide(activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1)}>
          <div className="btn btn-secondary px-0" style={{ width: '45px', height: '45px' }}>
            <span className="carousel-control-prev-icon mb-n1"></span>
          </div>
        </a>
        <a className="carousel-control-next" onClick={() => handleManualSlide(activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1)}>
          <div className="btn btn-secondary px-0" style={{ width: '45px', height: '45px' }}>
            <span className="carousel-control-next-icon mb-n1"></span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Carousel;