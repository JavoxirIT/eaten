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
      <Item name="name" label="Nomi">
        <Input />
      </Item>
      <Item name="shortname" label="Qisqacha nomi">
        <Input />
      </Item>
      <Item name="description" label="Qp`shimcha malumot">
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
