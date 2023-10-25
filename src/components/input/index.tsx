import { ChangeEvent, Component } from 'react';
import { IInputProps } from './types';

class Input extends Component<IInputProps> {
  state = {
    term: '',
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: e.target.value });
    this.props.onInputChange(e.target.value);
  };

  componentDidMount() {
    const termLs = localStorage.getItem('term');
    if (termLs) {
      this.setState({ term: termLs });
    }
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.term.trim()}
        onChange={this.handleInputChange}
        placeholder="Search..."
      />
    );
  }
}

export default Input;
