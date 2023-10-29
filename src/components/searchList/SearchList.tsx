import { Component } from 'react';
import { Pokemon, SearchListProps } from './types';
import Message from '../message';
import style from './style.module.scss';
import PokemonItem from '../pokemonItem';

class SearchList extends Component<SearchListProps> {
  render() {
    const { pokemons } = this.props;

    return (
      <>
        {pokemons.length === 0 ? (
          <Message errorMessage="No pokemons found" />
        ) : (
          <ul className={style.list}>
            {pokemons.map((pokemon: Pokemon) => {
              return <PokemonItem key={pokemon.name} url={pokemon.url} />;
            })}
          </ul>
        )}
      </>
    );
  }
}

export default SearchList;
