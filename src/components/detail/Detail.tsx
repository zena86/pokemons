// import DetailDescription from '../detailDescription';
// import LoaderContent from '../../hoc/LoaderContent/LoaderContent';
// import { PokemonDescription } from '../pokemonCard/types';
// import { useGetPokemonQuery } from '../../redux/pokemonsApi';

import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { loadingDetail } from '../../features/loadDetail/loadDetailSlice';
// import { rtkQueryErrorToText } from '../../utils/rtkQueryErrorToText';
import { useSearchParams } from 'next/navigation';
import pockemonN1ResponseJson from '../pokemonN1.json';
import DetailDescription from '../detailDescription/DetailDescription';
import { PokemonDescription } from '../pokemonCard/types';

const Detail = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('details');
  console.log('name', name);

  //const dispatch = useDispatch();
  //const { data, isLoading, error } = useGetPokemonQuery(name);
  const data = pockemonN1ResponseJson;
  useEffect(() => {
    //dispatch(loadingDetail({ isLoading }));
  }, []);

  return (
    // <LoaderContent
    //   isLoading={isLoading}
    //   errorMessage={rtkQueryErrorToText(error)}
    // >
    <>
      {data ? (
        <DetailDescription pokemon={data as PokemonDescription} />
      ) : (
        <></>
      )}
    </>

    // </LoaderContent>
  );
};

export default Detail;
