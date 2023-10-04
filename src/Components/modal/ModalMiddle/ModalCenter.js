import React, { useState } from "react";
import { Button } from "antd";
import "./CssModal.css";

export function ModalCenter({ children, name }) {
  const [visible, setVisible] = useState(false);
  function visibleModal() {
    setVisible(true);
  }

  return (
    <>
      <Button
        type="primary"
        onClick={visibleModal}
        style={{ fontSize: "1.125rem" }}
      >
        {name}
      </Button>
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
