import { Pokemon } from './types';
import Message from '../message';
import style from './style.module.scss';
import PokemonCard from '../pokemonCard/PokemonCard';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { isOpenUpdated } from '../../features/viewMode/viewModeSlice';

const SearchList = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemons.pokemons);

  const handleCardClick = () => {
    dispatch(isOpenUpdated({ isOpen: true }));
  };

  return (
    <>
      {pokemons.length === 0 ? (
        <Message errorMessage="No pokemons found" />
      ) : (
        <ul className={style.list}>
          {pokemons.map((pokemon: Pokemon) => {
            return (
              <NavLink
                to={`?frontpage=${searchParams.get('frontpage') || 1}&details=${
                  pokemon.name
                }`}
                className={styles.link}
                key={pokemon.name}
                onClick={handleCardClick}
              >
                <PokemonCard pokemon={pokemon} />
              </NavLink>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchList;
