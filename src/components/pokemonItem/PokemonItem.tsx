import { Component } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import { PokemonCardProps, PokemonState } from './types';
import PokemonCard from '../pokemonCard';
import Loader from '../loader';

class PokemonItem extends Component<PokemonCardProps> {
  state: PokemonState = {
    errorMessage: null,
    pokemon: null,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const { errorMessage, pokemon } = await getPokemon(this.props.url);

    if (errorMessage) {
      this.setState({ isLoading: false, errorMessage: errorMessage });
      return;
    }

    this.setState({ isLoading: false, pokemon: pokemon });
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
export default PokemonItem;
