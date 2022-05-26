import React ,{ useState , useEffect }from "react"
import {
  Avatar, Row, Col, Divider,
  Descriptions, Table, Button, message
} from 'antd'
import axios from "axios"

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'

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
    title: '文件HASH',
    dataIndex: 'hash',
    key: 'hash'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: '学科类型',
    dataIndex: 'style',
    key: 'style'
  },
  {
    title: '描述信息' ,
    dataIndex: 'infor',
    key: 'infor'
  }
]
function Personal () {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [ uploadData , setUploadData ] = useState([])
  const [ downloadData , setDownloadData ] = useState([])
  const [astate, setAstate] = useState(false)

  const getUploadData = async () => {
    axios.post('http://localhost:8000/uploadlist',{
      account : accounts[0]
    },{withCredentials: true})
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
    axios.post('http://localhost:8000/downloadlist',{
      account : accounts[0]
    },{withCredentials: true})
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

  const setAccount = () =>{
    axios.post('http://localhost:8000/setaccount',{
      account : accounts[0]
    },{withCredentials: true}).then((res)=>{
      if(res.status === 200 ){
        message.info('绑定以太坊账户成功')
        setAstate(!astate)
      }
    })
  }

  useEffect(async ()=>{
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
  },[])

  useEffect(()=>{
    if(!Boolean(accounts.length)){
      return
    }
    getUploadData()
    getDownloadData()
  },[astate])

  return (
    <Row>
      <Col span={18} pull={0} push={3}>
        {/* <Row>
          <Avatar shape="square" size={64} icon={<UserDeleteOutlined />} />
          {/* <span>{personalData.name}</span> */}
        {/* </Row> */}
        <Divider></Divider>
        <Descriptions titile="Personal" extra={<Button type="primary" onClick={setAccount}>绑定账户</Button>}>
        </Descriptions>
        <Divider>资源上传记录</Divider>
        <Table columns={columns} dataSource={uploadData} size="middle" />
        <Divider>资源下载记录</Divider>
        <Table columns={columns} dataSource={downloadData} size="middle" />
      </Col>
    </Row>
  )
}
export default Personal