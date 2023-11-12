import LoaderContent from '../../hoc/LoaderContent';
import useGetPokemonByUrl from '../../hooks/useGetPokemonByUrl';
import { PokemonDescription } from '../pokemonCard/types';
import { PokemonPropertiesProps } from './types';
import style from './style.module.scss';

const PokemonProperties = ({ url }: PokemonPropertiesProps) => {
  const { content, isLoading, errorMessage } = useGetPokemonByUrl(url);
  if (!content) return;
  const { weight, height, abilities } = content as PokemonDescription;

  return (
    <LoaderContent isLoading={isLoading} errorMessage={errorMessage}>
      {content ? (
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
