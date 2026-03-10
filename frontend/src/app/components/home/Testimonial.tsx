import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

const Testimonial: React.FC = () => {
  const testimonials = [
    {
      text: '"El helado de parchita de Sharita me transporta a mi infancia en La Pastora. Misma cremosidad, mismo sabor. ¡Imperdible!"',
      image: "/img/testimonial-1.png",
      name: "Andrea R.",
      profession: "Estudiante",
    },
    {
      text: '"Mi lugar feliz en Caracas. Un ambiente familiar, el mejor mantecado del mundo y la sonrisa de Nayarith en la caja. ¡Así da gusto pagar!"',
      image: "/img/testimonial-3.png",
      name: "Carlos R.",
      profession: "Ing. Civil",
    },
    {
      text: '"Descubrí Sharita por un video en Instagram y fui con mi familia. ¡Espectacular! La atención de Paola en redes fue súper rápida y cuando llegamos, Loreinis nos recibió como en casa. Repetiremos."',
      image: "/img/testimonial-2.png",
      name: "María G. ",
      profession: "Contadora",
    },
    {
      text: '"Gracias a Sharita por endulzar mis cumpleaños por 3 años consecutivos. Sigan así, con esa receta original que nos hace únicos."',
      image: "/img/testimonial-4.png",
      name: "José M. ",
      profession: "Profesor",
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
              Opiniones que endulzan
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