import { Component } from 'react';
import './App.css';
import Home from './pages/home';

class App extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Oops, something went wrong!');
    }

    return (
      <>
        <button onClick={this.handleClick}>Error Test</button>
        <Home />
      </>
    );
  }
}

export default App;
