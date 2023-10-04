import { lazy } from "react";
import { AddListing } from "../../Components/listing/AddListing";
import css from "../../css/PageComponent.module.css";

const ListingData = lazy(() => import("../../Components/listing/ListingData"));

export default function Listing() {
  return (
    <main>
      <div className={css.ListingHeader}>
        <AddListing />
      </div>
      <ListingData />
    </main>
  );
}
