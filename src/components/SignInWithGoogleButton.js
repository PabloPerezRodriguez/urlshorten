import React, { Component } from 'react'
import { Button } from 'antd'
import { withFirebase } from './Firebase'

class SignInWithGoogleButtonBase extends Component {
  onClick = event => {
    this.props.firebase.auth
      .signInWithPopup(this.props.firebase.googleProvider)
      .then(function (result) {
        // Successfully signed in
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        alert(`Error: ${errorMessage}`)
      })
  }
  render () {
    return (
      <Button type='primary' onClick={this.onClick}>
        Inicia sesión con Google
      </Button>
    )
  }
}

const SignInWithGoogleButton = withFirebase(SignInWithGoogleButtonBase)

export default SignInWithGoogleButton
