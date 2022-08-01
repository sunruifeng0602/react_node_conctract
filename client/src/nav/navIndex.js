import React from 'react';
import { Nav,Avatar,Dropdown } from '@douyinfe/semi-ui';
import { IconSemiLogo,IconHome,IconLive,IconUserCircle,IconAlignTop,IconAlignBottom } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom'


function NavIndex(){
    
    const navigate = useNavigate()

    return (
        <Nav mode="horizontal" >
            <Nav.Header>
                <IconSemiLogo style={{ fontSize: 36 }} />
            </Nav.Header>
            <Nav.Item itemKey="Home" text="首页" icon={<IconHome size="large" />}  onClick= {()=>{navigate('/list')}}/>
            <Nav.Item itemKey="Live" text="上传资源" icon={<IconLive size="large" />}  onClick= {()=>{navigate('/upload')}}/>
            <Nav.Footer>
                <Dropdown
                    trigger={'hover'}
                    showTick
                    position={'bottomLeft'}
                    render={
                        <Dropdown.Menu>
                            <Dropdown.Item icon = {<IconUserCircle />}>个人信息</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Title></Dropdown.Title>
                            <Dropdown.Item  icon = {<IconAlignTop />}>上传记录</Dropdown.Item>
                            <Dropdown.Item icon = {<IconAlignBottom />}>
                                下载记录
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    }
                >
                    <Avatar color="orange" size="small">
                        YJ
                    </Avatar>
                </Dropdown>
                
            </Nav.Footer>
        </Nav>
    )
}

export default NavIndex