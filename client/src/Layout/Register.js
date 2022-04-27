import React , {useState , useEffect} from "react"
import {
  Layout, Breadcrumb, Row, Col,
  Form, Input, Button, Checkbox, Divider
} from 'antd'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const { Content } = Layout
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

function Register () {


  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [code ,setCode] = useState('')
  const [register , setRegister] = useState(false)
  const [captcha , setCaptcha ] = useState(false) 
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onValuesChange = (changedValues ,allValues) =>{
    //console.log(changedValues)
    setEmail(allValues.email)
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    //console.log(form)
    setEmail(values.email)
    setPassword(values.password)
    setNickname(values.nickname)
    setCode(values.captcha)
  }
  //console.log(email,password,nickname)


  const onRegister = () =>{
    axios.post('http://localhost:8000/register',{
      username:email,
      email : email,
      code : code,
      password : password,
      nickname :nickname
    }).then((res)=>{
      console.log(res)
      if(res.data.code === 0 ){
        setRegister(true)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //发送验证码
  const onCaptcha = () =>{
    console.log(email)
    axios.post('http://localhost:8000/emilecode',{
        email : email,
        type : 1
      }).then((res)=>{
        if(res.data.code === 0){
          setCaptcha(true)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }

  useEffect(()=>{
    if(register){
      navigate('/login')
    }
  },[register])

  return (
    <Layout className="site-layout-background-login">
      <Row align="middle">
        <Col span={12} offset={6}>
          <Content style={{ padding: '0 50px', margin: '120px 0' }}>
            <Divider orientation="left">Register</Divider>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Login</Breadcrumb.Item>
              </Breadcrumb> */}
            <div className="site-layout-content loginContent" >
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                onValuesChange = {onValuesChange}
                initialValues={{
                  residence: ['zhejiang', 'hangzhou', 'xihu'],
                  prefix: '86',
                }}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label="E-mail"
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
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator (_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="nickname"
                  label="Nickname"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your nickname!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        name="captcha"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: 'Please input the captcha you got!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button onClick={onCaptcha}>Get captcha</Button>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    I have read the <a href="">agreement</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  {...tailFormItemLayout}
                >
                  <Button type="primary" htmlType="submit" onClick={onRegister}>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Col>
      </Row>

    </Layout >
  )

}

export default Register