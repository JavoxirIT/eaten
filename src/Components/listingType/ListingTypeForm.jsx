import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { configs } from "config/config";

const { Item } = Form;
const { TextArea } = Input;

export function ListingTypeForm({ onFinish, form, submitTitle }) {
  const props = {
    name: "image",
    action: configs.uploadUrl,
    headers: {
      authorization: "authorization-text",
    },
    accept: "image/*",
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file);
        form.setFieldsValue({
          icon: info.file.response.data.image,
        });
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Rasim yuklandi`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} Xatolik rasim yuklanmadi.`);
      }
    },
  };

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
        name="descriptionuz"
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
        name="descriptionru"
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
        name="descriptionen"
        rules={[
          {
            required: true,
            message: "Qo`shomcha malumotni kiriting!",
          },
        ]}
      >
        <TextArea />
      </Item>
      <Item label="Rasm" name="icon" valuePropName="file">
        <Upload {...props}>
          <Button type="primary" danger icon={<UploadOutlined />}>
            Rasmni yuklash
          </Button>
        </Upload>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          {submitTitle}
        </Button>
      </Item>
    </Form>
  );
}
