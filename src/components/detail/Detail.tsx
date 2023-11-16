import DetailDescription from '../detailDescription';
import LoaderContent from '../../hoc/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';
import { useGetPokemonQuery } from '../../redux/pokemonsApi';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingDetail } from '../../features/loadDetail/loadDetailSlice';
import { rtkQueryErrorToText } from '../../utils/rtkQueryErrorToText';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('details');

  const dispatch = useDispatch();
  console.log(`!!!!!!!useGetPokemonQuery by NAME ${name}`);
  const { data, isLoading, error } = useGetPokemonQuery(name);

  useEffect(() => {
    dispatch(loadingDetail({ isLoading }));
  }, [dispatch, isLoading]);

  return (
    <LoaderContent
      isLoading={isLoading}
      errorMessage={rtkQueryErrorToText(error)}
    >
      {data ? (
        <DetailDescription pokemon={data as PokemonDescription} />
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default Detail;
