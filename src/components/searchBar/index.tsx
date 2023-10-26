import { Component, FormEvent } from 'react';
import { ISearchBarProps } from './types';
import Input from '../input';
import Button from '../button';
import style from './style.module.scss';

class SearchBar extends Component<ISearchBarProps> {
  state = { term: '' };

  handleInputChange = (term: string): void => {
    this.setState({ term: term });
  };

  onFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { term } = this.state;
    localStorage.setItem('term', term);
    this.props.onFormSubmit(term);
  };

  componentDidMount(): void {
    const term = localStorage.getItem('term');
    if (term) this.setState({ term: term });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className={style.search}>
        <Input onInputChange={this.handleInputChange} />
        <Button type="submit" title="Search" />
      </form>
    );
  }
}

export default SearchBar;
