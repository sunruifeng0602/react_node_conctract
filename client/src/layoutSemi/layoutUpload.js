import React ,{useRef,useState,useEffect}from 'react';
import { Layout, Form,Row,Col,Upload ,Button,Toast} from '@douyinfe/semi-ui';
import {  IconMail,IconUserCircle } from '@douyinfe/semi-icons';
import axios from "axios"

import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'

import NavIndex from '../nav/navIndex';

function LayoutUpload(){
    const { Header, Footer, Content } = Layout;
    const { Option } = Form.Select;

    const formapi = useRef();
    const [file,setFile] = useState(null)
    const [web3, setWeb3] = useState(undefined)
    const [accounts, setAccounts] = useState([])
    const [contract, setContract] = useState({})

    const selectValue = ["Computer", "Physics", "Chemistry", "Petroleum"]

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
    }, [])
    
    const handleSubmit = (values) =>{
        axios.post('http://localhost:8000/upload',{
            ...values,resource:file.result,account : accounts[0]
        },{withCredentials: true})
        .then((res)=>{
            console.log(res)
            if(res.status === 200){
                Toast.success('上传成功')
            }
        }).catch((err)=>{
            Toast.info('上传失败，内部服务出错')
            console.log(err)
        })
    }

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
                    <Row align="middle">
                        <Col span={12} offset={6}>
                            <Form onSubmit={values => handleSubmit(values)} style={{ width: '100%' }}  getFormApi= {formApi => formapi.current = formApi}>
                            {({ formState, values, formApi }) => (
                                <>
                                    <Form.Input prefix = {<IconMail />} field='fileName' label='资源名称' style={{ width: '100%' }} placeholder='输入资源名称'></Form.Input>
                                    <Form.Input prefix = {<IconUserCircle />} field='authorName' label='作者名称' style={{ width: '100%' }} placeholder='作者名称'></Form.Input>
                                    <Form.Select field='selectStyle' defaultValue="选择资源对应的学科类型" label = '学科分类'>
                                        {selectValue.map(item => {
                                            return (
                                            <Option values={item}>{item}</Option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.DatePicker field="selectDate" label='日期'  initValue={new Date()} placeholder='请选择生效日期'></Form.DatePicker>
                                    <Form.TextArea field="resourceDescription" label='资源概述' maxCount={100}></Form.TextArea>
                                    <Upload
                                        action="http://localhost:8000/uploadRequest"
                                        draggable={true}
                                        dragMainText={'点击上传文件或拖拽文件到这里'}
                                        dragSubText="支持任意类型文件"
                                        onSuccess={(files)=>{
                                            console.log(file)
                                            setFile(files)
                                        }}
                                        style = {{height : '200px'}}
                                    ></Upload>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,margin:'15px 0'}}>
                                        <p>
                                            <span></span>
                                            <span></span>
                                        </p>
                                        <Button  htmlType='submit' type="tertiary">上传文件</Button>
                                    </div>
                                </>
                            )}
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default LayoutUpload
