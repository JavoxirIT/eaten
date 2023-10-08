import { Button, ColorPicker, Form, Input } from "antd";
import { buttonLoyaut, formItemLayout } from "../../tools/formLayout";

const { Item } = Form;

export default function PriorityForm({ onFinish, form }) {
  return (
    <Form form={form} onFinish={onFinish} {...formItemLayout}>
      <Item hidden name="id">
        <Input />
      </Item>
      <Item name="name" label="Nomi">
        <Input placeholder="Ustunlik nomi" />
      </Item>
      <Item name="color" label="Rangi">
        <ColorPicker format="hex" />
      </Item>
      <Item name="desc" label="Batafsil ma`lumot">
        <Input.TextArea showCount />
      </Item>
      <Item wrapperCol={buttonLoyaut.button}>
        <Button htmlType="submit" type="primary">
          Qo'shish
        </Button>
      </Item>
    </Form>
  );
}
