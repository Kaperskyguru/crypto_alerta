import React, { useState } from "react";
import Modal from "./Add";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Crypto({ crypto }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="card" onClick={() => setShowModal(true)}>
      <h3>{crypto.id} &rarr;</h3>
      <p>${crypto.price}</p>

      {showModal ? (
        <Modal
          onClose={() => setShowModal(false)}
          show={showModal}
          crypto={crypto}
        ></Modal>
      ) : null}

      <div id="modal-root"></div>
      <style jsx>{`
        .card {
          margin: 1rem;
          flex-basis: 10%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        div.StyledModalHeader {
          display: flex;
          justify-content: flex-end;
          font-size: 25px;
        }

        input[type="text"],
        select,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
        }

        button {
          background-color: #04aa6d;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          float: right;
        }

        button {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
        }

        div.StyledModal {
          background: white;
          width: 300px;
          height: 400px;
          border-radius: 15px;
          padding: 15px;
        }
        div.StyledModalOverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
