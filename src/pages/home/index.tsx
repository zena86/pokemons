import { Component } from 'react';
import SearchBar from '../../components/searchBar';
import SearchResult from '../../components/searchResults';
import { getPokemonsPerPage } from '../../services/pokemon.service';
import { IHomeProps, IHomeState } from './types';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { ITEM_ON_PAGE } from '../../constants';

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    const termLs = localStorage.getItem('term') ?? '';
    this.state = {
      filteredPokemons: [],
      isLoading: false,
      errorMessage: '',
      term: termLs,
    };
  }

  fetchingPokemons = async (search = '') => {
    this.setState({ ...this.state, isLoading: true, term: search });

    const { errorMessage, pokemons } = await getPokemonsPerPage(
      ITEM_ON_PAGE,
      0,
      search
    );

    if (errorMessage) {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: errorMessage,
      });
      return;
    }

    if (pokemons) {
      this.setState({
        ...this.state,
        isLoading: false,
        filteredPokemons: pokemons,
        term: search,
      });
    }
  };

  handleOnSearch = async (term: string) => {
    await this.fetchingPokemons(term);
  };

  async componentDidMount() {
    await this.fetchingPokemons(this.state.term);
  }

  render() {
    const { filteredPokemons, isLoading, errorMessage, term } = this.state;

    return (
      <>
        <SearchBar onFormSubmit={this.handleOnSearch} term={term} />
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
