'use client';
import React, { useEffect, useRef } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";

const Products: React.FC = () => {
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

  const products = [
    { price: "$99", title: "Vanilla Ice Cream", image: "/img/product-1.jpg" },
    { price: "$99", title: "Chocolate Ice Cream", image: "/img/product-2.jpg" },
    { price: "$99", title: "Strawberry Ice Cream", image: "/img/product-3.jpg" },
    { price: "$99", title: "Mango Ice Cream", image: "/img/product-4.jpg" },
    { price: "$99", title: "Cookies Ice Cream", image: "/img/product-5.jpg" },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="section-title position-relative mb-5">
              Best Prices We Offer For Ice Cream Lovers
            </h1>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0 pb-5 pb-lg-0"></div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="owl-carousel product-carousel" ref={carouselRef}>
              {products.map((p, i) => (
                <div
                  key={i}
                  className="product-item d-flex flex-column align-items-center text-center bg-light rounded py-5 px-3"
                >
                  <div className="bg-primary mt-n5 py-3" style={{ width: "80px" }}>
                    <h4 className="font-weight-bold text-white mb-0">{p.price}</h4>
                  </div>
                  <div
                    className="position-relative bg-primary rounded-circle mt-n3 mb-4 p-3"
                    style={{ width: "150px", height: "150px" }}
                  >
                    <img
                      className="rounded-circle w-100 h-100"
                      src={p.image}
                      alt={p.title}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h5 className="font-weight-bold mb-4">{p.title}</h5>
                  <a href="#!" className="btn btn-sm btn-secondary">
                    Order Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
