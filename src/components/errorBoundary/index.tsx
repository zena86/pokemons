import { Component, ErrorInfo } from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from './types';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('ErrorBoundary caught an error: ', error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
