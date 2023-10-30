import { Pokemon, SearchListProps } from './types';
import Message from '../message';
import style from './style.module.scss';
import PokemonWrapper from '../pokemonWrapper';

const SearchList = ({ pokemons }: SearchListProps) => {
  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={style.list}>
          {pokemons.map((pokemon: Pokemon) => {
            return <PokemonWrapper key={pokemon.name} url={pokemon.url} />;
          })}
        </ul>
      )}
    </>
  );
};

export default SearchList;
