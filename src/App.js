import React from 'react'
import logo from './logo.svg'
import { Typography, Button } from 'antd'
import './App.css'

const { Title, Paragraph, Text } = Typography

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <Title level={2}>Acortador de URLs</Title>
        <Button type='primary'>Inicia sesión con Google</Button>
      </header>
    </div>
  )
}

export default App
