import { Button, Form, Input } from "antd";

const { Item } = Form;
const { TextArea } = Input;

export default function EditListing({ onFinish, form }) {
  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Item name="id" hidden>
        <Input />
      </Item>
      <Item name="nameuz" label="Nomi UZ">
        <Input />
      </Item>
      <Item name="nameru" label="Nomi RU">
        <Input />
      </Item>
      <Item name="nameen" label="Nomi EN">
        <Input />
      </Item>
      <Item name="addressuz" label="Manzil UZ">
        <Input />
      </Item>
      <Item name="addressru" label="Manzil RU">
        <Input />
      </Item>
      <Item name="addressen" label="Manzil EN">
        <Input />
      </Item>
      <Item name="descriptionuz" label="Qo`shimcha malinmot UZ">
        <TextArea />
      </Item>
      <Item name="descriptionru" label="Qo`shimcha malinmot RU">
        <TextArea />
      </Item>
      <Item name="descriptionen" label="Qo`shimcha malinmot EN">
        <TextArea />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          O`zgartirish
        </Button>
      </Item>
    </Form>
  );
}
