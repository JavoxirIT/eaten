import { Form } from "antd";

export function ListingTypeForm({ onFinish, form }) {
  return <Form onFinish={onFinish} form={form}></Form>;
}
