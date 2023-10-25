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
    const { errorMessage, pokemons } = await getPokemons('100000', '0');

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
        filteredPokemons: filteredList.slice(0, 20),
      });
    }
  };

  async componentDidMount() {
    this.setState({ ...this.state, isLoading: true });

    const { errorMessage, pokemons } = await getPokemons('20', '0');

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
        {isLoading && <Loading />}
        {errorMessage && <Message errorMessage={errorMessage} />}
        <SearchResult pokemons={filteredPokemons} />
      </>
    );
  }
}

export default Home;
