import { PokemonCardProps } from './types';
import style from './style.module.scss';
import { memo } from 'react';

const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { name, weight, height, abilities } = pokemon;
  //const { content, isLoading, errorMessage } = useGetPokemonByUrl(url);

  return (
    <li className={style.card}>
      <div className={style['card-details']}>
        <h2 className={style['text-title']}>{name}</h2>
        <p>
          <strong>weight:</strong> {weight}
        </p>
        <p>
          <strong>height:</strong> {height}
        </p>
        <div>
          <strong>abilities:</strong>
          <ul>
            {abilities.map((item, index) => (
              <li key={`${item.ability.name}${index}`}>{item.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className={style['card-button']}>More info</button>
    </li>
  );
});

export default PokemonCard;
