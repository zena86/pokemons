import styles from './style.module.scss';
import { Ability } from '../pokemonCard/types';
import { PokemonPropertiesProps } from './types';

const PokemonProperties = ({ pokemon }: PokemonPropertiesProps) => {
  // const { data, isLoading, error } = useGetPokemonQuery(id);
  // return (
  //   <LoaderContent
  //     isLoading={isLoading}
  //     errorMessage={rtkQueryErrorToText(error)}
  //   >
  //     {!isLoading && (data || []) ? (
  //       <div className={styles.properties}>
  //         <p>
  //           <strong>weight:</strong> {data.weight}
  //         </p>
  //         <p>
  //           <strong>height:</strong> {data.height}
  //         </p>
  //         <div>
  //           <strong>abilities:</strong>
  //           <ul className={styles.abilities}>
  //             {data.abilities.map((item: Ability, index: number) => (
  //               <li key={`${item.ability.name}${index}`}>
  //                 {item.ability.name}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </div>
  //     ) : (
  //       <></>
  //     )}
  //   </LoaderContent>
  // );

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
