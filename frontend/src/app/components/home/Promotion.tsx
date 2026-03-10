import { MapPin } from 'lucide-react';
import { useState } from 'react';

function Promotion() {
  const [showModal, setShowModal] = useState(false);
  const [showMaps, setShowMaps] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const handleOpenModal = (src: string) => {
    setShowModal(true);
    setVideoSrc(src);
  };
  const handleOpenMaps = () => {
    setShowMaps(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowMaps(false);
    setVideoSrc('');
  };

  return (
    <>
      {/* Promotion Start */}
      <div className="container-fluid my-5 py-5 px-0">
        <div className="row bg-primary m-0">
          <div className="col-md-6 px-0" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded"
                src="img/promotion.jpg"
                style={{ objectFit: 'cover' }}
                alt="Promotion"
              />
              <div></div>
              <button
                type="button"
                className="btn-play"
                onClick={() =>
                  handleOpenModal('https://www.youtube.com/embed/xOBSeG0BT6g')
                }
              >
                <span></span>
              </button>
            </div>
          </div>
          <div className="col-md-6 py-5 py-md-0 px-0">
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
              <div
                className="d-flex align-items-center justify-content-center bg-white rounded-circle"
                style={{ width: '100px', height: '100px' }}
              >
                <MapPin size={'70%'} className="text-gray-700" />
              </div>
              <h3 className="font-weight-bold text-white mt-3 mb-4">
                📍 ¿Cómo llegar a Helados Sharita?
              </h3>
              <p className="text-white mb-4">
                ¿No conoces el camino? Te llevamos de la mano. Descubre la ruta
                más fácil para visitarnos y disfrutar de nuestros helados
                artesanales.
              </p>
              <a
                onClick={() => handleOpenMaps()}
                className="btn btn-secondary py-3 px-5 mt-2"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Promotion End */}

      {/* Video Modal Start */}
      {/* {(showModal || showMaps) && (
          <div
            className="modal fade show"
            id="videoModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="false"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="embed-responsive embed-responsive-16by9">
                    {showModal && (
                      <iframe
                        className="embed-responsive-item"
                        src={videoSrc}
                        allow="autoplay"
                        title="YouTube video player"
                      ></iframe>
                    )}
                    {showMaps && (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3922.8871282430987!2d-66.9202971243966!3d10.509555589623458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDMwJzM0LjQiTiA2NsKwNTUnMDMuOCJX!5e0!3m2!1ses!2sve!4v1773112135734!5m2!1ses!2sve"
                        width="600"
                        height="450"
                        style="border:0;"
                        allowFullScreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0,
                        }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Helados Sharita - La Pastora"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))} */}

      {(showModal || showMaps) && (
        <div
          className="modal fade show"
          id="videoModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="embed-responsive embed-responsive-16by9">
                  {/* Prioridad: si showModal es true, muestra video; si no, y showMaps es true, muestra mapa */}
                  {showModal && (
                    <iframe
                      className="embed-responsive-item"
                      src={videoSrc}
                      allow="autoplay"
                      title="YouTube video player"
                      allowFullScreen
                    />
                  )}
                  {!showModal && showMaps && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3922.8871282430987!2d-66.9202971243966!3d10.509555589623458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDMwJzM0LjQiTiA2NsKwNTUnMDMuOCJX!5e0!3m2!1ses!2sve!4v1773112135734!5m2!1ses!2sve"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Helados Sharita - La Pastora"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Promotion;
