export interface IAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IForm {
  name: string;
  url: string;
}

export interface IVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

export interface IMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: IVersionGroupDetails[];
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDescription {
  abilities: IAbility[];
  base_experience: unknown;
  forms: IForm[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMove[];
  name: string;
  order: number;
  past_types: unknown[];
  species: {
    name: string;
    url: string;
  };
  sprites: unknown;
  stats: IStat[];
  types: IType[];
  weight: number;
}

export interface IPokemonDescriptionProps {
  pokemon: IPokemonDescription;
}
