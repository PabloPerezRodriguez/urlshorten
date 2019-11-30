import React, { Component } from 'react'
import { Button } from 'antd'
import { withFirebase } from '../Firebase'

class SignOutButtonBase extends Component {
  onClick = event => {
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
      <Button type='danger' onClick={this.onClick}>
        Cerrar sesión
      </Button>
    )
  }
}

const SignOutButton = withFirebase(SignOutButtonBase)

export default SignOutButton
