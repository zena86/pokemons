import { ButtonProps } from './types';
import style from './style.module.scss';

const Button = ({ type, title }: ButtonProps) => {
  return (
    <button className={style.button} type={type}>
      {title}
    </button>
  );
};

export default Button;
