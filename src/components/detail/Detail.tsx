import DetailDescription from '../detailDescription';
import LoaderContent from '../../hoc/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';
import { useGetPokemonQuery } from '../../redux/pokemonsApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingDetail } from '../../features/loadDetail/loadDetailSlice';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('details');

  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetPokemonQuery(name);

  useEffect(() => {
    dispatch(loadingDetail({ isLoading }));
  }, [dispatch, isLoading]);

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
