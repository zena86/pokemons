import { Component } from 'react';
import { IPokemon, ISearchResultProps } from './types';
import PokemonCard from '../pokemonCard';
import Message from '../message';

class SearchResult extends Component<ISearchResultProps> {
  render() {
    return (
      <>
        {this.props.pokemons.length === 0 ? (
          <Message errorMessage="No pokemons found" />
        ) : (
          <ul>
            {this.props.pokemons.map((pokemon: IPokemon) => {
              return <PokemonCard key={pokemon.name} url={pokemon.url} />;
            })}
          </ul>
        )}
      </>
    );
  }
}

export default SearchResult;
