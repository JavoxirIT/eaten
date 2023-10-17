import { UploadOutlined } from "@ant-design/icons";
import { useCitiesAndDistrict } from "Store/CitiesAndDistricts/useCitiesAndDistrict";
import { Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
import { configs } from "config/config";
import { useState } from "react";

const { Item } = Form;
const { TextArea } = Input;

export function VenderAddForm({ onFinish, form }) {
  const { sities, district } = useCitiesAndDistrict();

  const [isdistrict, setIsDistrict] = useState([]);
  let onChange = (key) => {
    let dis = district.filter((i) => i.regions_id === key);
    setIsDistrict(dis);
  };
  const props = {
    name: "image",
    action: configs.uploadUrl,
    headers: {
      authorization: "authorization-text",
    },
    accept: "image/*",
    onChange(info) {
      if (info.file.status !== "uploading") {
        form.setFieldsValue({
          img: info.file.response.data.image,
        });
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} Yuklandi`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} Yuklanmadis.`);
      }
    },
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      {/*`id`,  ``, ``, `created_at`, `updated_at`, ``, ``, `role`*/}
      <Row gutter={8}>
        <Col span={8}>
          <Item
            label="Ism"
            name="firstname"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Familya"
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
        <Col span={8}>
          <Item
            label="Telefon"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
      </Row>
      <Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Item>
      <Row gutter={12}>
        <Col span={12}>
          <Item
            label="Pasport"
            name="passport"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label="JSHSHIR"
            name="jshshir"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
      </Row>

      <Item
        label="Batafsil"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <TextArea />
      </Item>
      <Row gutter={12}>
        <Col span={12}>
          <Item
            label="Login"
            name="login"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label="Parol"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input.Password />
          </Item>
        </Col>
      </Row>
      <Item
        label="Manzili"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Item>
      <Row gutter={12}>
        <Col span={12}>
          <Item
            label="Viloyat"
            name="region_id"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Select
              onChange={onChange}
              options={sities.map((item) => {
                return { value: item.id, label: item.nameuz };
              })}
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            label="Tuman"
            name="tuman_id"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Select
              options={isdistrict.map((item) => {
                return { value: item.id, label: item.nameuz };
              })}
            />
          </Item>
        </Col>
      </Row>
      <Item label="Rasm" name="img" valuePropName="file">
        <Upload {...props}>
          <Button type={"primary"} icon={<UploadOutlined />}>
            Rasmni yuklash
          </Button>
        </Upload>
      </Item>
      <Row justify="center">
        <Item>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Item>
      </Row>
    </Form>
  );
}
