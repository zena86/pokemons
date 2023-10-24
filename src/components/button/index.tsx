import { Component } from 'react';
import { IButtonProps } from './types';

class Button extends Component<IButtonProps> {
  render() {
    return <button type={this.props.type}>{this.props.title}</button>;
  }
}

export default Button;
