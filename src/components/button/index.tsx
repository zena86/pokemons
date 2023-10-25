import { Component } from 'react';
import { IButtonProps } from './types';

class Button extends Component<IButtonProps> {
  render() {
    const { type, title } = this.props;
    return <button type={type}>{title}</button>;
  }
}

export default Button;
