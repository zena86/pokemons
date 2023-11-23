import styles from './style.module.scss';
import { Ability } from '../pokemonCard/types';
// import pockemonN1ResponseJson from '../pokemonN1.json';
import { PokemonPropertiesProps } from './types';
import { useGetPokemonQuery } from '@/redux/pokemonsApi';
import LoaderContent from '@/hoc/LoaderContent/LoaderContent';
import { rtkQueryErrorToText } from '@/utils/rtkQueryErrorToText';

const PokemonProperties = ({ id }: PokemonPropertiesProps) => {
  const { data, isLoading, error } = useGetPokemonQuery(id);
  return (
    <LoaderContent
      isLoading={isLoading}
      errorMessage={rtkQueryErrorToText(error)}
    >
      {!isLoading && (data || []) ? (
        <div className={styles.properties}>
          <p>
            <strong>weight:</strong> {data.weight}
          </p>
          <p>
            <strong>height:</strong> {data.height}
          </p>
          <div>
            <strong>abilities:</strong>
            <ul className={styles.abilities}>
              {data.abilities.map((item: Ability, index: number) => (
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
