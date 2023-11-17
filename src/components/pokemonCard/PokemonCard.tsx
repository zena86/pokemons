import { PokemonCardProps } from './types';
import style from './style.module.scss';
import { memo } from 'react';
import PokemonProperties from '../pokemonProperties';

const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const { name } = pokemon;

  return (
    <li className={style.card}>
      <div className={style['card-details']}>
        <PokemonProperties id={name} />
      </div>
      <button className={style['card-button']}>More info</button>
    </li>
  );
});

export default PokemonCard;
