import { Component } from 'react';
import SearchBar from '../../components/searchBar';
import SearchResult from '../../components/searchResults';
import { getPokemons } from '../../services/pokemon.service';
import { IHomeState } from './types';
import Loader from '../../components/loader';
import Message from '../../components/message';
import { filter } from '../../utils/filter';
import { ITEM_ON_PAGE, MAX_ITEMS, NUM_OF_PAGE } from '../../constants';

class Home extends Component {
  state: IHomeState = {
    allPokemons: [],
    filteredPokemons: [],
    term: '',
    isLoading: false,
    errorMessage: '',
  };

  handleOnSearch = async (text: string) => {
    this.setState({ ...this.state, isLoading: true });
    const { errorMessage, pokemons } = await getPokemons(
      MAX_ITEMS,
      NUM_OF_PAGE
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
      const filteredList = filter(pokemons, text);
      this.setState({
        ...this.state,
        isLoading: false,
        filteredPokemons: filteredList.slice(+NUM_OF_PAGE, +ITEM_ON_PAGE),
      });
    }
  };

  async componentDidMount() {
    this.setState({ ...this.state, isLoading: true });

    const { errorMessage, pokemons } = await getPokemons(
      ITEM_ON_PAGE,
      NUM_OF_PAGE
    );

    if (errorMessage) {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: errorMessage,
      });
      return;
    }

    this.setState(
      {
        ...this.state,
        isLoading: false,
        allPokemons: pokemons,
        filteredPokemons: pokemons,
      },
      () => {
        const term = localStorage.getItem('term');
        if (term) this.handleOnSearch(term);
      }
    );
  }

  render() {
    const { filteredPokemons, isLoading, errorMessage } = this.state;

    return (
      <>
        <SearchBar onFormSubmit={this.handleOnSearch} />
        {isLoading && <Loader />}
        {errorMessage && <Message errorMessage={errorMessage} />}
        {!isLoading && !errorMessage && (
          <SearchResult pokemons={filteredPokemons} />
        )}
      </>
    );
  }
}

export default Home;
