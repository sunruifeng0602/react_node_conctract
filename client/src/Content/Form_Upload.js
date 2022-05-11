import React, { useState } from "react"
import {
  Form, Input, Select, Space,
  DatePicker, Row, Col, 
  Button,message
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { Upload } from '@douyinfe/semi-ui';
import axios from "axios"
import qs from "qs"

const { Option } = Select
const { TextArea } = Input

const selectValue = ["Computer", "Physics", "Chemistry", "Petroleum"]

function Form_Upload () {
  const [componentSize, setComponentSize] = useState('default')
  const [file,setFile] = useState(null)
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
  }

  const onFinish = (values) =>{
    //setFormData(values)
    //console.log(values)
    //console.log(qs.stringify(values))
    axios.post('http://localhost:8000/upload',{...values,resource:file.result})
      .then((res)=>{
        console.log(res)
          if(res.status === 200){
            message.success('上传成功')
          }
      }).catch((err)=>{
          message.info('上传失败，内部服务出错')
          console.log(err)
      })
  }

  //const uploadFile = () =>{
    // {
    //   fileName : values.fileName,
    //   authorName : values.authorName,
    //   selectStyle : values.selectStyle,
    //   selectDate : values.selectDate,
    //   resourceDescription : values.resourceDescription
    // }
  //}
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
          onFinish={onFinish}
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
            <div>
             <Upload
                action="http://localhost:8000/uploadRequest"
                draggable={true}
                dragMainText={'点击上传文件或拖拽文件到这里'}
                dragSubText="支持任意类型文件"
                onSuccess={(files)=>{
                  console.log(file)
                  setFile(files)
                }}
              ></Upload>
              
            </div>
          </Form.Item>
          <Form.Item name="resourceUpload"  >
            <Button type="primary" htmlType="submit" >
              Upload
            </Button>
          </Form.Item>
        </Form>
        
      </Col>
    </Row>
  )
}

export default Form_Upload