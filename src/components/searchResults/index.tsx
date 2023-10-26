import { Component } from 'react';
import { IPokemon, ISearchResultProps } from './types';
import PokemonCard from '../pokemonCard';
import Message from '../message';
import style from './style.module.scss';

class SearchResult extends Component<ISearchResultProps> {
  render() {
    const { pokemons } = this.props;

    return (
      <>
        {pokemons.length === 0 ? (
          <Message errorMessage="No pokemons found" />
        ) : (
          <ul className={style.list}>
            {pokemons.map((pokemon: IPokemon) => {
              return <PokemonCard key={pokemon.name} url={pokemon.url} />;
            })}
          </ul>
        )}
      </>
    );
  }
}

export default SearchResult;
