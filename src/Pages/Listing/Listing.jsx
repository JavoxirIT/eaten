import { lazy, useState } from "react";
import css from "css/PageComponent.module.css";
import { OnSuspense } from "Components/Suspense/OnSuspense";
import ListingForm from "Components/listing/ListingForm";
import { useAllListing } from "Store/Listing/useAllListing";
import { Modal } from "Components/modal/ModalIsOpenComponents/Modal";
import { Button } from "antd";

const ListingData = lazy(() => import("Components/listing/ListingData"));

export default function Listing() {

	const { getOneListing, listingOne, onEditListing, form, image, loading, addListing } = useAllListing();
	const [lldata, setLLData] = useState({ lat: 0, lng: 0 });
	const [visible, setVisible] = useState(false);
	return (
		<OnSuspense>
			<div className={css.ListingHeader}>
				<Button onClick={() => setVisible(true)} >Elon qo`shish</Button>
			</div>
			<ListingData />
			<Modal visible={visible} setVisible={setVisible}>
				<ListingForm form={form} image={image} onFinish={addListing} lldata={lldata} title="Saqlash" />
			</Modal>
		</OnSuspense>
	);
}
