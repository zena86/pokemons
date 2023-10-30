import { useEffect, useState } from 'react';
import Home from './pages/home/index';
import ErrorButton from './components/errorButton';

const App = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error('Unexpected error');
    }
  }, [hasError]);

  const handleClick = () => {
    setHasError(true);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <ErrorButton onClick={handleClick} title="Error" />
        <Home />
      </div>
    </div>
  );
};

export default App;
