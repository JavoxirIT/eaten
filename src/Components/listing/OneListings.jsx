import { useParams } from "react-router-dom";
import { useAllListing } from "../../Store/Listing/useAllListing";
import React, { useEffect, useState } from "react";
import { Card } from "../customComponent/Card";
import { Image, Tag } from "antd";
import css from "../../css/PageComponent.module.css";
import EditListing from "./EditListing";
import { Modal } from "../modal/ModalIsOpenComponents/Modal";
export function OneListings() {
  const params = useParams();
  const { getOneListing, listingOne, onEditListing, form } = useAllListing();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getOneListing(params.id);
  }, []);

  function onListingStatusEdit(e) {
    console.log(e);
    setVisible(true);
    form.setFieldsValue({
      id: e?.id,
      nameuz: e?.nameuz,
      nameru: e?.nameru,
      nameen: e?.nameen,
      descriptionuz: e?.descriptionuz,
      descriptionru: e?.descriptionru,
      descriptionen: e?.descriptionen,
      addressuz: e?.addressuz,
      addressru: e?.addressru,
      addressen: e?.addressen,
    });
  }

  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        <EditListing onFinish={onEditListing} form={form} />
      </Modal>
      {listingOne.map((item) => (
        <div key={item.id} className={css.listingContainerOne}>
          <Card
            data={item}
            onListingStatusEdit={onListingStatusEdit}
            edit={true}
            // onClick={() => onDelete(item.id)}
            cardHeader={true}
            cardTitle={item.nameuz}
            id={item.id}
          >
            <div className={css.listingImgBlockStyle}>
              <Image
                width="100%"
                height="250px"
                src={
                  item.img === null
                    ? "https://admin.eaten.uz/upload/user/img.jpg"
                    : item.img
                }
              />
            </div>
            <table className={css.listingTable}>
              <tbody>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Viloyat:</b>
                  </td>
                  {item.region.map((regions) => (
                    <td key={regions.id}>{regions.nameuz}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Tuman:</b>
                  </td>
                  {item.tuman.map((regions) => (
                    <td key={regions.id}>{regions.nameuz}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Manzil:</b>
                  </td>
                  <td>{item.addressuz}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Telefon:</b>
                  </td>
                  <td>{item.phone}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Boshlanish vaqti:</b>
                  </td>
                  <td>{item.start_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Tugash vaqti:</b>
                  </td>
                  <td>{item.end_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Buyurtma ochiq</b>
                  </td>
                  <td>{item.expry_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Joylar soni</b>
                  </td>
                  <td>{item.client_count}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Elon holati</b>
                  </td>
                  {item.listing_status.map((listStatus) => (
                    <td key={listStatus.id}>
                      <Tag color="green" bordered={false}>
                        {listStatus.nameuz}
                      </Tag>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Qulayliklari</b>
                  </td>
                  {item.priority.map((priorities) => (
                    <td key={priorities.id}>
                      <Tag color="#1677ff">{priorities.nameuz}</Tag>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <span>
              {" "}
              <b>Qo'shimcha ma'lumot</b>
            </span>
            <p className={css.listingTextDescription}>{item.descriptionuz}</p>
          </Card>
          <Card
            data={item}
            onListingStatusEdit={onListingStatusEdit}
            edit={true}
            // onClick={() => onDelete(item.id)}
            cardHeader={true}
            cardTitle={item.nameru}
            id={item.id}
          >
            <div className={css.listingImgBlockStyle}>
              <Image
                width="100%"
                height="250px"
                src={
                  item.img === null
                    ? "https://admin.eaten.uz/upload/user/img.jpg"
                    : item.img
                }
              />
            </div>
            <table className={css.listingTable}>
              <tbody>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Город:</b>
                  </td>
                  {item.region.map((regions) => (
                    <td key={regions.id}>{regions.nameru}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Район:</b>
                  </td>
                  {item.tuman.map((regions) => (
                    <td key={regions.id}>{regions.nameru}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Адрес:</b>
                  </td>
                  <td>{item.addressru}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Телефон:</b>
                  </td>
                  <td>{item.phone}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Время началы:</b>
                  </td>
                  <td>{item.start_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Время окончания:</b>
                  </td>
                  <td>{item.end_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Бронирование до:</b>
                  </td>
                  <td>{item.expry_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Количество мест</b>
                  </td>
                  <td>{item.client_count}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Состояние Статуса</b>
                  </td>
                  {item.listing_status.map((listStatus) => (
                    <td key={listStatus.id}>
                      <Tag color="green" bordered={false}>
                        {listStatus.nameru}
                      </Tag>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Удобства</b>
                  </td>
                  {item.priority.map((priorities) => (
                    <td key={priorities.id}>
                      <Tag color="#1677ff">{priorities.nameru}</Tag>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <span>
              {" "}
              <b>Дополнительно</b>
            </span>
            <p className={css.listingTextDescription}>{item.descriptionuz}</p>
          </Card>
          <Card
            data={item}
            onListingStatusEdit={onListingStatusEdit}
            edit={true}
            // onClick={() => onDelete(item.id)}
            cardHeader={true}
            cardTitle={item.nameen}
            id={item.id}
          >
            <div className={css.listingImgBlockStyle}>
              <Image
                width="100%"
                height="250px"
                src={
                  item.img === null
                    ? "https://admin.eaten.uz/upload/user/img.jpg"
                    : item.img
                }
              />
            </div>
            <table className={css.listingTable}>
              <tbody>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Город:</b>
                  </td>
                  {item.region.map((regions) => (
                    <td key={regions.id}>{regions.nameen}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Район:</b>
                  </td>
                  {item.tuman.map((regions) => (
                    <td key={regions.id}>{regions.nameen}</td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Адрес:</b>
                  </td>
                  <td>{item.addressen}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Телефон:</b>
                  </td>
                  <td>{item.phone}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Время началы:</b>
                  </td>
                  <td>{item.start_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Время окончания:</b>
                  </td>
                  <td>{item.end_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Бронирование до:</b>
                  </td>
                  <td>{item.expry_date}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Количество мест</b>
                  </td>
                  <td>{item.client_count}</td>
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Состояние Статуса</b>
                  </td>
                  {item.listing_status.map((listStatus) => (
                    <td key={listStatus.id}>
                      <Tag color="green" bordered={false}>
                        {listStatus.nameen}
                      </Tag>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className={css.listingTableTd}>
                    <b>Удобства</b>
                  </td>
                  {item.priority.map((priorities) => (
                    <td key={priorities.id}>
                      <Tag color="#1677ff">{priorities.nameen}</Tag>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <span>
              {" "}
              <b>Дополнительно</b>
            </span>
            <p className={css.listingTextDescription}>{item.descriptionen}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}
