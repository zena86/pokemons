import { useSearchParams } from 'react-router-dom';
import Message from '../message';
import Loader from '../loader';
import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import DetailDescription from '../detailDescription';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const { pokemon, isLoading, errorMessage } = useGetPokemonByName();

  return (
    <div>
      {isLoading && <Loader />}
      {errorMessage && <Message errorMessage={errorMessage} />}
      {!isLoading &&
        !errorMessage &&
        searchParams.get('details') !== null &&
        pokemon && <DetailDescription pokemon={pokemon} />}
    </div>
  );
};

export default Detail;
