import React from "react"
import { Layout } from "antd"

import "../App.css"
import Personal from "./Personal"

const { Content } = Layout
function Content_Personal () {

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        overflow: 'initial'
      }}
    // style={{ margin: '24px 16px 0', overflow: 'initial' }}
    >
      <Personal />
    </Content>
  )
}
export default Content_Personal