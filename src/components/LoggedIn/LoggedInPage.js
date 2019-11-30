import React from 'react'
import { Layout } from 'antd'
import LoggedInSider from './LoggedInSider'
import UrlPage from './UrlPage'

class LoggedInPage extends React.Component {
  render () {
    return (
      <Layout id='layout' style={{ minHeight: '100vh' }}>
        <LoggedInSider />
        <Layout>
          <UrlPage />
        </Layout>
      </Layout>
    )
  }
}

export default LoggedInPage
