import React from 'react'
import { List, Button, Spin, Icon } from 'antd'
import { withFirebase } from '../Firebase'
import { Layout } from 'antd'
import UrlModal from './UrlModal'
const { Header, Content, Footer } = Layout

class UrlPage extends React.Component {
  constructor (props) {
    super(props)
    this.props = props

    this.state = {
      urls: [],
      addUrlModalVisible: false,
      editUrlModalVisible: false,
      editUrlModalShort: '',
      editUrlModalLong: ''
    }

    this.fetchURLs()
  }

  fetch (body) {
    return this.props.firebase.getToken().then(tok => {
      return fetch('/url', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: tok,
          ...body
        })
      })
    })
  }

  fetchURLs = () => {
    this.fetch({ code: 'get' })
      .then(res => res.json())
      .then(res => {
        const urlAliases = Object.keys(res)
        const urls = urlAliases.map(alias => ({
          short: alias,
          long: res[alias],
          spinning: false
        }))
        this.setState({
          urls
        })
      })
      .catch(err => {
        alert('Error: ', err.message)
        console.error(err)
      })
  }

  deleteURLClientSide = item => {
    const filteredUrls = this.state.urls.filter(
      item2 => item2.short !== item.short
    )
    this.setState({
      urls: filteredUrls
    })
  }

  addURLClientSide = item => {
    this.setState({
      urls: [...this.state.urls, item]
    })
  }

  deleteURL = item => {
    item.spinning = true
    this.fetch({ code: 'del', short: item.short })
      .then(() => {
        this.deleteURLClientSide(item)
      })
      .catch(err => {
        alert('Error: ', err.message)
        console.error(err)
      })
  }

  showAddUrlDialog = () => {
    this.setState({
      addUrlModalVisible: true
    })
  }

  showEditUrlDialog = (short, long) => {
    this.setState({
      editUrlModalShort: short,
      editUrlModalLong: long,
      editUrlModalVisible: true
    })
  }

  createNewUrl = item => {
    return this.fetch({
      code: 'set',
      short: item.short,
      long: item.long
    })
      .then(() => {
        this.addURLClientSide({
          ...item,
          spinning: false
        })
        return new Promise((res, rej) => res())
      })
      .catch(err => {
        alert('Error: ', err.message)
        console.error(err)
      })
  }

  render () {
    return (
      <div>
        <Header theme='dark' style={{ padding: 0 }}>
          <div
          // style={{
          //   display: 'flex',
          //   height: '100%',
          //   flexDirection: 'row-reverse',
          //   alignItems: 'center',
          //   marginRight: '10px'
          // }}
          >
            <Button
              type='primary'
              shape='circle'
              icon='plus'
              size='large'
              className='text-right'
              onClick={this.showAddUrlDialog}
            />
          </div>
        </Header>
        <Content
          theme='dark'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <List
            itemLayout='horizontal'
            dataSource={this.state.urls}
            renderItem={item => (
              <Spin spinning={item.spinning}>
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.short}</span>}
                    description={<a href={item.long}>{item.long}</a>}
                  />
                  <Button
                    type='link'
                    onClick={() =>
                      this.showEditUrlDialog(item.short, item.long)
                    }
                  >
                    Editar
                  </Button>
                  <Button type='link' onClick={() => this.deleteURL(item)}>
                    Borrar
                  </Button>
                </List.Item>
              </Spin>
            )}
          />
        </Content>
        <UrlModal
          visible={this.state.addUrlModalVisible}
          onDissapear={() =>
            this.setState({
              addUrlModalVisible: false
            })
          }
          onSend={this.createNewUrl}
          title='Crear apodo para un enlace'
          submitText='Crear'
        />
        <UrlModal
          visible={this.state.editUrlModalVisible}
          onDissapear={() =>
            this.setState({
              editUrlModalVisible: false,
              editUrlModalLong: '',
              editUrlModalShort: ''
            })
          }
          onSend={this.createNewUrl}
          title='Editar entrada'
          submitText='Confirmar'
          short={this.state.editUrlModalShort}
          long={this.state.editUrlModalLong}
        />
      </div>
    )
  }
}

export default withFirebase(UrlPage)
