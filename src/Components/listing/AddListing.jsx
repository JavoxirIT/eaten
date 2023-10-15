import {
  Button,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Rate,
  Select,
  Upload,
  notification,
} from "antd";
import { useAuthHeader } from "react-auth-kit";
import { PatternFormat } from "react-number-format";
import { ModalCenter } from "../modal/ModalMiddle/ModalCenter";
import { useCitiesAndDistrict } from "../../Store/CitiesAndDistricts/useCitiesAndDistrict";
import { useEffect, useState } from "react";
import { usePriority } from "../../Store/Priority/usePriority";
import { useListingStatus } from "../../Store/ListingStatus/useListingStatus";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import useLocalStorage from "../../hook/useLocalStorage";
import { MyMapComponent } from "../leflet/Leflet";
import css from "../../css/PageComponent.module.css";
import { useAllListing } from "../../Store/Listing/useAllListing";
import { configs } from "config/config";

const { TextArea } = Input;
const { Option } = Select;
const { Item } = Form;

export function AddListing() {
  const { addListing, setDataLocation } = useAllListing();
  const authHeader = useAuthHeader();
  const [form] = useForm();
  const { sities, district } = useCitiesAndDistrict();
  const { priority } = usePriority();
  const { listingStatus } = useListingStatus();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, code, message) => {
    api[type]({
      message: code,
      description: message,
      duration: 3,
    });
  };

  const [isDistrict, setDistrict] = useState(district);
  function onViloyatSelect(e) {
    setDistrict(district.filter((item) => item.regions.id === e));
  }

  //* загрузка главного изображения
  const props = {
    method: "POST",
    name: "image",
    action: configs.uploadUrl,
    headers: {
      authorization: authHeader(),
    },
    accept: "image/*",
    onChange({ file }) {
      if (file.response?.status === "success") {
        console.log("1", file.response);
        form.setFieldsValue({
          img: file.response.data.image,
        });
        openNotificationWithIcon("success", " Yuklandi", `${file.name}`);
      } else if (file.status === "error") {
        console.log("1", file.response);
        openNotificationWithIcon("error", " Yuklanmadi", `${file.name}`);
      }
    },

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  const uploadButton = (
    <div style={{ width: "100%" }}>
      <CloudUploadOutlined />
      <p className="ant-upload-text">Format JPG, PNG, JPEG</p>
      <p className="ant-upload-hint">Rasimni tanlang</p>
    </div>
  );
  //* загрузка нескольких изображений *//
  const [imageList, setImageList] = useLocalStorage([], "galleryImg");
  const propsGallery = {
    // method: "POST",
    // name: "image",
    // action: process.env.REACT_APP_IMAGE_UPLOAD_URL,
    // headers: {
    //   authorization: authHeader(),
    // },
    // multiple: true,

    // fileList,

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  function onChange({ fileList }) {
    if (fileList) {
      const img = fileList.map((file) => file.response?.data.image);
      if (fileList[0]?.response?.status === "success") {
        setImageList(img);
        openNotificationWithIcon("success", " Yuklandi");
      } else if (fileList[0]?.status === "error") {
        openNotificationWithIcon("error", " Yuklanmadi");
      }
    }
  }

  function onDeleteStorafe() {
    setImageList([]);
  }

  useEffect(() => {
    form.setFieldsValue({
      gallery: JSON.stringify(imageList),
    });
  }, [form, imageList]);

  return (
    <>
      {contextHolder}
      <ModalCenter name="Elon qo`shish">
        <h2>Yangi elon</h2>
        <Divider />
        <div className={css.blockLeaflet}>
          <MyMapComponent setDataLocation={setDataLocation} />
        </div>
        <Divider />
        <Form form={form} layout="vertical" onFinish={addListing}>
          <Item
            name="name"
            label="Nomi"
            // rules={[
            //   {
            //     required: true,
            //     message: "Nomini kriting",
            //   },
            // ]}
          >
            <Input placeholder="Nomi" />
          </Item>
          <Item
            name="region_id"
            label="Viloyat"
            // rules={[
            //   {
            //     required: true,
            //     message: "Viloyatni tanlang",
            //   },
            // ]}
            // hasFeedback
          >
            <Select allowClear onSelect={onViloyatSelect} virtual={false}>
              {sities.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item
            name="tuman_id"
            label="Tuman"
            // rules={[
            //   {
            //     required: true,
            //     message: "Tumanni tanlang",
            //   },
            // ]}
          >
            <Select allowClear virtual={false}>
              {isDistrict.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item
            name="address"
            label="Adress"
            // rules={[
            //   {
            //     required: true,
            //     message: "Manzilni kriting",
            //   },
            // ]}
          >
            <Input placeholder="Adres" />
          </Item>
          <Item
            label="Telefon raqam"
            name="phone"
            // rules={[
            //   {
            //     required: true,
            //     message: "Telefon raqamini kriting",
            //   },
            // ]}
          >
            <PatternFormat
              format="+998 (##) ### ## ##"
              allowEmptyFormatting
              mask="_"
              customInput={Input}
            />
          </Item>
          <Item
            name="start_date"
            label="Boshlanish sanasi"
            // rules={[
            //   {
            //     required: true,
            //     message: "Boshlanish sanasini belgilang",
            //   },
            // ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Boshlanish sanasi"
            />
          </Item>
          <Item
            name="end_date"
            label="Tugash sanasi"
            // rules={[
            //   {
            //     required: true,
            //     message: "Tugash sanasini belgilang",
            //   },
            // ]}
          >
            <DatePicker style={{ width: "100%" }} placeholder="Tugash sanasi" />
          </Item>
          <Item
            name="expry_date"
            label="Brom tugash sanasi"
            // rules={[
            //   {
            //     required: true,
            //     message: "Brom tugash sanasini belgilang",
            //   },
            // ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Brom tugash sanasi"
            />
          </Item>
          <Item
            name="client_count"
            label="Mijozlar soni"
            // rules={[
            //   {
            //     required: true,
            //     message: "Mijozlar sonini kriting",
            //   },
            // ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Mijozlar soni"
            />
          </Item>
          <Item name="rating" label="Reyting">
            <Rate allowHalf />
          </Item>
          <Item
            name="priority_id"
            label="Ustunligi"
            // rules={[
            //   {
            //     required: true,
            //     message: "Ustunligini tanlang",
            //   },
            // ]}
          >
            <Select allowClear virtual={false}>
              {priority.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item
            name="listing_status_id"
            label="Status"
            // rules={[
            //   {
            //     required: true,
            //     message: "Statusini tanlang",
            //   },
            // ]}
          >
            <Select allowClear virtual={false}>
              {listingStatus.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name="img" label="Rasm" valuePropName="picture">
            <Upload
              {...props}
              style={{ width: "100vw" }}
              listType="picture-card"
              maxCount={1}
            >
              {uploadButton}
            </Upload>
          </Item>
          <Item label="Ko'proq rasim yuklash">
            <Item
              name="gallery"
              valuePropName="file"
              //   getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                headers={{
                  authorization: authHeader(),
                }}
                action={process.env.REACT_APP_IMAGE_UPLOAD_URL}
                method="POST"
                multiple={true}
                name="image"
                accept="image/*"
                {...propsGallery}
                listType="picture-card"
                onChange={(file) => onChange(file)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Yuklash uchun rasimni ushbu hududga bosing yoki sudrab torting
                </p>
                <p className="ant-upload-hint">Ko'proq rasim yuklash</p>
              </Upload.Dragger>
            </Item>
          </Item>
          {imageList.length !== 0 && (
            <div className={css.containerLafleatImg}>
              <div className={css.LafleatHeaderImg}>
                <Button type="text" danger onClick={onDeleteStorafe}>
                  O`chirish
                </Button>
              </div>
              <div className={css.blockLafleatImg}>
                {imageList.map((item, index) => (
                  <div key={index + 1} className={css.cardLeafletImg}>
                    <Image
                      src={process.env.REACT_APP_IMAGE_URL + item}
                      className={css.blockLeafletImgItems}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Item name="description" label="Qo`shimcha malumot">
            <TextArea rows={4} allowClear showCount />
          </Item>
          <Item>
            <Button htmlType="submit">Saqlash</Button>
          </Item>
        </Form>
      </ModalCenter>
    </>
  );
}
//! 'name'=>'required|string',
//! 'img'=>'required|string',
//! 'address'=>'required|string',
//! 'location'=>'required|string',
//! 'phone'=>'required|string',
//! 'description'=>'required|string',
//! 'gallery'=>'required|string',
//! 'rating'=>'required|float',
//! 'client_count'=>'required|integer',
//! 'tuman_id'=>'required|integer',
//! 'region_id'=>'required|integer',
//! 'listing_status_id'=>'required|integer',
//! 'priority_id'=>'required|integer',
//! 'start_date'=>'required|dateTime',
//! 'end_date'=>'required|dateTime',
//! 'expry_date'=>'required|dateTime',
// 'users_id'=>'required|integer',
