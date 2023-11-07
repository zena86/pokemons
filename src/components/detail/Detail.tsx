import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import DetailDescription from '../detailDescription';
import LoaderContent from '../../hoc/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';

const Detail = () => {
  const { content, isLoading, errorMessage } = useGetPokemonByName();
  return (
    <LoaderContent isLoading={isLoading} errorMessage={errorMessage}>
      {content ? (
        <DetailDescription pokemon={content as PokemonDescription} />
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default Detail;
