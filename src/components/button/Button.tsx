import { Component } from 'react';
import { ButtonProps } from './types';
import style from './style.module.scss';

class Button extends Component<ButtonProps> {
  render() {
    const { type, title } = this.props;
    return (
      <button className={style.button} type={type}>
        {title}
      </button>
    );
  }
}

export default Button;
