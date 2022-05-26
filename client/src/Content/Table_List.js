import React, { useState, useRef ,useEffect} from "react"
import { Table, Input, Button, Space, Row, Col, message } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate, Outlet } from "react-router-dom"
import axios from "axios"
import mime from "mime"

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'


function Table_List () {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [data,setData] = useState([])
  const [recordlist ,setRecord] = useState(null)
  let searchInput = useRef(null)
  const navigate = useNavigate()

  const getList = async ()=>{
    axios.post('http://localhost:8000/filelist')
        .then((res) =>{
          //console.log(res)
          if(res.status === 200){
            let list = []
            for(let i = 0;i < res.data.result.length ; i++){
              let listObj = {
                key : i,
                id : res.data.result.list[i].id ,
                hash : res.data.result.list[i].cover,
                author : res.data.result.list[i].nameWriter,
                style : res.data.result.list[i].style,
                infor: res.data.result.list[i].intro
              }
              list.push(listObj)
            }
            setData(list)
          }
        })
        .catch((err)=>{
          console.log(err)
        })
  }


  useEffect(() =>{
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
    getList()
  },[])

  
  console.log(accounts)

  const downloadFile = async() => {
    //console.log(recordlist)
    axios.post("http://localhost:8000/download",{
      path: recordlist.hash,
      id : recordlist.id,
      account : accounts[0]
    },{responseType:'blob',withCredentials: true})
    .then((res) =>{
      if(res.status === 200){
        const filetype = mime.getExtension(res.data.type)
        console.log(filetype) 
        const content  = res.data
        const blob = new Blob([content])
        if('download' in document.createElement('a')){
          //非IE
          const a = document.createElement('a')
          a.download = 'download file.'+ filetype;
          a.style.display = 'none';
          a.href = window.URL.createObjectURL(blob);
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: '资源JASH',
      dataIndex: 'hash',
      key: 'hash',
      width: '30%',
      ...getColumnSearchProps('hash'),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: '10%',
      ...getColumnSearchProps('author'),
    },
    {
      title: '学科类型',
      dataIndex: 'style',
      key: 'style',
      ...getColumnSearchProps('style'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '简介' ,
      dataIndex: 'infor',
      key: 'infor',
      ...getColumnSearchProps('infor'),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={downloadFile}>下载</a>
          <a onClick={() => { navigate('/detials?id='+recordlist.id + '&&hash=' + recordlist.hash) }}>
            详情
          </a>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Row>
        <Col span={24} pull={0} push={0}>
          <Table columns={columns} dataSource={data} onRow = {(record) => {
            return {
              onMouseEnter : event => {
                setRecord(record)
              }
            }
          }}/>
        </Col>
      </Row>
    </>
  )
}
export default Table_List