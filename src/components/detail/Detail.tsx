import DetailDescription from '../detailDescription';
import LoaderContent from '../../hoc/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';
import { useGetPokemonQuery } from '../../redux/pokemonsApi';
import { useSearchParams } from 'react-router-dom';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('details');
  const { data, isLoading, error } = useGetPokemonQuery(name);

  return (
    <LoaderContent isLoading={isLoading} errorMessage={error?.error || ''}>
      {data ? (
        <DetailDescription pokemon={data as PokemonDescription} />
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default Detail;
