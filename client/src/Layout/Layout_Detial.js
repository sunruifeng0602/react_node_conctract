import {
  Layout, Breadcrumb, Image, Row, Col, Avatar, Rate, Badge,
  Descriptions, Divider, Form, Input, Button, List, Comment
} from 'antd'
import React, { useRef, useState ,useEffect} from 'react'
import moment from 'moment'
import { useNavigate ,useSearchParams} from 'react-router-dom'
import axios from 'axios'

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

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const [fileInfo ,setFileInfo] = useState(fileInfoOr)
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const fileId = params.get('id')
  const fileHash = params.get('hash')
  const filePage = (fileId/10)+1

  const getCommentList = async () => {
    const res = await axios.post('http://localhost:8000/getcomment',{id : fileId})
    if(res.status === 200){
      //console.log(res)
      //setComments(res.data.result.commentList)
      //console.log(parseInt(res.data.result.commentList[0].date))
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

  useEffect(() => {
    const getFileDetial = async () =>{
      const res = await axios.post('http://localhost:8000/detial',{id : fileId})
      //console.log(res.data.result)
      if(res.status === 200){
        setFileInfo(res.data.result)
        console.log(fileInfo)
      }
    }
    getFileDetial()
    getCommentList()
  },[])


  const CommentList = ({ comments }) => {
    console.log(comments)
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

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          content: <p>{value}</p>,
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
                      <Rate allowHalf defaultValue={2.5} />
                    </Badge>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={12} offset={4}>
                <Divider orientation="left">Comment</Divider>
              </Col>
              <Col span={12} offset={6}>
                <Comment
                  // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
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