import { useSearchParams } from 'react-router-dom';
import Message from '../message';
import Loader from '../loader';
import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import { RiCloseLine } from '@react-icons/all-files/ri/RiCloseLine';
import styles from './style.module.scss';

function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemon, isLoading, errorMessage } = useGetPokemonByName();

  function handleClick() {
    setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
  }

  console.log(pokemon?.sprites);

  return (
    <div className={styles.details}>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading && !errorMessage && searchParams.get('details') !== null && (
        <div>
          <button className={styles.close} onClick={handleClick} name="close">
            <RiCloseLine color={'white'} size={'22px'} />
          </button>
          <h2 className={styles.title}>{pokemon?.name}</h2>
          <p className={styles.property}>
            <strong className={styles.label}>weight: </strong>
            {pokemon?.weight}
          </p>
          <p>
            <strong className={styles.label}>height: </strong>
            {pokemon?.height}
          </p>
          <p>
            <strong className={styles.label}>abilities:</strong>
          </p>
          <ul>
            {pokemon?.abilities.map((item, index) => {
              return <li key={item.toString() + index}>{item.ability.name}</li>;
            })}
          </ul>

          <p>
            <strong className={styles.label}>moves:</strong>
          </p>
          {pokemon?.moves.map((item, index) => {
            return index === pokemon?.moves.length - 1 ? (
              <span key={item.toString() + index}>{item.move.name}</span>
            ) : (
              <span key={item.toString() + index}>{item.move.name}, </span>
            );
          })}
          {pokemon &&
            Object.values(pokemon.sprites).find(
              (item) => typeof item === 'string'
            ) && (
              <p>
                <strong className={styles.label}>sprites:</strong>
              </p>
            )}

          {pokemon &&
            Object.values(pokemon.sprites).map((item, index) => {
              return <img key={index} src={item} alt="" />;
            })}
        </div>
      )}
    </div>
  );
}

export default Detail;
