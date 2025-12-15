import React from "react";

const Portfolio: React.FC = () => {
  const portfolioItems = [
    "img/portfolio-1.jpg",
    "img/portfolio-2.jpg",
    "img/portfolio-3.jpg",
    "img/portfolio-4.jpg",
    "img/portfolio-5.jpg",
    "img/portfolio-6.jpg",
  ];

  return (
    <div className="container-fluid my-5 py-5 px-0">
      <div className="row justify-content-center m-0">
        <div className="col-lg-5">
          <h1 className="section-title position-relative text-center mb-5">
            Delicious Ice Cream Made From Our Very Own Organic Milk
          </h1>
        </div>
      </div>

      <div className="row m-0 portfolio-container">
        {portfolioItems.map((image, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 p-0 portfolio-item"
          >
            <div className="position-relative overflow-hidden">
              <img className="img-fluid w-100" src={image} alt={`Portfolio ${index + 1}`} />
              <a
                className="portfolio-btn"
                href={image}
                data-lightbox="portfolio"
              >
                <i className="fa fa-plus text-primary" style={{ fontSize: "60px" }}></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
