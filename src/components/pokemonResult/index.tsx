import { Component } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import { IPokemonCardProps, IPokemonState } from './types';
import PokemonCard from '../pokemonCard';
import Loader from '../loader';

class PokemonResult extends Component<IPokemonCardProps> {
  state: IPokemonState = {
    errorMessage: '',
    pokemon: null,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const { errorMessage, pokemon } = await getPokemon(this.props.url);

    if (errorMessage) {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: errorMessage,
      });
      return;
    }

    this.setState({
      ...this.state,
      isLoading: false,
      pokemon: pokemon,
    });
  }

  render() {
    const { errorMessage, pokemon, isLoading } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {errorMessage && <Message errorMessage={errorMessage} />}
        {!isLoading && !errorMessage && pokemon && (
          <PokemonCard pokemon={pokemon} />
        )}
      </>
    );
  }
}
export default PokemonResult;
