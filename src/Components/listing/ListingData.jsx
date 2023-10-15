import { useAllListing } from "../../Store/Listing/useAllListing";
import { Image, Tag } from "antd";
import { Card } from "../customComponent/Card";
import css from "../../css/PageComponent.module.css";

export default function ListingData() {
  const { allListing, onDelete } = useAllListing();

  console.log("allListing", allListing);

  return (
    <main className={css.listingContainer}>
      {allListing.map((item) => (
        <Card
          eye={true}
          deletes={true}
          onClick={() => onDelete(item.id)}
          cardHeader={true}
          key={item.id}
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
      ))}
    </main>
  );
}
