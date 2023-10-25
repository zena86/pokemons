import { Component, FormEvent } from 'react';
import { ISearchBarProps } from './types';
import Input from '../input';
import Button from '../button';

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

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <Input onInputChange={this.handleInputChange} />
          <Button type="submit" title="Search" />
        </form>
      </div>
    );
  }
}

export default SearchBar;
