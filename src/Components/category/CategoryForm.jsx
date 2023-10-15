import { UploadOutlined } from "@ant-design/icons";
import { useListingType } from "Store/ListingType/useListingType";
import { Button, Form, Input, Row, Select, Upload, message } from "antd";
import { configs } from "config/config";

const { Item } = Form;

export function CategoryForm({ form, onFinish }) {
  const { listingType } = useListingType();
  const props = {
    name: "image",
    action: configs.uploadUrl,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        form.setFieldsValue({
          img: info.file.response.data.image,
        });
        console.log(info.file.response.data.image);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Yuklandi`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} Xatolik rasim yuklanmadi.`);
      }
    },
  };

  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Item name="id" hidden>
        <Input />
      </Item>
      <Item
        label="Nomi UZ"
        name="nameuz"
        rules={[
          {
            required: true,
            message: "",
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
            message: "",
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
            message: "",
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
            message: "",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Batafsil RU"
        name="descru"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Batafsil EN"
        name="descen"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input />
      </Item>

      <Item label="E'lon turi (Majburiy emas)" name="listing_types_id">
        <Select
          options={listingType.map((item) => {
            return { value: item.id, label: item.nameuz };
          })}
        />
      </Item>
      <Item label="Rasm" name="img" valuePropName="file">
        <Upload {...props}>
          <Button type="primary" danger icon={<UploadOutlined />}>
            Rasmni yuklash
          </Button>
        </Upload>
      </Item>
      <Row justify="end">
        <Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Item>
      </Row>
    </Form>
  );
}
