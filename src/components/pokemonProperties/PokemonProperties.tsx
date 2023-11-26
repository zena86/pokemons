import { Ability } from '../pokemonCard/types';
import { PokemonPropertiesProps } from './types';
import styles from './style.module.scss';

const PokemonProperties = ({ pokemon }: PokemonPropertiesProps) => {
  return (
    <div className={styles.properties}>
      <p>
        <strong>weight:</strong> {pokemon.weight}
      </p>
      <p>
        <strong>height:</strong> {pokemon.height}
      </p>
      <div>
        <strong>abilities:</strong>
        <ul className={styles.abilities}>
          {pokemon.abilities.map((item: Ability, index: number) => (
            <li key={`${item.ability.name}${index}`}>{item.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonProperties;
