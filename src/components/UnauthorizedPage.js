import React from 'react'
import { Typography } from 'antd'
import SignOutButton from './SignInOrOut/SignOutButton'

const { Title, Text } = Typography

const UnauthorizedPage = () => (
  <header className='App-header'>
    <Title level={2}>Lo sentimos</Title>
    <Text>pero no estás autorizado para ver esta página</Text>
    <br />
    <SignOutButton />
  </header>
)
export default UnauthorizedPage
