import { ButtonProps } from './types';
import style from './style.module.scss';
import { memo } from 'react';

const Button = memo(({ type, title }: ButtonProps) => {
  return (
    <button className={style.button} type={type}>
      {title}
    </button>
  );
});

export default Button;
