import { Component } from 'react';
import Home from './pages/home';
import ErrorButton from './components/errorButton';

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
      <div className="container">
        <div className="wrapper">
          <ErrorButton onClick={this.handleClick} title="Error" />
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
