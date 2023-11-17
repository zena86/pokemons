import LoaderContent from '../../hoc/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';
import { PokemonPropertiesProps } from './types';
import style from './style.module.scss';
import { useGetPokemonQuery } from '../../redux/pokemonsApi';
import { rtkQueryErrorToText } from '../../utils/rtkQueryErrorToText';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingDetail } from '../../features/loadDetail/loadDetailSlice';

const PokemonProperties = ({ id }: PokemonPropertiesProps) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetPokemonQuery(id);

  useEffect(() => {
    dispatch(loadingDetail({ isLoading }));
  }, [dispatch, isLoading]);

  if (!data) return;
  const { name, weight, height, abilities } = data as PokemonDescription;

  return (
    <LoaderContent
      isLoading={isLoading}
      errorMessage={rtkQueryErrorToText(error)}
    >
      {data ? (
        <>
          <h2 className={style['text-title']}>{name}</h2>
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
        </>
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default PokemonProperties;
