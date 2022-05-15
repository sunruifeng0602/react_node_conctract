import React, { useState ,useEffect} from "react"
import {
  Form, Input, Select, Space,
  DatePicker, Row, Col, 
  Button,message
} from 'antd'
import { Upload } from '@douyinfe/semi-ui';
import axios from "axios"

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'



const { Option } = Select
const { TextArea } = Input

const selectValue = ["Computer", "Physics", "Chemistry", "Petroleum"]

function Form_Upload () {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [componentSize, setComponentSize] = useState('default')
  const [file,setFile] = useState(null)
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
  }

  useEffect(() => {
    async function getWbe3State () {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const depployedNetwork = fileTransferContract.networks[networkId];
        const instance = new web3.eth.Contract(
          fileTransferContract.abi,
          depployedNetwork && depployedNetwork.address,
        );
        setWeb3(web3)
        setAccounts(accounts)
        setContract(instance)
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.')
        console.log(error)
      }
    }
    getWbe3State()
  }, [])

  const onFinish = (values) =>{
    axios.post('http://localhost:8000/upload',{
      ...values,resource:file.result,account : accounts[0]
    })
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