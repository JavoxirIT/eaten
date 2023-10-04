import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';

export function TableStat({statData}) {

    return (
        <>
            <Row gutter={16}>
                {statData.map((item)=>{
                    return (
                        <Col key={item.id} span={24 / statData.length}>
                            <Card bordered={false} style={{backgroundColor: '#ffffff'}}>
                                <Statistic
                                    title={item.title}
                                    value={item.value}
                                    precision={0}
                                    valueStyle={{ color: 'indigo', fontWeight: '700'}}
                                    prefix={item.icon}
                                    suffix={item.sufix}
                                />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}