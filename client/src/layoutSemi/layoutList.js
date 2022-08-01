import React,{useState,useEffect,useRef}from 'react';
import { Layout ,Space,Input,Button,Row, Col,Table} from '@douyinfe/semi-ui';
import { IconBytedanceLogo ,IconSearch } from '@douyinfe/semi-icons';
import Highlighter from 'react-highlight-words'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import mime from "mime"

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'
import NavIndex from '../nav/navIndex';


const { Header, Footer, Content } = Layout;
function LayoutList(){

    const [web3, setWeb3] = useState(undefined)
    const [accounts, setAccounts] = useState([])
    const [contract, setContract] = useState({})
    const navigate = useNavigate()
    const [recordlist ,setRecord] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [data,setData] = useState([])
    let searchInput = useRef(null)
    const datatest = [
      {
        id :'1',
        name:'1',
        hash:'1',
        author:'1',
        style:'1',
        infor:'1'
      },
      {
        id :'2',
        name:'2',
        hash:'2',
        author:'2',
        style:'2',
        infor:'2'
      }
    ]
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
                  infor: res.data.result.list[i].intro,
                  name: res.data.result.list[i].fileName
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

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown : ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>(
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
              icon={<IconSearch />}
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
      filterIcon: filtered => <IconSearch  style={{ color: filtered ? '#1890ff' : undefined }} />,
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
        title: '资源名称',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
      },
      {
        title: '资源HASH',
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
            <a onClick={() => { navigate('/detials?id='+recordlist.id + '&&hash=' + recordlist.hash + '&&name=' + recordlist.name) }}>
              详情
            </a>
          </Space>
        ),
      },
    ]
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <NavIndex />
                </div>
            </Header>
            <Content
                style={{
                    padding: '24px',
                    backgroundColor: 'var(--semi-color-bg-0)',
                }}
            >
                <div
                    style={{
                      borderRadius: '10px',
                      border: '1px solid var(--semi-color-border)',
                      height: '376px',
                      padding: '32px',
                  }}
                >    
                  <Row>
                    <Col span={24} pull={0} push={0}>
                      <Table columns={columns} dataSource={datatest} onRow = {(record) => {
                        return {
                          onMouseEnter : event => {
                            setRecord(record)
                          }
                        }
                      }}/>
                    </Col>
                  </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default LayoutList
