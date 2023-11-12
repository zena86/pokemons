import { PokemonCardProps } from './types';
import style from './style.module.scss';
import { memo } from 'react';
import PokemonProperties from '../pokemonProperties';

const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { name, url } = pokemon;

  return (
    <li className={style.card}>
      <div className={style['card-details']}>
        <h2 className={style['text-title']}>{name}</h2>
        <PokemonProperties url={url} />
      </div>
      <button className={style['card-button']}>More info</button>
    </li>
  );
});

export default PokemonCard;
