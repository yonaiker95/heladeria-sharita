import Link from "next/link";
import NavLink from "./NavLink";

function Navbar() {
  return (
    <div className="container-fluid position-relative nav-bar p-0">
      <div className="container-lg position-relative p-0 px-lg-3" style={{ zIndex: 9 }}>
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow p-lg-0">
          <Link href="/" className="navbar-brand d-block d-lg-none">
            <h1 className="m-0 display-4 text-primary">
              <span className="text-secondary">S</span>HARITA
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div className="navbar-nav ml-auto py-0">
              <NavLink href="/">Home</NavLink>
              <NavLink href="about">About</NavLink>
              <NavLink href="product">Product</NavLink>
            </div>
            <Link href="/" className="navbar-brand mx-5 d-none d-lg-block">
              <h1 className="m-0 display-4 text-primary">
                <span className="text-secondary">S</span>HARITA
              </h1>
            </Link>
            <div className="navbar-nav mr-auto py-0">
              <NavLink href="service">Service</NavLink>
              <NavLink href="gallery">Gallery</NavLink>
              <NavLink href="contact">Contact</NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;