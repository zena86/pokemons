import { Component } from 'react';
import Home from './pages/home/index';
import ErrorButton from './components/errorButton';

class App extends Component {
  state = {
    hasError: false,
  };

  componentDidUpdate(): void {
    if (this.state.hasError) {
      throw new Error('Unexpected error');
    }
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
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
