import React from 'react'
import { List, Button } from 'antd'
import { withFirebase } from '../Firebase'

class UrlPage extends React.Component {
  constructor (props) {
    super(props)
    this.props = props

    this.state = {
      urls: []
    }

    this.fetchURLs()
  }

  fetchURLs = () => {
    fetch('/url', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: 'mykey'
      })
    })
      .then(res => res.json())
      .then(res => {
        const urlAliases = Object.keys(res)
        const urls = urlAliases.map(alias => ({
          short: alias,
          long: res[alias]
        }))
        this.setState({
          urls
        })
      })
  }

  render () {
    return (
      <List
        itemLayout='horizontal'
        dataSource={this.state.urls}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a href='https://ant.design'>{item.short}</a>}
              description={<a href='https://ant.design'>{item.long}</a>}
            />
            <Button type='link'>Editar</Button>
            <Button type='link'>Borrar</Button>
          </List.Item>
        )}
      />
    )
  }
}

export default withFirebase(UrlPage)
