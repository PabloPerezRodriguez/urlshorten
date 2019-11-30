import React from 'react'
import { Layout } from 'antd'
import LoggedInSider from './LoggedInSider'

const { Header, Content, Footer } = Layout

class LoggedInPage extends React.Component {
  render () {
    return (
      <Layout id='layout' style={{ minHeight: '100vh' }}>
        <LoggedInSider />
        <Layout>
          <Header theme='dark' style={{ padding: 0 }} />
          <Content
            theme='dark'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default LoggedInPage
