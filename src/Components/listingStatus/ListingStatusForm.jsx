import { Button, Form, Input } from "antd";
import { formItemLayout, buttonLoyaut } from "../../tools/formLayout";
const { Item } = Form;
const { TextArea } = Input;

export default function ListingStatusForm({
  submitTitle,
  onFinish,
  form,
  hiddenItem,
}) {
  return (
    <Form onFinish={onFinish} form={form} {...formItemLayout}>
      {hiddenItem && (
        <Item name="id" hidden>
          <Input />
        </Item>
      )}
      <Item name="name" label="Nomi">
        <Input allowClear />
      </Item>
      <Item name="desc" label="Qo`shimcha ma`lumot">
        <TextArea allowClear />
      </Item>
      <Item wrapperCol={buttonLoyaut.button}>
        <Button htmlType="submit" type="primary">
          {submitTitle}
        </Button>
      </Item>
    </Form>
  );
}
