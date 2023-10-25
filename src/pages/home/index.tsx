import { Component } from 'react';
import SearchBar from '../../components/searchBar';
import SearchResult from '../../components/searchResults';
import { getPokemons } from '../../services/pokemon.service';
import { IHomeState } from './types';
import Loading from '../../components/loading';
import Message from '../../components/message';
import { filter } from '../../utils/filter';

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
    const pokemonsAllResponse = await getPokemons('100000', '0');

    if (pokemonsAllResponse.errorMessage) {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: pokemonsAllResponse.errorMessage,
      });
      return;
    }

    if (pokemonsAllResponse.pokemons) {
      const filteredList = filter(pokemonsAllResponse.pokemons, text);
      this.setState({
        ...this.state,
        isLoading: false,
        filteredPokemons: filteredList.slice(0, 20),
      });
    }
  };

  async componentDidMount() {
    this.setState({ ...this.state, isLoading: true });

    const pokemonsResponse = await getPokemons('20', '0');

    if (pokemonsResponse.errorMessage) {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: pokemonsResponse.errorMessage,
      });
      return;
    }

    this.setState(
      {
        ...this.state,
        isLoading: false,
        allPokemons: pokemonsResponse.pokemons,
        filteredPokemons: pokemonsResponse.pokemons,
      },
      () => {
        const term = localStorage.getItem('term');
        if (term) {
          this.handleOnSearch(term);
        }
      }
    );
  }

  render() {
    return (
      <>
        <SearchBar onFormSubmit={this.handleOnSearch} />
        {this.state.isLoading && <Loading />}
        {this.state.errorMessage && (
          <Message errorMessage={this.state.errorMessage} />
        )}
        {!this.state.isLoading && !this.state.errorMessage && (
          <SearchResult pokemons={this.state.filteredPokemons} />
        )}
      </>
    );
  }
}

export default Home;
