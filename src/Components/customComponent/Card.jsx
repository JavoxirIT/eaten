import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import "../../css/custom-component.css";
import { Link } from "react-router-dom";
import { ModalCenter } from "../modal/ModalMiddle/ModalCenter";
import { Button } from "antd";
export function Card({
  data,
  cardTitle,
  children,
  cardHeader,
  onClick,
  onOneClick,
  id,
  edit,
  eye,
  deletes,
  onListingStatusEdit,
}) {
  return (
    <main className="card-wrapper">
      {cardHeader && (
        <div className="card-header">
          <h2 className="header-title">{cardTitle}</h2>
          <div className="header-btn-block">
            {eye && (
              <Button type="primary">
                {" "}
                <Link to={`${id}`}>
                  {" "}
                  <EyeOutlined />
                </Link>
              </Button>
            )}
            {edit && (
              <Button
                type="primary"
                onClick={() => {
                  onListingStatusEdit(data);
                }}
              >
                <EditOutlined />
              </Button>
            )}
            {deletes && (
              <Button
                type="primary"
                danger
                onClick={onClick}
                className="header-btn"
              >
                <CloseOutlined />
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="card-body">{children}</div>
    </main>
  );
}
