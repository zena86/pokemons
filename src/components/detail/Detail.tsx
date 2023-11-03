import useGetPokemonByName from '../../hooks/useGetPokemonByName';
import DetailDescription from '../detailDescription';
import LoaderContent from '../../HOK/LoaderContent/LoaderContent';
import { PokemonDescription } from '../pokemonCard/types';

const Detail = () => {
  const respond = useGetPokemonByName();
  const { content } = respond;

  return (
    <LoaderContent respond={respond}>
      {content ? (
        <DetailDescription pokemon={content as PokemonDescription} />
      ) : (
        <></>
      )}
    </LoaderContent>
  );
};

export default Detail;
