import PokemonCard from '../pokemonCard';
import { PokemonWrapperProps } from './types';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './style.module.scss';
import useGetPokemonByUrl from '../../hooks/useGetPokemonByUrl';
import LoaderContent from '../../hok/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';

const PokemonWrapper = ({ url }: PokemonWrapperProps) => {
  const [searchParams] = useSearchParams();

  const respond = useGetPokemonByUrl(url);
  const { content } = respond;
  const pokemonDescription = content as PokemonDescription;

  return (
    <LoaderContent respond={respond}>
      {content ? (
        <NavLink
          to={`?frontpage=${searchParams.get('frontpage') || 1}&details=${
            pokemonDescription.name
          }`}
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
