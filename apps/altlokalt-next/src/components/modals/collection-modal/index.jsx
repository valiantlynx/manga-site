import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Collection from "@components/collection";

const CollectionModal = ({ show, handleModal, data }) => (
    <Modal
        className="rn-popup-modal upload-modal-wrapper"
        show={show}
        onHide={handleModal}
        centered
    >
        {show && (
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleModal}
            >
                <i className="feather-x" />
            </button>
        )}
        <Modal.Body>
            <Collection
                title={data?.title}
                total_item={27}
                path="/collection"
                image={{ src: URL.createObjectURL(data.image) }}
                thumbnails={[
                    { src: "/images/collection/collection-sm-01.jpg" },
                    { src: "/images/collection/collection-sm-02.jpg" },
                    { src: "/images/collection/collection-sm-03.jpg" },
                ]}
                profile_image={{ src: "/images/client/client-15.png" }}
            />
        </Modal.Body>
    </Modal>
);

CollectionModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        image: PropTypes.shape({}),
        title: PropTypes.string,
    }),
};
export default CollectionModal;
