import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'

class Message extends Component {

  render() {
    return (
        <div className="message">
          {
            this.props.icon === 'spinner' ?
              <Spinner animation="border" size="md" className="message-icon" />
              : <this.props.icon size={36} className="message-icon" />
          }
          <div>{ this.props.info }</div>
        </div>
    )
  }
}

export default Message
