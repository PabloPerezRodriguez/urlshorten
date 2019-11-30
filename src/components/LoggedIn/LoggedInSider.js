import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withFirebase } from '../Firebase'

const { Sider } = Layout

class LoggedInSider extends React.Component {
  state = {
    collapsed: false,
    selectedKeys: ['main_page']
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  selectMenuItem = item => {
    if (item.key !== 'logout') {
      this.setState({
        selectedKeys: [item.key]
      })
    }
  }

  logout = () => {
    this.props.firebase.auth
      .signOut()
      .then(result => {
        // Successfully signed out
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        alert(`Error: ${errorMessage}`)
      })
  }

  render () {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.toggle}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          // mode='inline'
          selectedKeys={this.state.selectedKeys}
          onSelect={this.selectMenuItem}
        >
          <Menu.Item key='main_page'>
            <Icon type='link' />
            <span>URLs</span>
          </Menu.Item>
          {/* <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>nav 2</span>
            </Menu.Item> */}
          <Menu.Item
            key='logout'
            style={{ position: 'absolute', bottom: '48px', width: '100%' }}
            onClick={this.logout}
          >
            <Icon type='logout' />
            <span>Cerrar sesión</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default withFirebase(LoggedInSider)
