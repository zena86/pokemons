import { Component } from 'react';
import { IErrorMessageProps } from './types';

class Message extends Component<IErrorMessageProps> {
  render() {
    return <p>{this.props.errorMessage}</p>;
  }
}

export default Message;
