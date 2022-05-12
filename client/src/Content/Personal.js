import React ,{ useState , useEffect }from "react"
import {
  Avatar, Row, Col, Divider,
  Descriptions, Table, Button, message
} from 'antd'
import { UserOutlined, UserDeleteOutlined } from '@ant-design/icons'
import axios from "axios"

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
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'File Hash',
    dataIndex: 'hash',
    key: 'hash'
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: 'Style',
    dataIndex: 'style',
    key: 'style'
  },
  {
    title: 'Information' ,
    dataIndex: 'infor',
    key: 'infor'
  }
]
function Personal () {
  const [ uploadData , setUploadData ] = useState([])
  const [ downloadData , setDownloadData ] = useState([])

  const getUploadData = async () => {
    axios.post('http://localhost:8000/uploadlist')
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          //message.success('获取成功')
          let list = []
          for(let i = 0 ; i < res.data.result.length ; i++){
            let listObj = {
              key : i ,
              id : res.data.result[i].id ,
              hash : res.data.result[i].cover,
              author : res.data.result[i].nameWriter,
              style : res.data.result[i].style,
              infor: res.data.result[i].intro
            }
            list.push(listObj)
          }
          setUploadData(list)
        }
      }).catch((err) => {
        message.info('获取失败')
        console.log(err)
      })
  }

  const getDownloadData = async () => {
    axios.post('http://localhost:8000/downloadlist')
      .then((res) => {
        console.log(res)
        if(res.status === 200){
          //message.success('获取成功')
          let list = []
          for(let i = 0 ; i < res.data.result.length ; i++){
            let listObj = {
              key : i ,
              id : res.data.result[i].id ,
              hash : res.data.result[i].cover,
              author : res.data.result[i].nameWriter,
              style : res.data.result[i].style,
              nfor: res.data.result[i].intro
            }
            list.push(listObj)
          }
          setDownloadData(list)
        }
      }).catch((err) => {
        message.info('获取失败')
        console.log(err)
      })
  }

  useEffect(()=>{
    getUploadData()
    getDownloadData()
  },[])

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
        <Table columns={columns} dataSource={uploadData} size="middle" />
        <Divider>Download Record</Divider>
        <Table columns={columns} dataSource={downloadData} size="middle" />
      </Col>
    </Row>
  )
}
export default Personal