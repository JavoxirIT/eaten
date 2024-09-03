import {
	DeleteOutlined,
	InboxOutlined,
	MinusCircleOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { MapComponent } from 'Components/leflet/Leflet';
import { useCategory } from 'Store/Category/useCategory';
import { useCitiesAndDistrict } from 'Store/CitiesAndDistricts/useCitiesAndDistrict';
import { useConvenience } from 'Store/Convenience/useConvenience';
import { useFoodType } from 'Store/FoodType/useFoodType';
import useFoodClass from 'Store/FoofClass/useFoodClass';
import { useAllListing } from 'Store/Listing/useAllListing';
import { useListingType } from 'Store/ListingType/useListingType';
import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Image,
	Input,
	InputNumber,
	Row,
	Select,
	TimePicker,
	Upload,
} from 'antd';
import { configs } from 'config/config';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import css from 'css/PageComponent.module.css';

const { Item, List } = Form;
const { TextArea } = Input;
const { Option } = Select;

export default function ListingForm({ onFinish, image, lldata, title }) {
	const authHeader = useAuthHeader();
	const { category, getCategory } = useCategory();
	const { listingType, getLidtingType } = useListingType();
	const { convenience, getConvenience } = useConvenience();
	const { sities, district } = useCitiesAndDistrict();
	const { foodType, getFoodType } = useFoodType();
	const { foodClass, getFoodClass } = useFoodClass();
	const {
		tagRender,
		oneImageProps,
		contextHolder,
		uploadButton,
		propsGallery,
		onChangeImageGallery,
		form,
		onDeleteStorage,
	} = useAllListing();

	const [isDistrict, setDistrict] = useState(district);

	function onViloyatSelect(e) {
		setDistrict(district.filter(item => item.regions.id === e));
	}

	useEffect(() => {
		getConvenience();
		getFoodType();
		getFoodClass();
		getCategory();
		getLidtingType()
	}, []);
	return (
		<>
			{contextHolder}
			<Divider />
			<div className={css.blockLeaflet}>
				<MapComponent lldata={lldata} />
			</div>

			<Divider />
			<Form onFinish={onFinish} form={form} layout='vertical'>
				<Item name='id' hidden>
					<Input />
				</Item>
				<Item name='phone' label='Telefon'>
					<InputNumber />
				</Item>
				<Item name='client_count' label='Mijozlar soni'>
					<InputNumber />
				</Item>
				<Item name='nameuz' label='Nomi UZ'>
					<Input />
				</Item>
				<Item name='nameru' label='Nomi RU'>
					<Input />
				</Item>
				<Item name='nameen' label='Nomi EN'>
					<Input />
				</Item>
				<Item name='addressuz' label='Manzil UZ'>
					<Input />
				</Item>
				<Item name='addressru' label='Manzil RU'>
					<Input />
				</Item>
				<Item name='addressen' label='Manzil EN'>
					<Input />
				</Item>

				<Item name='region_id' label='Viloyat'>
					<Select
						allowClear
						onSelect={onViloyatSelect}
						virtual={false}
					>
						{sities.map(i => (
							<Option key={i.id} value={i.id}>
								{i.nameuz}
							</Option>
						))}
					</Select>
				</Item>
				<Item name='tuman_id' label='Tuman'>
					<Select allowClear virtual={false}>
						{isDistrict.length === 0
							? district.map(i => (
								<Option key={i.id} value={i.id}>
									{i.nameuz}
								</Option>
							))
							: isDistrict.map(i => (
								<Option key={i.id} value={i.id}>
									{i.nameuz}
								</Option>
							))}
					</Select>
				</Item>
				<Item name='category_id' label='Kategoriyasi'>
					<Select allowClear virtual={false}>
						{category.map(i => (
							<Option key={i.id} value={i.id}>
								{i.nameuz}
							</Option>
						))}
					</Select>
				</Item>
				<Item name='listing_type_id' label='Ta`om turi'>
					<Select allowClear virtual={false}>
						{listingType.map(i => (
							<Option key={i.id} value={i.id}>
								{i.nameuz}
							</Option>
						))}
					</Select>
				</Item>
				<Item name='conveniences' label='Qulayliklar'>
					<Select
						mode='multiple'
						allowClear
						virtual={false}
						tagRender={tagRender}
					>
						{convenience.map(i => (
							<Option key={i.id} value={i.id}>
								{i.nameuz}
							</Option>
						))}
					</Select>
				</Item>
				<Item name='fdate' label='Qabul kunlari'>
					<DatePicker color='red' multiple />
				</Item>
				<Row>
					<Col span={6}>
						<Item name='fromTime' label='Boshlash soati'>
							<TimePicker />
						</Item>
					</Col>

					<Col span={6}>
						<Item name='toTime' label='Tugash soati'>
							<TimePicker />
						</Item>
					</Col>
				</Row>
				{/* <Item
				name="foods"
				label="Ta`omlar"
			>
				<Select
					mode="multiple"
					allowClear
					virtual={false}
					tagRender={tagRender}
				>
					{foodType.map((i) => (
						<Option key={i.id} value={i.id}>
							{i.nameuz}
						</Option>
					))}
				</Select>
			</Item> */}
				<p>1-taom</p>
				<List name='food_a' style={{ width: '100%' }}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<div
									key={key}
									style={{
										display: 'flex',
										gap: 10,
										marginBottom: 8,
										width: '100%',
									}}
								// align="baseline"
								>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_type']}
										rules={[
											{
												required: true,
												message: 'Ta`omni  tanlang',
											},
										]}
									>
										<Select
											allowClear
											virtual={false}
											style={{ width: '100%' }}
										>
											{foodType.map(i => (
												<Option key={i.id} value={i.id}>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_class']}
										rules={[
											{
												required: true,
												message:
													'Ta`omni turini tanlang',
											},
										]}
									>
										<Select
											mode='multiple'
											allowClear
											virtual={false}
											tagRender={tagRender}
											style={{ width: '100%' }}
										>
											{foodClass.map(i => (
												<Option
													style={{ width: '100%' }}
													key={i.id}
													value={i.id}
												>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</div>
							))}
							<Form.Item>
								<Button
									type='dashed'
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
							</Form.Item>
						</>
					)}
				</List>
				<p>2-taom</p>
				<List name='food_b' style={{ width: '100%' }}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<div
									key={key}
									style={{
										display: 'flex',
										gap: 10,
										marginBottom: 8,
										width: '100%',
									}}
								// align="baseline"
								>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_type']}
										rules={[
											{
												required: true,
												message: 'Ta`omni  tanlang',
											},
										]}
									>
										<Select
											allowClear
											virtual={false}
											style={{ width: '100%' }}
										>
											{foodType.map(i => (
												<Option key={i.id} value={i.id}>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_class']}
										rules={[
											{
												required: true,
												message:
													'Ta`omni turini tanlang',
											},
										]}
									>
										<Select
											mode='multiple'
											allowClear
											virtual={false}
											tagRender={tagRender}
											style={{ width: '100%' }}
										>
											{foodClass.map(i => (
												<Option
													style={{ width: '100%' }}
													key={i.id}
													value={i.id}
												>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</div>
							))}
							<Form.Item>
								<Button
									type='dashed'
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
							</Form.Item>
						</>
					)}
				</List>
				<p>desert</p>
				<List name='food_d' style={{ width: '100%' }}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<div
									key={key}
									style={{
										display: 'flex',
										gap: 10,
										marginBottom: 8,
										width: '100%',
									}}
								// align="baseline"
								>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_type']}
										rules={[
											{
												required: true,
												message: 'Ta`omni  tanlang',
											},
										]}
									>
										<Select
											allowClear
											virtual={false}
											style={{ width: '100%' }}
										>
											{foodType.map(i => (
												<Option key={i.id} value={i.id}>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<Item
										style={{ width: '100%' }}
										{...restField}
										name={[name, 'food_class']}
										rules={[
											{
												required: true,
												message:
													'Ta`omni turini tanlang',
											},
										]}
									>
										<Select
											mode='multiple'
											allowClear
											virtual={false}
											tagRender={tagRender}
											style={{ width: '100%' }}
										>
											{foodClass.map(i => (
												<Option
													style={{ width: '100%' }}
													key={i.id}
													value={i.id}
												>
													{i.nameuz}
												</Option>
											))}
										</Select>
									</Item>
									<MinusCircleOutlined
										onClick={() => remove(name)}
									/>
								</div>
							))}
							<Form.Item>
								<Button
									type='dashed'
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
							</Form.Item>
						</>
					)}
				</List>
				<Item name='descriptionuz' label='Qo`shimcha malinmot UZ'>
					<TextArea />
				</Item>
				<Item name='descriptionru' label='Qo`shimcha malinmot RU'>
					<TextArea />
				</Item>
				<Item name='descriptionen' label='Qo`shimcha malinmot EN'>
					<TextArea />
				</Item>
				<Item name='img' label='Bosh rasim' valuePropName='picture'>
					<Upload
						{...oneImageProps}
						listType='picture-card'
						maxCount={1}
					// defaultFileList={defaultFileList}
					>
						{uploadButton}
					</Upload>
				</Item>

				<Item label="Ko'proq rasim yuklash">
					<Item
						name='gallery'
						valuePropName='file'
						//   getValueFromEvent={normFile}
						noStyle
					>
						<Upload.Dragger
							headers={{
								authorization: authHeader,
							}}
							action={configs.uploadUrl}
							method='POST'
							multiple={true}
							name='image'
							accept='image/*'
							{...propsGallery}
							listType='picture-card'
							onChange={file => onChangeImageGallery(file)}
						>
							<p className='ant-upload-drag-icon'>
								<InboxOutlined />
							</p>
							<p className='ant-upload-text'>
								Yuklash uchun rasimni ushbu hududga bosing yoki
								sudrab torting
							</p>
							<p className='ant-upload-hint'>
								Ko'proq rasim yuklash
							</p>
						</Upload.Dragger>
					</Item>
				</Item>

				<div className='first__image-block'>
					{image?.map((el, index) => (
						<div
							key={el + index.toString()}
							className='first__image-block-two'
						>
							<div className='first__image-block-child1'>
								<DeleteOutlined
									className='first__image-icon'
									onClick={() => onDeleteStorage(el)}
								/>
							</div>
							<img src={el} width='100%' />
						</div>
					))}
				</div>

				<Item>
					<Button
						type='primary'
						htmlType='submit'
						style={{ marginTop: 20 }}
					>
						{title}
					</Button>
				</Item>
			</Form>
		</>
	);
}

// const styles = {
// 	first__image__block: {
// 		position: "relative",
// 		width: "100%",
// 		heigght: 300,
// 	},
// 	first__image__block__child1: {
// 		backgroundColor: "#808080bf",
// 		position: "absolute",
// 		width: "100%",
// 		height: "100%",
// 		opacity: 0,
// 		userSelect: "none",
// 		display: "flex",
// 		justifyContent: "center",
// 		alignItems: "center",
// 		fontSize: 32,
// 		color: "#ff0000"

// 	}
// }
