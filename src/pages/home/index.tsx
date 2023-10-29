import { Component } from 'react';
import SearchBar from '../../components/searchBar';
import SearchResult from '../../components/searchResults';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import { HomeProps, HomeState } from './types';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { ITEM_ON_PAGE } from '../../constants';

class Home extends Component<HomeProps, HomeState> {
  state = {
    filteredPokemons: [],
    isLoading: false,
    errorMessage: '',
    term: localStorage.getItem('term') ?? '',
  };

  fetchingPokemons = async (search = '') => {
    this.setState({ isLoading: true });

    const { errorMessage, pokemons } = await getPokemonsPerPage(
      ITEM_ON_PAGE,
      0,
      search
    );

    if (errorMessage) {
      this.setState({ isLoading: false, errorMessage: errorMessage });
      return;
    }

    if (pokemons) {
      this.setState({ isLoading: false, filteredPokemons: pokemons });
    }
  };

  handleFormSubmit = async (term: string) => {
    await this.fetchingPokemons(term);
  };

  componentDidMount() {
    this.fetchingPokemons(this.state.term);
  }

  componentDidUpdate(
    _: Readonly<HomeProps>,
    prevState: Readonly<HomeState>
  ): void {
    if (prevState.term !== this.state.term) {
      this.fetchingPokemons(this.state.term);
    }
  }

  render() {
    const { filteredPokemons, isLoading, errorMessage, term } = this.state;

    return (
      <>
        <SearchBar onFormSubmit={this.handleFormSubmit} term={term} />
        {isLoading && <Loader />}
        {errorMessage && <Message errorMessage={errorMessage} />}
        {!isLoading && !errorMessage && filteredPokemons && (
          <SearchResult pokemons={filteredPokemons} />
        )}
      </>
    );
  }
}

export default Home;
