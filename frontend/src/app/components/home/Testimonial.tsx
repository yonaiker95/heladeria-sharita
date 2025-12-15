import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      text: "Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      image: "/img/testimonial-1.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      image: "/img/testimonial-2.jpg",
      name: "Client Name",
      profession: "Profession",
    },
    {
      text: "Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam",
      image: "/img/testimonial-3.jpg",
      name: "Client Name",
      profession: "Profession",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h1 className="section-title position-relative text-center mb-5">
              Clients Say About Our Famous Ice Cream
            </h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Slider {...settings}>
              {testimonials.map((t, i) => {
                return (
                  <div key={i} className="text-center px-4">
                    <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
                    <h4 className="font-weight-light mb-4">{t.text}</h4>
                    <img
                      className="img-fluid mx-auto mb-3 rounded-circle"
                      src={t.image}
                      alt={t.name}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <h5 className="font-weight-bold m-0">{t.name}</h5>
                    <span>{t.profession}</span>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;