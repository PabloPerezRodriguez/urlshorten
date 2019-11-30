import React, { Component } from 'react'
import LoginPage from './components/LoginPage'
import './App.css'
import { withFirebase } from './components/Firebase'
import { Spin } from 'antd'
import LoggedInPage from './components/LoggedIn/LoggedInPage'

class AppBase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authUser: undefined
    }
  }
  componentDidMount () {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    })
  }

  componentWillUnmount () {
    this.listener()
  }

  render () {
    if (this.state.authUser === undefined) {
      return (
        <div className='App'>
          <div className='App-header'>
            <Spin size='large' />
          </div>
        </div>
      )
    }
    if (this.state.authUser === null) {
      return (
        <div className='App'>
          <LoginPage />
        </div>
      )
    } else {
      return (
        <div className='App'>
          <LoggedInPage />
        </div>
      )
    }
  }
}

const App = withFirebase(AppBase)

export default App
