
import React, { useEffect, useRef } from "react";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

const Services: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let $: any;

    const init = async () => {
      // 1) Cargar jQuery y exponerlo globalmente antes del plugin
      const jq = (await import("jquery")).default as any;
      (window as any).jQuery = jq;
      (window as any).$ = jq;

      // 2) Cargar el plugin ya con jQuery en window
      await import("owl.carousel");
      $ = jq;

      const el = carouselRef.current;
      if (!el) return;

      // 3) Evitar doble init (React 18 StrictMode en dev)
      if ($(el).hasClass("owl-loaded")) {
        $(el).trigger("destroy.owl.carousel");
        $(el).removeClass("owl-loaded");
        $(el).find(".owl-stage-outer").children().unwrap(); // restaura DOM
      }

      // 4) Inicializar Owl
      $(el).owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
        },
      });
    };

    init();

    // 5) Cleanup al desmontar
    return () => {
      try {
        const el = carouselRef.current;
        if ($ && el && $(el).data("owl.carousel")) {
          $(el).trigger("destroy.owl.carousel");
        }
      } catch {
        /* noop */
      }
    };
  }, []);

  const services = [
    {
      title: "Quality Maintain",
      description:
        "Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo",
      image: "/img/service-1.jpg",
    },
    {
      title: "Individual Approach",
      description:
        "Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo",
      image: "/img/service-2.jpg",
    },
    {
      title: "Celebration Ice Cream",
      description:
        "Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo",
      image: "/img/service-3.jpg",
    },
    {
      title: "Delivery To Any Point",
      description:
        "Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo",
      image: "/img/service-4.jpg",
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="section-title position-relative mb-5">
              Best Services We Provide For Our Clients
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0" />
        </div>

        <div className="row">
          <div className="col-12">
            {/* El ref es clave para inicializar Owl */}
            <div className="owl-carousel service-carousel" ref={carouselRef}>
              {services.map((s, i) => (
                <div key={i} className="service-item">
                  <div className="service-img mx-auto">
                    <img
                      className="rounded-circle w-100 h-100 bg-light p-3"
                      src={s.image}
                      alt={s.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div
                    className="position-relative text-center bg-light rounded p-4 pb-5"
                    style={{ marginTop: "-75px" }}
                  >
                    <h5 className="font-weight-semi-bold mt-5 mb-3 pt-5">
                      {s.title}
                    </h5>
                    <p>{s.description}</p>
                    <a
                      href="#!"
                      className="border-bottom border-secondary text-decoration-none text-secondary"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
