import { Component } from 'react';
import { IPokemon, ISearchResultProps } from './types';
import PokemonCard from '../pokemonCard';

class SearchResult extends Component<ISearchResultProps> {
  render() {
    return (
      <ul>
        {this.props.pokemons.map((pokemon: IPokemon) => {
          return <PokemonCard key={pokemon.name} name={pokemon.name} />;
        })}
      </ul>
    );
  }
}

export default SearchResult;
