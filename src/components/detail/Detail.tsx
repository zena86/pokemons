import { useRouter } from 'next/router';
import DetailDescription from '../detailDescription/DetailDescription';
import { PokemonsRequestProps } from '@/redux/types';

const Detail = ({ pokemonsRequest }: PokemonsRequestProps) => {
  const router = useRouter();
  const { details } = router.query;

  const pokemon = pokemonsRequest.pokemons.find(
    (pokemon) => pokemon.name === details
  );

  return pokemon && <DetailDescription pokemon={pokemon} />;
};

export default Detail;
