import React from "react"

import { Menu } from "antd"
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import "../App.css"
import { useNavigate } from "react-router-dom"

function Menu_L () {

  const navigate = useNavigate()


  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<VideoCameraOutlined />} onClick={() => { navigate('/list') }}>
        Resource List
      </Menu.Item>
      <Menu.Item key="2" icon={< UploadOutlined />} onClick={() => { navigate('/upload') }}>
        Upload Resource
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />} onClick={() => { navigate('/personal') }}>
        Personal
      </Menu.Item>
    </Menu>
  )
}

export default Menu_L