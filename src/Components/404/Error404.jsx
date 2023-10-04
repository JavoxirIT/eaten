import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Error404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Bunday saxifa mavjut emas."
      extra={
        <Button type="primary" onClick={goBack}>
          Qaytish
        </Button>
      }
    />
  );
};
export default Error404;
