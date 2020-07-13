//@flow

import React from "react";
import "./Modal.scss";

type Props = {
  doc: Object,
  closeModal: () => void,
};
const Modal = ({ doc, closeModal }: Props) => (
  <div className="modal">
    <div className="modal__outer">
      <div className="modal__inner">
        <div className="modal__button-container">
          <button onClick={closeModal} type="button">
            Close
          </button>
        </div>
        <div className="modal__content">
          <p>{doc.m_szDocBody}</p>
        </div>
        <div className="modal__button-container">
          <a className="modal__link" href={doc.m_szSrcUrl}>
            Read on original site
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
