import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { wrapper } from './../redux/store';

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
// export function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// eslint-disable-next-line react-refresh/only-export-components
export default wrapper.withRedux(App);
