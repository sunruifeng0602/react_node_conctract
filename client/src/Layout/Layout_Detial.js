import {
  Layout, Breadcrumb, Image, Row, Col, Avatar, Rate, Badge,
  Descriptions, Divider, Form, Input, Button, List, Comment, message
} from 'antd'
import React, { useRef, useState ,useEffect} from 'react'
import moment from 'moment'
import { useNavigate ,useSearchParams} from 'react-router-dom'
import axios from 'axios'

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'

const { Content, Footer } = Layout
const { TextArea } = Input

function Layout_Detial () {

  const fileInfoOr = {
    id : 0,
    nameWriter : '',
    downloadNum : '',
    comment : '',
    hash : '',
    infro : ''
  } 

  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState({})
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const [fileInfo ,setFileInfo] = useState(fileInfoOr)
  const [refresh , setRefresh] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const fileId = params.get('id')
  const fileHash = params.get('hash')
  const filePage = (fileId/10)+1


  const getCommentList = async () => {
    const res = await axios.post('http://localhost:8000/getcomment',{id : fileId})
    if(res.status === 200){
      const list = []
      for(let i = 0 ; i <  res.data.result.commentList.length ; i++){
        const obj = {
          author : res.data.result.commentList[i].commentator,
          content : <p>{res.data.result.commentList[i].content}</p>,
          datetime : moment(
            parseInt(res.data.result.commentList[i].date)+Date.parse("8/5/2022")
            ).fromNow(),
          avatar: 'https://joeschmoe.io/api/v1/random',
        }
        list.push(obj)
      }
      setComments(list)
    }
  }

  const getFileDetial = async () =>{
      const res = await axios.post('http://localhost:8000/detial',{id : fileId})
      //console.log(res.data.result)
      if(res.status === 200){
        setFileInfo(res.data.result)
        //console.log(fileInfo)
      }
  }

  const evaluateFile = async (score,value) =>{
    const res = await axios.post("http://localhost:8000/evaluate" ,{
      id : fileId,
      score : score,
      content : value,
      account : accounts[0]
    })
    if(res.status === 200){
      message.success('评价成功')
      setRefresh(!refresh)
    }
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
    getFileDetial()
    getCommentList()
  },[refresh])

  //console.log(accounts)

  const CommentList = ({ comments }) => {
    //console.log(comments)
    return (
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
      />
    )
  }

  const handleSubmit = () => {
    if (!value) {
      return
    }
    setSubmitting(true)
    //console.log(value)
    //getWeb3Accounts()
    evaluateFile(3,value)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        ...comments,
        {
          author: '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',
          content: <p>{value}</p>,
          avatar: 'https://joeschmoe.io/api/v1/random',
          datetime: moment().fromNow(),
        }
      ])
    }, 1000)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Layout className="layout">
        <Content
          style={{
            padding: '0 50px',
          }}>
          <Breadcrumb
            style={{
              margin: '30px 0',
            }}>
            <Breadcrumb.Item>Pagr:{filePage}</Breadcrumb.Item>
            <Breadcrumb.Item>Id:{fileId}</Breadcrumb.Item>
            <Breadcrumb.Item>{fileHash}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Button type='primary' onClick={() => { navigate("/") }}>BACK</Button>
            </Breadcrumb.Item>
            <Button type='primary'>DownLoad</Button>
          </Breadcrumb>

          <Layout style={{ background: "#fff" }}>
            <Row style={{ margin: "20px" }}>
              <Col span={12} offset={4}>
                <Divider orientation="left">Resource Information</Divider>
              </Col>
              <Col span={12} offset={6}>
                <Descriptions bordered >
                  {/* <Descriptions.Item label="Image"></Descriptions.Item> */}
                  <Descriptions.Item label="File ID" span={1}>{fileInfo.id}</Descriptions.Item>
                  <Descriptions.Item label="Author Name" span={2}>{fileInfo.nameWriter}</Descriptions.Item>
                  <Descriptions.Item label="Download Number" span={1}>{fileInfo.downloadNum}</Descriptions.Item>
                  <Descriptions.Item label="Comment Number" span={2}>{fileInfo.comment}</Descriptions.Item>
                  <Descriptions.Item label=" File Hash" span={3}>
                    <Badge>
                      {fileInfo.hash}
                    </Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label=" File Information" span={3}>
                    <Badge>
                      {fileInfo.infro}
                    </Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="Rate">
                    <Badge>
                      <Rate  defaultValue={3} />
                    </Badge>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12} offset={4}>
                <Divider orientation="left">Comment</Divider>
              </Col>
              <Col span={12} offset={6}>
                <Comment
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  content={
                    <>
                      <Form.Item>
                        <TextArea rows={4} onChange={handleChange} value={value} showCount maxLength={100} />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                          Add Comment
                        </Button>
                      </Form.Item></>
                  }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
              </Col>
            </Row>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Detials and Comments</Footer>
      </Layout>
    </>
  )
}

export default Layout_Detial