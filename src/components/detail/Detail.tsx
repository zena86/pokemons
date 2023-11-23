// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
// import pockemonN1ResponseJson from '../pokemonN1.json';
import DetailDescription from '../detailDescription/DetailDescription';
// import { PokemonDescription } from '../pokemonCard/types';
import { PokemonsRequestProps } from '../search/types';
// import { loadingDetail } from '@/redux/features/loadDetail/loadDetailSlice';
// import LoaderContent from '@/hoc/LoaderContent/LoaderContent';
// import { useGetPokemonQuery } from '@/redux/pokemonsApi';
// import { rtkQueryErrorToText } from '@/utils/rtkQueryErrorToText';

const Detail = ({ pokemonsRequest }: PokemonsRequestProps) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('details');
  console.log('pokemonsRequest Detail !!!!!!!!!!!!!!!!!!', pokemonsRequest);

  console.log('pokemonsRequest.pokemons', pokemonsRequest.pokemons);

  const pokemon = pokemonsRequest.pokemons.find(
    (pokemon) => pokemon.name === name
  );

  // const dispatch = useDispatch();
  // const { data, isLoading, error } = useGetPokemonQuery(name);
  //const data = pockemonN1ResponseJson;

  // useEffect(() => {
  //   dispatch(loadingDetail({ isLoading }));
  // }, []);

  // return (
  //   <LoaderContent
  //     isLoading={isLoading}
  //     errorMessage={rtkQueryErrorToText(error)}
  //   >
  //     {data ? (
  //       <DetailDescription pokemon={data as PokemonDescription} />
  //     ) : (
  //       <></>
  //     )}
  //   </LoaderContent>
  // );

  return pokemon && <DetailDescription pokemon={pokemon} />;
  //return <h1>test detail</h1>;
};

export default Detail;
