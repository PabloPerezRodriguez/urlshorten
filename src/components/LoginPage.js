import React from 'react'
import { Typography } from 'antd'
import SignInWithGoogleButton from './SignInOrOut/SignInWithGoogleButton'

const { Title } = Typography

const LogInPage = () => (
  <header className='App-header'>
    <Title level={2}>Acortador de URLs</Title>
    <SignInWithGoogleButton />
  </header>
)
export default LogInPage
