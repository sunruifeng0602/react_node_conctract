import React from "react"
import {
  Avatar, Row, Col, Divider,
  Descriptions, Table, Button
} from 'antd'
import { UserOutlined, UserDeleteOutlined } from '@ant-design/icons'

const personalData = {
  name: "Li Si",
  adress: "test adress",
  sex: "man",
  birthday: "2000-06-02",
  position: "xxxxxxx",
  education: "xxxxxxx",
  university: "xxxxxxxxx",
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]

function Personal () {

  return (
    <Row>
      <Col span={18} pull={0} push={3}>
        {/* <Row>
          <Avatar shape="square" size={64} icon={<UserDeleteOutlined />} />
          {/* <span>{personalData.name}</span> */}
        {/* </Row> */}
        <Divider>Personal Information</Divider>
        <Descriptions titile="Personal" extra={<Button type="primary">Edit</Button>}>
          <Descriptions.Item label="name">{personalData.name}</Descriptions.Item>
          <Descriptions.Item label="adress">{personalData.adress}</Descriptions.Item>
          <Descriptions.Item label="sex">{personalData.sex}</Descriptions.Item>
          <Descriptions.Item label="birthday">{personalData.birthday}</Descriptions.Item>
          <Descriptions.Item label="position">{personalData.position}</Descriptions.Item>
          <Descriptions.Item label="education">{personalData.education}</Descriptions.Item>
          <Descriptions.Item label="university">{personalData.university}</Descriptions.Item>
        </Descriptions>
        <Divider>Upload Record</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
        <Divider>Download Record</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
      </Col>
    </Row>
  )
}
export default Personal