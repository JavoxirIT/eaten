import { Button, ColorPicker, Form, Input } from "antd";
import { buttonLoyaut, formItemLayout } from "../../tools/formLayout";

const { Item } = Form;

export default function PriorityForm({ onFinish, form }) {
  return (
    <Form form={form} onFinish={onFinish} {...formItemLayout}>
      <Item hidden name="id">
        <Input />
      </Item>
      <Item name="nameuz" label="Nomi UZ">
        <Input placeholder="Ustunlik nomi O`zbekcha" />
      </Item>
      <Item name="nameru" label="Nomi RU">
        <Input placeholder="Ustunlik nomi Ruscha" />
      </Item>
      <Item name="nameen" label="Nomi EN">
        <Input placeholder="Ustunlik nomi Anglischa" />
      </Item>
      <Item name="descuz" label="Batafsil ma`lumot UZ">
        <Input.TextArea showCount />
      </Item>
      <Item name="descru" label="Batafsil ma`lumot RU">
        <Input.TextArea showCount />
      </Item>
      <Item name="descen" label="Batafsil ma`lumot EN">
        <Input.TextArea showCount />
      </Item>
      <Item name="color" label="Rangi">
        <ColorPicker format="hex" />
      </Item>
      <Item wrapperCol={buttonLoyaut.button}>
        <Button htmlType="submit" type="primary">
          Qo'shish
        </Button>
      </Item>
    </Form>
  );
}
