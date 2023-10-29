import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import Message from '../message';
import style from './style.module.scss';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('ErrorBoundary caught an error: ', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.error}>
          <div className="wrapper">
            <Message errorMessage="Something went wrong"></Message>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
