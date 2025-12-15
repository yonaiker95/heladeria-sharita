// src/components/CarouselItem.tsx

interface CarouselItemProps {
  item: {
    image: string;
    subtitle: string;
    title: string;
  };
  className: string;
}

function CarouselItem({ item, className }: CarouselItemProps) {
  const { image, subtitle, title } = item;

  return (
    <div className={className}>
      <img className="w-100" src={image} alt="Image" />
      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
        <div className="p-3" style={{ maxWidth: '900px' }}>
          <h4 className="text-white text-uppercase mb-md-3">{subtitle}</h4>
          <h1 className="display-3 text-white mb-md-4">{title}</h1>
          <a href="#" className="btn btn-primary py-md-3 px-md-5 mt-2">Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;