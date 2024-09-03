import { useParams } from "react-router-dom";
import { useAllListing } from "Store/Listing/useAllListing";
import React, { useEffect, useState } from "react";
import { Card } from "../customComponent/Card";
import { Image, Tag } from "antd";
import css from "../../css/PageComponent.module.css";
import ListingForm from "./ListingForm";
import { Modal } from "../modal/ModalIsOpenComponents/Modal";
import dayjs from 'dayjs';
import { GlobalLoad } from "globalLoad/GlobalLoad";

export function OneListings() {
	const params = useParams();
	const { getOneListing, listingOne, onEditListing, form, image, loading } = useAllListing();
	const [visible, setVisible] = useState(false);

	const [lldata, setLLData] = useState({ lat: 0, lng: 0 });

	useEffect(() => {
		getOneListing(params.id);
	}, [params.id]);

	function onListingStatusEdit(e) {

		console.log(e);

		const food_a = [];
		const food_b = [];
		const food_d = [];
		const latlng = JSON.parse(e.location);
		setLLData({ lat: latlng.lat, lng: latlng.lng });
		e?.foods.forEach((food) => {
			if (food?.food_time === "food_a") {
				food_a.push({ food_type: food.food_type_id, food_class: food.food_class.map((el) => el.food_class_id) });
			}
		});
		e?.foods.forEach((food) => {
			if (food?.food_time === "food_b") {
				food_b.push({ food_type: food.food_type_id, food_class: food.food_class.map((el) => el.food_class_id) });
			}
		});
		e?.foods.forEach((food) => {
			if (food?.food_time === "food_d") {
				food_d.push({ food_type: food.food_type_id, food_class: food.food_class.map((el) => el.food_class_id) });
			}
		});
		// console.log(form);
		setVisible(true);
		// uploadButton.form.getFieldDecorator("img", {}),

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
			phone: e?.phone,
			client_count: e?.client_count,
			region_id: e?.region_id,
			tuman_id: e?.tuman_id,
			category_id: e?.category_id,
			listing_type_id: e?.listing_type_id,
			conveniences: e?.conveniences.map((con) => con.convenience.id),
			fdate: e?.dates.map((el) => dayjs(el?.ldate)),
			fromTime: dayjs(e?.dates[0].fromTime, 'HH:mm'),
			toTime: dayjs(e?.dates[0].toTime, 'HH:mm'),
			food_a: food_a[0] !== null ? food_a : null,
			food_b: food_b[0] !== null ? food_b : null,
			food_d: food_d[0] !== null ? food_d : null,
			img: e?.img,
			gallery: JSON.parse(e?.gallery)
		});
	}



	if (loading) return <GlobalLoad />
	return (
		<div>
			<Modal visible={visible} setVisible={setVisible}>
				<ListingForm onFinish={onEditListing} image={image} lldata={lldata} title="O`zgartirish" />
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
									<td className={css.listingTableTdConveniences} >
										{item?.conveniences?.map((priorities) => (
											<Tag key={priorities.id} color="#1677ff">{priorities.convenience.nameuz}</Tag>
										))}
									</td>
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
									{/* {item.tuman.map((regions) => (
										<td key={regions.id}>{regions.nameru}</td>
									))} */}
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
									<td className={css.listingTableTdConveniences} >
										{item?.conveniences?.map((priorities) => (
											<Tag key={priorities.id} color="#1677ff">{priorities.convenience.nameru}</Tag>
										))}
									</td>
								</tr>
							</tbody>
						</table>
						<span>
							{" "}
							<b>Дополнительно</b>
						</span>
						<p className={css.listingTextDescription}>{item.descriptionru}</p>
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
									{item.region.map((regions) => (
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

									<td className={css.listingTableTdConveniences} >
										{item?.conveniences?.map((priorities) => (
											<Tag key={priorities.id} color="#1677ff">{priorities.convenience.nameen}</Tag>
										))}
									</td>

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
