import { Component } from 'react';
import { IPokemonDescriptionProps } from './types';

class PokemonDescription extends Component<IPokemonDescriptionProps> {
  render() {
    const { name, weight, height, abilities } = this.props.pokemon;

    return (
      <li>
        <div>
          <h2>{name}</h2>
          <p>weight: {weight}</p>
          <p>height: {height}</p>
          <p>abilities:</p>
          <ul>
            {abilities.map((item, index) => {
              return <li key={item.toString() + index}>{item.ability.name}</li>;
            })}
          </ul>
        </div>
      </li>
    );
  }
}

export default PokemonDescription;
