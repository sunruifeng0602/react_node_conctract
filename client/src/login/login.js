import React ,{useState} from 'react';
import { Layout,Row ,Col, Carousel, Typography, Space ,Form, Toast, Button} from '@douyinfe/semi-ui';
import { IconUser ,IconLock,IconMail} from '@douyinfe/semi-icons';

import axios from "axios"
import { useNavigate } from "react-router-dom"


function Login (){

    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const [token, setToken] = useState('')

    const { Header, Content, Footer } = Layout
    const { Title, Paragraph } = Typography;

    const style = {
        width: '100%',
        height: '760px',
    };

    const titleStyle = { 
        position: 'absolute', 
        top: '100px', 
        left: '100px'
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    const renderLogo = () => {
        return (
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='semi_logo' style={{ width:87, height:31 }}/>
        );
    };


    const imgList = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
    ];

    const textList = [
        ['Semi 设计管理系统', '从 Semi Design，到 Any Design', '快速定制你的设计系统，并应用在设计稿和代码中'],
        ['Semi 物料市场', '面向业务场景的定制化组件，支持线上预览和调试', '内容由 Semi Design 用户共建'],
        ['Semi Pro (开发中)', '基于 40+ 真实组件代码设计', '海量页面模板前端代码一键转'],
    ];


    const handleSubmit = (values) => {
        console.log(values);
        setUser(values.email)
        setPassword(values.password)
        axios.post('http://localhost:8000/login',{
            username : user,
            password : password,
        },{withCredentials: true}).then((res) => {
          console.log(res)
          if(res.data.code === 0){
            Toast.info('登录成功')
            setToken(res.data.result.token)
            setLogin(true)
          }
        }).catch((err) => {
          console.log(err)
          Toast.error('登录失败，请检查用户名/密码是否正确')
        })
    };

    return(
        <div>
            <Layout className="components-layout-demo">
                <Content>
                    <Row align="middle">
                        <Col span={18}>
                            <div className="col-content">
                                <Carousel style={style} speed={1000} animation='fade' theme='dark' autoPlay={false}>
                                    {
                                        imgList.map((src, index) => {
                                            return (
                                                <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url(${src})` }}>
                                                    <Space vertical align='start' spacing='medium' style={titleStyle}>
                                                        {renderLogo()}
                                                        <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                                        <Space vertical align='start'>
                                                            <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                                            <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                                        </Space>
                                                    </Space>
                                                </div>
                                            );
                                        })
                                    }
                                </Carousel>
                            </div>
                        </Col>
                        <Col span={6} style={{background : "#A7D4E2"}} >
                            <div className="col-content" style = {{height : '460px',padding: '0 50px', margin: '150px 0'}}>
                                <Form onSubmit={values => handleSubmit(values)} style={{ width: '100%' }} >
                                    {({ formState, values, formApi }) => (
                                        <>
                                            <Form.Input prefix = {<IconMail />} field='email' label='邮箱' style={{ width: '100%' }} placeholder='输入注册邮箱'></Form.Input>
                                            <Form.Input prefix = {<IconLock />} field='password' label='密码' style={{ width: '100%' }} type = 'password'  placeholder='输入密码'></Form.Input>
                                            <Form.Checkbox field='agree' noLabel>我已仔细阅读相关协议</Form.Checkbox>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p>
                                                    <span>Or</span>
                                                    <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor:'pointer'}}>
                                                        <a onClick={() => { navigate('/register') }}>立即注册！</a>
                                                    </Button>
                                                </p>
                                                <Button disabled={!values.agree} htmlType='submit' type="tertiary">登录</Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            </div>
    )
}

export default Login