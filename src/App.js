import React from 'react'
import { Typography, Button } from 'antd'
import './App.css'

const { Title } = Typography

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <Title level={2}>Acortador de URLs</Title>
        {/* Make custom sign in with google component */}
        <Button type='primary' onClick={() => {}}>
          Inicia sesión con Google
        </Button>
      </header>
    </div>
  )
}

export default App
