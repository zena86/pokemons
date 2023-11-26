import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from './../redux/store';
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary';
import ErrorFallback from '@/components/errorFallback/ErrorFallback';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<ErrorFallback text="Something went wrong" />}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default wrapper.withRedux(App);
