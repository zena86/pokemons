import { Component } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import { PokemonCardProps, PokemonState } from './types';
import PokemonCard from '../pokemonCard';
import Loader from '../loader';

class PokemonResult extends Component<PokemonCardProps> {
  state: PokemonState = {
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
