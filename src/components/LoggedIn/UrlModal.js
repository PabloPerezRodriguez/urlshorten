import React from 'react'
import { Modal, Button, Form, Input, Icon } from 'antd'

class UrlModal extends React.Component {
  constructor (props) {
    super(props)
    this.props = props

    this.state = {
      visible: false /* pass this to parent if not visible */,
      confirmLoading: false,

      /* text and status */
      shortStatus: null,
      shortValue: '',
      shortHelp: '',
      longStatus: null,
      longValue: '',
      longHelp: ''
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      visible: props.visible,
      longValue: props.long,
      shortValue: props.short
    })
  }

  handleOk = () => {
    this.setState({
      confirmLoading: true
    })

    const allowed = this.validate()
    if (allowed) {
      this.props
        .onSend({
          short: this.state.shortValue,
          long: this.state.longValue
        })
        .then(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
            shortStatus: null,
            shortValue: '',
            shortHelp: '',
            longStatus: null,
            longValue: '',
            longHelp: ''
          })
          this.props.onDissapear()
        })
    } else {
      this.setState({
        confirmLoading: false
      })
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      shortStatus: null,
      shortValue: '',
      shortHelp: '',
      longStatus: null,
      longValue: '',
      longHelp: ''
    })
    this.props.onDissapear()
  }

  validate = () => {
    if (this.state.shortValue === '') {
      this.setState({
        shortStatus: 'error',
        shortHelp: 'Este campo es obligatorio'
      })
      return false
    }
    if (this.state.longValue === '') {
      this.setState({
        longStatus: 'error',
        longHelp: 'Este campo es obligatorio'
      })
      return false
    }
    return true
  }

  render () {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={this.state.confirmLoading}
              onClick={this.handleOk}
            >
              {this.props.submitText}
            </Button>
          ]}
        >
          <Form className='login-form'>
            <Form.Item
              hasFeedback={this.state.shortStatus != null}
              validateStatus={this.state.shortStatus}
              help={this.state.shortHelp}
            >
              <Input
                onChange={event =>
                  this.setState({
                    shortValue: event.target.value,
                    shortHelp: '',
                    shortStatus: null
                  })
                }
                value={this.state.shortValue}
                prefix={
                  <Icon type='shrink' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Apodo'
                onPressEnter={this.handleOk}
              />
            </Form.Item>
            <Form.Item
              hasFeedback={this.state.longStatus != null}
              validateStatus={this.state.longStatus}
              help={this.state.longHelp}
            >
              <Input
                onChange={event =>
                  this.setState({
                    longValue: event.target.value,
                    longHelp: '',
                    longStatus: null
                  })
                }
                value={this.state.longValue}
                prefix={
                  <Icon type='link' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Enlace'
                onPressEnter={this.handleOk}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UrlModal
