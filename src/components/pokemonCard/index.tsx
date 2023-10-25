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
    const pokemonResponse = await getPokemon(this.props.url);

    if (pokemonResponse.errorMessage) {
      this.setState({ errorMessage: pokemonResponse.errorMessage });
      return;
    }

    this.setState({
      pokemon: pokemonResponse.pokemon,
    });
  }
  render() {
    return this.state.errorMessage ? (
      <Message errorMessage={this.state.errorMessage} />
    ) : this.state.pokemon ? (
      <PokemonDescription pokemon={this.state.pokemon} />
    ) : (
      ''
    );
  }
}
export default PokemonCard;
