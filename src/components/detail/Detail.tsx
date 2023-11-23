import { useSearchParams } from 'next/navigation';
import DetailDescription from '../detailDescription/DetailDescription';
import { PokemonsRequestProps } from '../search/types';

const Detail = ({ pokemonsRequest }: PokemonsRequestProps) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('details');

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
};

export default Detail;
