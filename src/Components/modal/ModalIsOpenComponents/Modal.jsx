import React from "react";
import "../ModalMiddle/CssModal.css";

export function Modal({ children, setVisible, visible }) {
  return (
    <>
      <div
        className={
          visible === true ? "edit-open-modal active" : "edit-open-modal"
        }
        onClick={() => setVisible(false)}
      >
        <section
          className={
            visible ? "edit-modal-content activee" : "edit-modal-content"
          }
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>
      </div>
    </>
  );
}
