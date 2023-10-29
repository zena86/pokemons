import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/errorBoundary/index.tsx';
import './index.scss';
import ErrorFallback from './components/fallback/Fallback.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<ErrorFallback text="Something went wrong" />}>
    <App />
  </ErrorBoundary>
);
