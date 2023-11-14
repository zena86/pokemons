import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ErrorFallback from './components/errorFallback/ErrorFallback.tsx';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary.tsx';
import store from './redux/store.tsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorFallback text="Something went wrong" />}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
