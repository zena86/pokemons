import { ButtonProps } from './types';
import { memo } from 'react';
import style from './style.module.scss';

const Button = memo(({ type, title }: ButtonProps) => {
  return (
    <button className={style.button} type={type}>
      {title}
    </button>
  );
});

export default Button;
