import React, { useState ,useEffect} from "react"
import {
  Layout, Breadcrumb, Row, Col,
  Form, Input, Button, Checkbox, Divider
} from 'antd'
import axios from "axios"
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"

const { Header, Content, Footer } = Layout

function Login () {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    setUser(values.username)
    setPassword(values.password)
    console.log(user,password)
  }
  const onLogin = () => {
    axios.post('http://localhost:8000/login',{
        username : user,
        password : password,
    }).then((res) => {
      console.log(res)
      if(res.data.code === 0){
        setLogin(true)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(login){
      navigate('/')
    }
  },[login])



  return (
    <Layout className="site-layout-background-login">
      <Row align="middle">
        <Col span={9} offset={8}>
          <Content style={{ padding: '0 50px', margin: '120px 0' }}>
            <Divider orientation="left">Please Login</Divider>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Login</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-content loginContent" >
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  {/* <a className="login-form-forgot" href="">
                    Forgot password
                  </a> */}
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button"
                    onClick={onLogin}>
                    Log in
                  </Button>
                  <a onClick={() => { navigate('/register') }}>Or register now!</a>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Col>
      </Row>

    </Layout >
  )
}

export default Login