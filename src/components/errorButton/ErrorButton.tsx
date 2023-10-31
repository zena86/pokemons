import style from './style.module.scss';
import { useEffect, useState } from 'react';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('Unexpected error');
    }
  }, [hasError]);

  return (
    <button className={style.button} type="button" onClick={handleClick}>
      <div className={style['button-top']}>Error</div>
      <div className={style['button-bottom']}></div>
      <div className={style['button-base']}></div>
    </button>
  );
};

export default ErrorButton;
