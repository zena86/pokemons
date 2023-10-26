import { Component } from 'react';
import { IErrorButtonProps } from './types';
import style from './style.module.scss';

class ErrorButton extends Component<IErrorButtonProps> {
  render() {
    const { type = 'button', title, onClick } = this.props;

    return (
      <button className={style.button} type={type} onClick={onClick}>
        <div className={style['button-top']}>{title}</div>
        <div className={style['button-bottom']}></div>
        <div className={style['button-base']}></div>
      </button>
    );
  }
}

export default ErrorButton;
