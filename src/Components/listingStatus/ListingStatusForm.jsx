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
      <Item name="nameuz" label="Nomi UZ">
        <Input allowClear />
      </Item>
      <Item name="nameru" label="Nomi RU">
        <Input allowClear />
      </Item>
      <Item name="nameen" label="Nomi EN">
        <Input allowClear />
      </Item>
      <Item name="descuz" label="Qo`shimcha ma`lumot UZ">
        <TextArea allowClear />
      </Item>
      <Item name="descru" label="Qo`shimcha ma`lumot RU">
        <TextArea allowClear />
      </Item>
      <Item name="descen" label="Qo`shimcha ma`lumot EN">
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
