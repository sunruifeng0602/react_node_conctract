import React from "react"
import { Layout } from "antd"

import "../App.css"
import Table_List from "./Table_List"

const { Content } = Layout
function Content_List () {

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        overflow: 'initial'
      }}
    >
      <Table_List />
    </Content>
  )
}
export default Content_List