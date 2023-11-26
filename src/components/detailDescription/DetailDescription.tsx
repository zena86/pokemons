import { useRouter } from 'next/router';
import { RiCloseLine } from '@react-icons/all-files/ri/RiCloseLine';
import { DetailDescriptionProps } from './types';
import { PokemonDescription } from '../pokemonCard/types';
import styles from './style.module.scss';

const DetailDescription = (pokemon: DetailDescriptionProps) => {
  const router = useRouter();
  const { frontpage, search, limit } = router.query;

  const handleClick = () => {
    router.push(`?frontpage=${frontpage}&search=${search}&limit=${limit}`);
  };

  const { name, weight, height, abilities, moves, sprites } =
    pokemon.pokemon as PokemonDescription;

  return (
    <div className={styles.description}>
      <button
        className={styles.close}
        onClick={handleClick}
        name="close"
        role="close"
      >
        <RiCloseLine color={'white'} size={'22px'} />
      </button>
      <h2 className={styles.title}>{name}</h2>
      <div>
        <strong className={styles.label}>weight: </strong>
        <span>{weight}</span>
      </div>
      <div>
        <strong className={styles.label}>height: </strong>
        <span>{height}</span>
      </div>
      <div>
        <strong className={styles.label}>abilities:</strong>
        <ul>
          {abilities.map((item, index) => {
            return <li key={item.toString() + index}>{item.ability.name}</li>;
          })}
        </ul>
      </div>
      <div>
        <strong className={styles.label}>moves:</strong>
        {moves.map((item, index) => {
          return index === moves.length - 1 ? (
            <span key={item.toString() + index}>{item.move.name}</span>
          ) : (
            <span key={item.toString() + index}>{item.move.name}, </span>
          );
        })}
      </div>
      <div>
        {Object.values(sprites).find((item) => typeof item === 'string') && (
          <div>
            <strong className={styles.label}>sprites:</strong>
          </div>
        )}
        {Object.values(sprites).map((item, index) => {
          if (typeof item === 'string') {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={index} src={item} alt="" />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DetailDescription;
