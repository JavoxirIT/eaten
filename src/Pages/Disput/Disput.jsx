import React, { useEffect } from 'react'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space } from 'antd';
import useDisput from 'Store/Disput/useDisput';
import { Card } from 'Components/customComponent/Card';


export default function Disput() {

	const { getDisput, disputs, loading, deleteDisputs } = useDisput()


	useEffect(() => {
		getDisput()
	}, [])

	return (
		<>
			<h1>Shikoyatlat</h1>
			<Card>
				<List
					loading={loading}
					itemLayout="vertical"
					size="large"
					dataSource={disputs}
					renderItem={(item) => (
						<List.Item
							key={item.id}
							actions={[
								<Button type='text' danger onClick={() => deleteDisputs(item.id)} ><DeleteOutlined /> O`chirish</Button>
							]}
							extra={
								<div style={{ textAlign: "end" }} >
									<p>{item.fullname}</p>
									<p>{item.phone}</p>
									<p>{item.email}</p>
								</div>
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={<UserOutlined style={{ color: "red" }} />} />}
								title={<>{item.listing_name}</>}
								description={<h4>{item.disput}</h4>}
							/>
							{/* {item.disput} */}
						</List.Item>
					)}
				/>
			</Card>
		</>
	)
}
