import React,{useState,useEffect,useRef}from 'react';
import { Layout ,Button,Breadcrumb,
    Toast,Row,Col,Descriptions,List,Card,Rating,
    Divider,Avatar,TextArea, Space
} from '@douyinfe/semi-ui';
import { IconHome,IconUndo,IconAlignBottom ,IconLikeHeart} from '@douyinfe/semi-icons';
import { useNavigate ,useSearchParams} from 'react-router-dom'
import axios from "axios"
import mime from "mime"
import moment from 'moment'

import NavIndex from '../nav/navIndex';
import fileTransferContract from "../contracts/fileTransfer.json"
import getWeb3 from '../getWeb3'

const { Header, Footer, Content } = Layout;

function LayoutDetial (){
    const fileInfoOr = {
        id : 0,
        nameWriter : 'sunruifeng0602',
        downloadNum : '5000',
        comment : '10000',
        hash : '0x0000000000000000000000000000000000000000000000',
        infro : '0000000000000000000000000000000000000000000000000000000000000000'
      } 
    const style = {
        boxShadow: 'var(--semi-shadow-elevated)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '4px',
        padding: '10px',
        marginRight: '20px',
        width: '65%',
        marginTop : '20px'
    };
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
    const fileName = params.get('name')
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
              //avatar: 'https://joeschmoe.io/api/v1/random',
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
        },{withCredentials: true})
        if(res.status === 200){
            Toast.success('评价成功')
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
        console.log(comments)
        return (
            <List
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item  
                        header = {<Avatar color="orange" size="small">YJ</Avatar> }
                        main = {
                            <div>
                                <span style={{color: 'var(--semi-color-text-0)', fontWeight: 500}}> {item.author}</span>
                                {item.content}
                                <p>{item.moment}</p>
                            </div>
                        }  
                    />
                )}                 
            />
        )
    }
    
    const handleSubmit = () => {
        if (!value) {
          return
        }
        setSubmitting(true)
        evaluateFile(3,value)
    
        setTimeout(() => {
          setSubmitting(false)
          setValue('')
          setComments([
            ...comments,
            {
              author: '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',
              content: <p>{value}</p>,
              //avatar: 'https://joeschmoe.io/api/v1/random',
              datetime: moment().fromNow(),
            }
          ])
        }, 1000)
    }
    
      const handleChange = (value,e) => {
        setValue(e.target.value)
        
    }
    
      const downloadFile = async() => {
        //console.log(recordlist)
        axios.post("http://localhost:8000/download",{
          path: fileHash,
          id : fileId,
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

    return(
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
                <Breadcrumb compact={false}>
                    <Breadcrumb.Item icon={<IconHome size="small" />}> 页码:{filePage}</Breadcrumb.Item>
                    <Breadcrumb.Item>Id:{fileId}</Breadcrumb.Item>
                    <Breadcrumb.Item>{fileName}</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Button theme='solid' icon = {<IconAlignBottom /> } onclick={downloadFile}> 下载</Button>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Button theme='solid' icon = {<IconUndo />} onClick={() => { navigate("/list") }}> 返回</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                      borderRadius: '10px',
                      border: '1px solid var(--semi-color-border)',
                      padding: '32px',
                      marginTop : '20px'
                  }}
                >
                    <Row>
                        <Col span={12} offset={6}>
                            <Divider orientation="left">资源信息</Divider>
                        </Col>
                        <Col span={24} offset={4}>
                            <Descriptions row size="large" style={style}>
                                <Descriptions.Item itemKey = '资源ID'>{fileInfo.id}</Descriptions.Item>
                                <Descriptions.Item itemKey = '作者'>{fileInfo.nameWriter}</Descriptions.Item>
                                <Descriptions.Item itemKey = '下载次数'>{fileInfo.downloadNum}</Descriptions.Item>
                                <Descriptions.Item itemKey = '评论次数'>{fileInfo.comment}</Descriptions.Item>
                                <Descriptions.Item itemKey = '资源HASH'>{fileInfo.hash}</Descriptions.Item>
                                <br/>
                                <Descriptions.Item itemKey = '资源描述信息'>
                                    <Card style={{width: '100%'}} bordered = {false} headerLine={true}>
                                        {fileInfo.infro}
                                    </Card>
                                </Descriptions.Item>
                                <Descriptions.Item itemKey = '评分' style={{width : '100%'}}>
                                    <Rating style={{color:'red'}} character={(<IconLikeHeart size="extra-large" />)} defaultValue={3}/>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={12} offset={6} style = {{marginTop : "20px"}}>
                            <Divider orientation="left">评论区</Divider>
                        </Col>
                        <Col span={16} offset={4} style = {{marginTop : "20px"}}>
                            <Space style={{width : '100%' }}>
                                <Avatar color="orange" size="large">
                                    YJ
                                </Avatar>
                                <TextArea rows={4} onChange={handleChange} showClear maxLength={100}></TextArea>
                            </Space>
                            <Col style={{marginTop : '20px'}} offset= {22}>
                                <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">发表评论</Button>
                            </Col>
                            <div>
                                {comments.length > 0 && <CommentList comments={comments} />}
                            </div>
                            
                        </Col>
                        
                    </Row>
                </div>
            </Content>
        </Layout>
    )

}

export default LayoutDetial