import React, { useState, } from "react"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons'
import "../App.css"
import Menu_P from "../menu/Menu_P"
import Content_Personal from "../Content/Content_Personal"
const { Header, Sider, Footer } = Layout


function Layout_Personal () {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div className="logo" />
        <Menu_P />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content_Personal />
        {/* <Footer style={{textAlign: 'center',background: 'black'}}>
          2000-4-14 9:00
        </Footer> */}
      </Layout>
    </Layout>
  )
}
export default Layout_Personal