import { Component } from 'react';
import { IPokemonCardProps } from './types';

class PokemonCard extends Component<IPokemonCardProps> {
  render() {
    return <li>{this.props.name}</li>;
  }
}

export default PokemonCard;
