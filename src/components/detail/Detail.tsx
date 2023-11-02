import { useSearchParams } from 'react-router-dom';
import Message from '../message';
import Loader from '../loader';
import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import { GrClose } from '@react-icons/all-files/gr/GrClose';
import styles from './style.module.scss';

function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemon, isLoading, errorMessage } = useGetPokemonByName();

  function handleClick() {
    setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
  }

  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading && !errorMessage && searchParams.get('details') !== null && (
        <div>
          <button className={styles.close} onClick={handleClick} name="close">
            <GrClose />
          </button>
          <h2>{pokemon?.name}</h2>
          <h4>weight: {pokemon?.weight}</h4>
          <h4>height: {pokemon?.height}</h4>

          <h4>abilities:</h4>
          <ul>
            {pokemon?.abilities.map((item, index) => {
              return <li key={item.toString() + index}>{item.ability.name}</li>;
            })}
          </ul>

          <h4>moves:</h4>
          {pokemon?.moves.map((item, index) => {
            return index === pokemon?.moves.length - 1 ? (
              <span key={item.toString() + index}>{item.move.name}</span>
            ) : (
              <span key={item.toString() + index}>{item.move.name}, </span>
            );
          })}

          <h4>sprites</h4>
          {pokemon &&
            Object.values(pokemon.sprites).map((item, index) => {
              return <img key={index} src={item} alt="" />;
            })}
        </div>
      )}
    </>
  );
}

export default Detail;
