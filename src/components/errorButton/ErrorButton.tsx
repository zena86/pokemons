import { ErrorButtonProps } from './types';
import style from './style.module.scss';

const ErrorButton = ({ type = 'button', title, onClick }: ErrorButtonProps) => {
  return (
    <button className={style.button} type={type} onClick={onClick}>
      <div className={style['button-top']}>{title}</div>
      <div className={style['button-bottom']}></div>
      <div className={style['button-base']}></div>
    </button>
  );
};

export default ErrorButton;
