import LoaderContent from '../../hoc/LoaderContent';
// import useGetPokemonByUrl from '../../hooks/useGetPokemonByUrl';
import { PokemonDescription } from '../pokemonCard/types';
import { PokemonPropertiesProps } from './types';
import style from './style.module.scss';
import { useGetPokemonQuery } from '../../redux/pokemonsApi';
// import { useEffect } from 'react';

const PokemonProperties = ({ id }: PokemonPropertiesProps) => {
  const { data, isLoading, error } = useGetPokemonQuery(id);

  if (!data) return;
  const { weight, height, abilities } = data as PokemonDescription;

  return (
    <LoaderContent isLoading={isLoading} errorMessage={error?.error || ''}>
      {data ? (
        <div className={style.properties}>
          <p>
            <strong>weight:</strong> {weight}
          </p>
          <p>
            <strong>height:</strong> {height}
          </p>
          <div>
            <strong>abilities:</strong>
            <ul className={style.abilities}>
              {abilities.map((item, index) => (
                <li key={`${item.ability.name}${index}`}>
                  {item.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default PokemonProperties;
