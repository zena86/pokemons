import { Component, FormEvent } from 'react';
import { ISearchBarProps } from './types';
import Input from '../input';
import Button from '../button';
import style from './style.module.scss';

class SearchBar extends Component<ISearchBarProps> {
  state = { term: this.props.term };

  handleInputChange = (term: string): void => {
    this.setState({ term: term });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { term } = this.state;
    const trimmedTerm = term.trim();
    localStorage.setItem('term', trimmedTerm);
    this.props.onFormSubmit(trimmedTerm);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={style.search}>
        <Input onInputChange={this.handleInputChange} term={this.state.term} />
        <Button type="submit" title="Search" />
      </form>
    );
  }
}

export default SearchBar;
