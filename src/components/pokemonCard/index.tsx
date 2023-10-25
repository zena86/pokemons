import { Component } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import { IPokemonCardProps, IPokemonState } from './types';
import PokemonDescription from '../pokemonDescription';

class PokemonCard extends Component<IPokemonCardProps> {
  state: IPokemonState = {
    errorMessage: '',
    pokemon: null,
  };

  async componentDidMount() {
    const { errorMessage, pokemon } = await getPokemon(this.props.url);

    if (errorMessage) {
      this.setState({
        ...this.state,
        errorMessage: errorMessage,
      });
      return;
    }

    this.setState({
      ...this.state,
      pokemon: pokemon,
    });
  }

  render() {
    const { errorMessage, pokemon } = this.state;

    return errorMessage ? (
      <Message errorMessage={errorMessage} />
    ) : pokemon ? (
      <PokemonDescription pokemon={pokemon} />
    ) : (
      ''
    );
  }
}
export default PokemonCard;
