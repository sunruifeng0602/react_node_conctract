import React, { useState } from "react"
import {
  Form, Input, Select, Space,
  DatePicker, Upload, Row, Col, Button
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload

const selectValue = ["Computer", "Physics", "Chemistry", "Petroleum"]

function Form_Upload () {
  const [componentSize, setComponentSize] = useState('default')
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
  }

  return (
    <Row align="middle">
      <Col span={12} offset={6}>
        <Form
          labelCol={{ span: 4, }}
          wrapperCol={{ span: 14, }}
          layout="horizontal"
          initialValues={{ size: componentSize, }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item name="fileName" label="File Name">
            <Input size="middle" placeholder="Please enter a file name" />
          </Form.Item>
          <Form.Item name="authorName" label="Author Name">
            <Input size="middle" placeholder="Please enter a author name" />
          </Form.Item>
          <Form.Item name="selectStyle" label="Select Style">
            <Select defaultValue="Please select a resource discipline">
              {selectValue.map(item => {
                return (
                  <Option key={item}>{item}</Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name="selectDate" label="Select Date">
            <Space direction="vertical">
              <DatePicker></DatePicker>
            </Space>
          </Form.Item>
          <Form.Item name="resourceDescription" label="Description">
            <TextArea showCount style={{ height: 120 }} maxLength={100} />
          </Form.Item>
          <Form.Item name="resourceSelect" label="Select">
            <Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item name="resourceUpload" label="Upload">
            <Button type="primary" htmlType="submit">
              Upload
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Form_Upload