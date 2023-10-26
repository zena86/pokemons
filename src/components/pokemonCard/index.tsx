import { Component } from 'react';
import { IPokemonDescriptionProps } from './types';
import style from './style.module.scss';

class PokemonCard extends Component<IPokemonDescriptionProps> {
  render() {
    const { name, weight, height, abilities } = this.props.pokemon;

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
              {abilities.map((item, index) => {
                return (
                  <li key={item.toString() + index}>{item.ability.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
        <button className={style['card-button']}>More info</button>
      </li>
    );
  }
}

export default PokemonCard;
