import { Component } from 'react';
import './App.css';
import Home from './pages/home';

class App extends Component {
  state = {
    throwError: false,
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Oops, something went wrong!');
    }
    return (
      <>
        <button
          onClick={() => {
            this.setState({ throwError: true });
          }}
        >
          Error Test
        </button>
        <Home />
      </>
    );
  }
}

export default App;
