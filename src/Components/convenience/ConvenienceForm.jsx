import { Button, Form, Input } from "antd";

const { Item } = Form;
const { TextArea } = Input;

export function ConvenienceForm({ onFinish, form, submitTitle }) {
  return (
    <Form onFinish={onFinish} form={form}>
      <Item name="id" hidden>
        <Input />
      </Item>
      <Item
        label="Nomi UZ"
        name="nameuz"
        rules={[
          {
            required: true,
            message: "Nomini kiriting",
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Nomi RU"
        name="nameru"
        rules={[
          {
            required: true,
            message: "Nomini kiriting",
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Nomi EN"
        name="nameen"
        rules={[
          {
            required: true,
            message: "Nomini kiriting",
          },
        ]}
      >
        <Input />
      </Item>

      <Item
        label="Batafsil UZ"
        name="descuz"
        rules={[
          {
            required: true,
            message: "Qo`shomcha malumotni kiriting!",
          },
        ]}
      >
        <TextArea />
      </Item>
      <Item
        label="Batafsil RU"
        name="descru"
        rules={[
          {
            required: true,
            message: "Qo`shomcha malumotni kiriting!",
          },
        ]}
      >
        <TextArea />
      </Item>
      <Item
        label="Batafsil EN"
        name="descen"
        rules={[
          {
            required: true,
            message: "Qo`shomcha malumotni kiriting!",
          },
        ]}
      >
        <TextArea />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          {submitTitle}
        </Button>
      </Item>
    </Form>
  );
}
