import React, { Component } from 'react'
import { Button } from 'antd'
import { withFirebase } from '../Firebase'

class SignInWithGoogleButtonBase extends Component {
  state = {
    loading: false
  }

  enterLoading = () => {
    this.setState({ loading: true })
  }

  leaveLoading = () => {
    this.setState({ loading: false })
  }

  onClick = event => {
    this.enterLoading()
    this.props.firebase.auth
      .signInWithPopup(this.props.firebase.googleProvider)
      .then(result => {
        // Successfully signed in
        this.leaveLoading()
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
      <Button
        type='primary'
        loading={this.state.loading}
        onClick={this.onClick}
      >
        Inicia sesión con Google
      </Button>
    )
  }
}

const SignInWithGoogleButton = withFirebase(SignInWithGoogleButtonBase)

export default SignInWithGoogleButton
