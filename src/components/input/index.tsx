import { ChangeEvent, Component } from 'react';
import { IInputProps } from './types';
import style from './style.module.scss';

class Input extends Component<IInputProps> {
  state = {
    term: this.props.term,
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ term: e.target.value });
    this.props.onInputChange(e.target.value);
  };

  render() {
    return (
      <input
        className={style.input}
        type="text"
        value={this.state.term}
        onChange={this.handleInputChange}
        placeholder="Pokemon's name"
      />
    );
  }
}

export default Input;
