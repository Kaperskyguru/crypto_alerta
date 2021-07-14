import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { storeAlertPrice } from "../lib/Coinbase";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#modal-root");

function saveAlertPrice(e, crypto) {
  e.preventDefault();

  console.log(e.price);
  //   await storeAlertPrice(crypto.id, crypto.price);
}

function Add({ show, crypto }) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(show);
  const [price, setPrice] = React.useState(0);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalContent = modalIsOpen ? (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <button onClick={closeModal}>close</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Enter your price</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(price);
            await storeAlertPrice(crypto, price);
          }}
        >
          <input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
          />
          <button type="submit">Set Price</button>
        </form>
      </Modal>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  }
  return null;
}
export default Add;
