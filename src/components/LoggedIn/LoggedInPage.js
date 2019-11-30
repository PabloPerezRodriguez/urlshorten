import React from 'react'
import { Typography } from 'antd'
import SignOutButton from '../SignInOrOut/SignOutButton'

const { Title } = Typography

const LoggedInPage = () => (
  <div class='App-header'>
    <Title level={2}>Sesión iniciada</Title>
    <SignOutButton />
  </div>
)
export default LoggedInPage
