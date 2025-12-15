'use client';
import React, { useEffect, useRef } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";

const Team: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let $: any;

    const init = async () => {
      const jq = (await import("jquery")).default as any;
      (window as any).jQuery = jq;
      (window as any).$ = jq;

      await import("owl.carousel");
      $ = jq;

      const el = carouselRef.current;
      if (!el) return;

      if ($(el).hasClass("owl-loaded")) {
        $(el).trigger("destroy.owl.carousel");
        $(el).removeClass("owl-loaded");
        $(el).find(".owl-stage-outer").children().unwrap();
      }

      $(el).owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
        },
      });
    };

    init();

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

  const team = [
    { name: "Full Name", role: "Designation", image: "/img/team-1.jpg" },
    { name: "Full Name", role: "Designation", image: "/img/team-2.jpg" },
    { name: "Full Name", role: "Designation", image: "/img/team-3.jpg" },
    { name: "Full Name", role: "Designation", image: "/img/team-4.jpg" },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="section-title position-relative mb-5">
              Experienced & Most Famous Ice Cream Chefs
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="owl-carousel team-carousel" ref={carouselRef}>
              {team.map((t, i) => (
                <div key={i} className="team-item">
                  <div className="team-img mx-auto">
                    <img
                      className="rounded-circle w-100 h-100"
                      src={t.image}
                      alt={t.name}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div
                    className="position-relative text-center bg-light rounded px-4 py-5"
                    style={{ marginTop: "-100px" }}
                  >
                    <h3 className="font-weight-bold mt-5 mb-3 pt-5">
                      {t.name}
                    </h3>
                    <h6 className="text-uppercase text-muted mb-4">{t.role}</h6>
                    <div className="d-flex justify-content-center pt-1">
                      <a
                        className="btn btn-outline-secondary btn-social mr-2"
                        href="#"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        className="btn btn-outline-secondary btn-social mr-2"
                        href="#"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-outline-secondary btn-social mr-2"
                        href="#"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
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

export default Team;
