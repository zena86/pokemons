// import { useSearchParams } from 'react-router-dom';
// import Message from '../message';
// import Loader from '../loader';
import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import DetailDescription from '../detailDescription';
import LoaderContent from '../../HOK/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';

const Detail = () => {
  // const [searchParams] = useSearchParams();
  //const { pokemon, isLoading, errorMessage } = useGetPokemonByName();
  const respond = useGetPokemonByName();

  return (
    <LoaderContent respond={respond}>
      {respond.content ? (
        <DetailDescription pokemon={respond.content as PokemonDescription} />
      ) : (
        <></>
      )}
    </LoaderContent>

    // <div>
    //   {isLoading && <Loader />}
    //   {errorMessage && <Message errorMessage={errorMessage} />}
    //   {!isLoading &&
    //     !errorMessage &&
    //     //searchParams.get('details') !== null &&
    //     pokemon && <DetailDescription pokemon={pokemon} />}
    // </div>
  );
};

export default Detail;
