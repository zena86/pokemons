import Message from '../message/Message';
import style from './style.module.scss';
import { ErrorFallbackProps } from './types';

const ErrorFallback = ({ text }: ErrorFallbackProps) => {
  return (
    <div className={style.error}>
      <div className="wrapper">
        <Message errorMessage={text} />
      </div>
    </div>
  );
};

export default ErrorFallback;
