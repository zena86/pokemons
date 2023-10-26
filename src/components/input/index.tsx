import { ChangeEvent, Component } from 'react';
import { IInputProps } from './types';
import style from './style.module.scss';

class Input extends Component<IInputProps> {
  state = {
    term: '',
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: e.target.value });

    const { onInputChange } = this.props;
    onInputChange(e.target.value);
  };

  componentDidMount() {
    const termLs = localStorage.getItem('term');
    if (termLs) {
      this.setState({ term: termLs });
    }
  }

  render() {
    const { term } = this.state;

    return (
      <input
        className={style.input}
        type="text"
        value={term.trim()}
        onChange={this.handleInputChange}
        placeholder="Search..."
      />
    );
  }
}

export default Input;
