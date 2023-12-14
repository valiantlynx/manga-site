import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import SuccessText from "@ui/success-text";
import { pb } from "../../../lib/pb";

const PlaceBidModal = ({ show, handleModal }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        const data = {
            message,
        };
        await pb
            .collection("contactRequest")
            .create(data)
            .then(() => {
                setError("");
                setSuccess(`Melding sendt`);
            })
            .catch(() => {
                setSuccess("");
                setError(`Noe gikk galt. Prøv igjen senere.`);
            });
    };

    return (
        <Modal
            className="rn-popup-modal placebid-modal-wrapper"
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
            <Modal.Header>
                <h3 className="modal-title">Kontakt</h3>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Du skal sende en melding til altlokalt. Du vil få kontakt
                    med bedriften snarest.
                </p>
                <div className="placebid-form-box">
                    <h5 className="title">Din forespørsel</h5>
                    <div className="bid-content">
                        <div className="bid-content-top">
                            <div className="bid-content-left">
                                <textarea
                                    id="message"
                                    name="message"
                                    className="primary-alta"
                                    value={message}
                                    placeholder="Skriv din melding her... du kan endre størelse av tekstboksen"
                                    onChange={handleMessageChange}
                                />
                            </div>
                        </div>
                        {error && <ErrorText>{error}</ErrorText>}
                        {success && <SuccessText>{success}</SuccessText>}

                        <div className="bid-content-mid">
                            <div className="bid-content-left">
                                <span>
                                    Skriv forespørselen din samt
                                    kontaktinformasjon. Vær detaljert om hva du
                                    ønsker, noen referanser du kan ha, osv.
                                </span>
                                {/* <span>Service fee</span>
                                <span>Total bid amount</span> */}
                            </div>
                            {/* <div className="bid-content-right">
                                <span>9578 wETH</span>
                                <span>10 wETH</span>
                                <span>9588 wETH</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="bit-continue-button">
                        <Button
                            size="medium"
                            fullwidth
                            onClick={handleSendMessage}
                        >
                            Send melding
                        </Button>
                        <Button
                            color="primary-alta"
                            size="medium"
                            className="mt--10"
                            onClick={handleModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

PlaceBidModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};

export default PlaceBidModal;
