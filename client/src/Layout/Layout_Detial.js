import {
  Layout, Breadcrumb, Image, Row, Col, Avatar, Rate, Badge,
  Descriptions, Divider, Form, Input, Button, List, Comment
} from 'antd'
import React, { useRef, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const { Content, Footer } = Layout
const { TextArea } = Input

function Layout_Detial () {

  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const CommentList = ({ comments }) => {
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
          avatar: 'https://joeschmoe.io/api/v1/random',
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
            <Breadcrumb.Item>page</Breadcrumb.Item>
            <Breadcrumb.Item>id</Breadcrumb.Item>
            <Breadcrumb.Item>hash</Breadcrumb.Item>
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
                  <Descriptions.Item label="UserName" span={1}>Zhou Maomao</Descriptions.Item>
                  <Descriptions.Item label="Telephone" span={2}>1810000000</Descriptions.Item>
                  <Descriptions.Item label="Live" span={1}>Hangzhou, Zhejiang</Descriptions.Item>
                  <Descriptions.Item label="Remark" span={2}>empty</Descriptions.Item>
                  <Descriptions.Item label="Address" span={3}>
                    <Badge>
                      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
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