import { Button, Form, Input } from "antd";
import { buttonLoyaut, formItemLayout } from "../../tools/formLayout";

const { Item } = Form;
const { TextArea } = Input;

export default function UnitForm({ submitTitle, onFinish, form, hiddenItem }) {
  return (
    <Form onFinish={onFinish} form={form} {...formItemLayout}>
      {hiddenItem && (
        <Item name="id" hidden>
          <Input />
        </Item>
      )}
      <Item name="nameuz" label="Nomi UZ">
        <Input />
      </Item>
      <Item name="nameru" label="Nomi RU">
        <Input />
      </Item>
      <Item name="nameen" label="Nomi EN">
        <Input />
      </Item>
      <Item name="shortnameuz" label="Qisqacha nomi UZ">
        <Input />
      </Item>
      <Item name="shortnameru" label="Qisqacha nomi RU">
        <Input />
      </Item>
      <Item name="shortnameen" label="Qisqacha nomi EN">
        <Input />
      </Item>
      <Item name="descriptionuz" label="Qp`shimcha malumot UZ">
        <TextArea allowClear showCount />
      </Item>
      <Item name="descriptionru" label="Qp`shimcha malumot RU">
        <TextArea allowClear showCount />
      </Item>
      <Item name="descriptionen" label="Qp`shimcha malumot EN">
        <TextArea allowClear showCount />
      </Item>
      <Item wrapperCol={buttonLoyaut.button}>
        <Button htmlType="submit" type="primary">
          {submitTitle}
        </Button>
      </Item>
    </Form>
  );
}
