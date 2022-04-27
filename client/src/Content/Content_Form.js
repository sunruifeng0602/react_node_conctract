import React from "react"
import { Layout } from "antd"

import "../App.css"
import Form_Upload from "./Form_Upload"

const { Content } = Layout

function Content_Form () {
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
      <Form_Upload />
    </Content>
  )
}

export default Content_Form