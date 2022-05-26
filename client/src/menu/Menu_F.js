import React from "react"

import { Menu } from "antd"
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import "../App.css"
import { useNavigate } from "react-router-dom"

function Menu_F () {

  const navigate = useNavigate()


  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
      <Menu.Item key="1" icon={<VideoCameraOutlined />} onClick={() => { navigate('/list') }}>
        资源列表
      </Menu.Item>
      <Menu.Item key="2" icon={< UploadOutlined />} onClick={() => { navigate('/upload') }}>
        上传资源
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />} onClick={() => { navigate('/personal') }}>
        用户记录
      </Menu.Item>
    </Menu>
  )

}

export default Menu_F