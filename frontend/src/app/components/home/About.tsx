function About() {
  return (
    <div className="container-fluid py-5">
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
              En las cálidas tardes caraqueñas, siempre ha habido un lugar para
              refrescarse con un sabor auténtico. Helados Sharita nació en el
              corazón del Caracas más tradicional, en la parroquia La Pastora,
              un rincón lleno de historia, calles empedradas y familias que han
              construido la identidad de la ciudad.
            </h5>
            <p>
              El éxito y la demanda nos llevaron a crecer, abriendo nuevas sedes
              en puntos emblemáticos del este como Sabana Grande y Los Palos
              Grandes, pero sin olvidar jamás nuestras raíces. Para nosotros, La
              Pastora no es solo una dirección; es la cuna de nuestra tradición,
              el lugar donde aprendimos que un buen helado es capaz de unir
              generaciones y crear recuerdos imborrables.
            </p>
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
            <div className="position-relative h-100 rounded overflow-hidden">
              <img
                className="position-absolute w-100 h-100"
                src="img/about.jpg"
                style={{ objectFit: 'cover' }}
                alt="About Us"
              />
            </div>
          </div>
          <div className="col-lg-4 py-5">
            <h4 className="font-weight-bold mb-3">Nuestras características</h4>
            <p>
              Invidunt lorem justo sanctus clita. Erat lorem labore ea, justo
              dolor lorem ipsum ut sed eos, ipsum et dolor kasd sit ea justo.
              Erat justo sed sed diam. Ea et erat ut sed diam sea ipsum est
              dolor
            </p>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos
              dolor
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos
              dolor
            </h5>
            <h5 className="text-muted mb-3">
              <i className="fa fa-check text-secondary mr-3"></i>Eos kasd eos
              dolor
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
