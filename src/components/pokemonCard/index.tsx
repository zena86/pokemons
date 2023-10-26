import { Component } from 'react';
import { getPokemon } from '../../services/pokemon.service';
import Message from '../message';
import { IPokemonCardProps, IPokemonState } from './types';
import PokemonDescription from '../pokemonDescription';
import Loading from '../loading';

class PokemonCard extends Component<IPokemonCardProps> {
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
        {isLoading && <Loading />}
        {errorMessage && <Message errorMessage={errorMessage} />}
        {!isLoading && !errorMessage && pokemon && (
          <PokemonDescription pokemon={pokemon} />
        )}
      </>
    );
  }
}
export default PokemonCard;
