import { MapPin } from 'lucide-react';
import { useState } from 'react';

function Promotion() {
  const [showModal, setShowModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const handleOpenModal = (src: string) => {
    setShowModal(true);
    setVideoSrc(src);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideoSrc('');
  };

  return (
    <>
      {/* Promotion Start */}
      <div className="container-fluid my-5 py-5 px-0">
        <div className="row bg-primary m-0">
          <div className="col-md-6 px-0" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute w-100 h-100 rounded" src="img/promotion.jpg" style={{ objectFit: 'cover' }} alt="Promotion" />
              <button
                type="button"
                className="btn-play"
                onClick={() => handleOpenModal('https://www.youtube.com/embed/xOBSeG0BT6g')}
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
                <MapPin size={'70%'} className="text-gray-700"/>
              </div>
              <h3 className="font-weight-bold text-white mt-3 mb-4">📍 ¿Cómo llegar a Helados Sharita?</h3>
              <p className="text-white mb-4">
                ¿No conoces el camino? Te llevamos de la mano. Descubre la ruta más fácil para visitarnos y disfrutar de nuestros helados artesanales.
              </p>
              <a onClick={() => handleOpenModal('https://www.youtube.com/embed/xOBSeG0BT6g')} className="btn btn-secondary py-3 px-5 mt-2">Ver video</a>
            </div>
          </div>
        </div>
      </div>
      {/* Promotion End */}

      {/* Video Modal Start */}
      {showModal && (
        <div className="modal fade show" id="videoModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src={videoSrc} allow="autoplay" title="YouTube video player"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Modal End */}
    </>
  );
}

export default Promotion;