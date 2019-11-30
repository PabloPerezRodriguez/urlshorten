import React from 'react'
import { Typography } from 'antd'
import SignInWithGoogleButton from './SignInWithGoogleButton'

const { Title } = Typography

const SignUpPage = () => (
  <header className='App-header'>
    <Title level={2}>Acortador de URLs</Title>
    <SignInWithGoogleButton />
  </header>
)
export default SignUpPage
