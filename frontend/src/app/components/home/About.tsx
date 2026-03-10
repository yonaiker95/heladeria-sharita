function About() {
  return (
    <div id="about" className="container-fluid py-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <h1 className="section-title position-relative text-center mb-5">
              Helado tradicional y delicioso desde 2023
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 py-5">
            <h4 className="font-weight-bold mb-3">Sobre Nosotros</h4>
            <h5 className="text-muted mb-3">
              Somos una heladería artesanal naciente con el compromiso de
              brindar sabor y calidad al público
            </h5>
            <p>
              Hoy, Helados Sharita es un puente entre el Caracas de ayer y el de
              hoy. Mantenemos viva la esencia del barrio, la receta original y
              el espíritu familiar que nos vio nacer. Porque más que una
              heladería, somos una historia de sabor que comenzó en una ladera
              de la ciudad y se extendió para endulzar la vida de todos los
              caraqueños.
            </p>
          </div>
          <div className="col-lg-4" style={{ minHeight: '400px' }}>
            <div className="position-relative h-100 overflow-hidden rounded">
              <img
                className="position-absolute w-100 h-100 rounded"
                src="img/about.jpg"
                style={{ objectFit: 'cover' }}
                alt="About Us"
              />
            </div>
          </div>
          <div className="col-lg-4 py-5">
            <h4 className="font-weight-bold mb-3">Nuestras características</h4>
            <p>
              Helados Sharita C.A. es una heladería artesanal con raíces en La Pastora, uno de los rincones más tradicionales de Caracas. Desde nuestros inicios, nos hemos dedicado a endulzar la vida de los caraqueños con recetas familiares, sabores auténticos y la calidez de un negocio que ha pasado de generación en generación. Estas son nuestras características:
            </p>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>
              Origen Tradicional
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Elaboración Artesanal
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Sabores Emblemáticos
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Clientes de por Vida
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Calidad Constante
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
