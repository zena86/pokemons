import { Component } from 'react';
import style from './style.module.scss';
import Message from '../message';
import { ErrorFallbackProps } from './types';

class ErrorFallback extends Component<ErrorFallbackProps> {
  render() {
    return (
      <div className={style.error}>
        <div className="wrapper">
          <Message errorMessage={this.props.text} />
        </div>
      </div>
    );
  }
}

export default ErrorFallback;
