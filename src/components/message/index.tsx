import { Component } from 'react';
import { IErrorMessageProps } from './types';

class Message extends Component<IErrorMessageProps> {
  render() {
    const { errorMessage } = this.props;

    return <p>{errorMessage}</p>;
  }
}

export default Message;
