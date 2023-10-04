import { useAllListing } from "../../Store/Listing/useAllListing";
import { Image } from "antd";
import { Card } from "../customComponent/Card";
import css from "../../css/PageComponent.module.css";

export default function ListingData() {
  const { allListing, onDelete } = useAllListing();

  return (
    <main className={css.listingContainer}>
      {allListing.map((item) => (
        <Card
          onClick={() => onDelete(item.id)}
          cardHeader={true}
          key={item.id}
          cardTitle={item.name}
        >
          <div className={css.listingImgBlockStyle}>
            <Image
              src={
                item.img === null
                  ? "https://admin.eaten.uz/upload/user/img.jpg"
                  : process.env.REACT_APP_IMAGE_URL + item.img
              }
            />
          </div>
          <table className={css.listingTable}>
            <tbody>
              <tr>
                <td className={css.listingTableTd}>
                  <b>Manzil:</b>
                </td>
                <td>{item.address}</td>
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
            </tbody>
          </table>
          <span>
            {" "}
            <b>Qo'shimcha ma'lumot</b>
          </span>
          <p className={css.listingTextDescription}>{item.description}</p>
        </Card>
      ))}
    </main>
  );
}
