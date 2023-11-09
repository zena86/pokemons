import PokemonCard from '../pokemonCard';
import { PokemonWrapperProps } from './types';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';
import useGetPokemonByUrl from '../../hooks/useGetPokemonByUrl';
import LoaderContent from '../../hoc/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';

const PokemonWrapper = ({ pokemon }: PokemonWrapperProps) => {
  const { name, url } = pokemon;
  const [searchParams] = useSearchParams();

  const { content, isLoading, errorMessage } = useGetPokemonByUrl(url);
  const pokemonDescription = content as PokemonDescription;

  return (
    <LoaderContent isLoading={isLoading} errorMessage={errorMessage}>
      {content ? (
        <NavLink
          to={`?frontpage=${
            searchParams.get('frontpage') || 1
          }&details=${name}`}
          className={styles.link}
        >
          <PokemonCard pokemon={pokemonDescription} />
        </NavLink>
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};
export default PokemonWrapper;
