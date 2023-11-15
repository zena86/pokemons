// import { useState, useEffect } from 'react';
// import { PokemonDescription } from '../components/pokemonCard/types';
// import { getPokemon } from '../services/pokemon';
// import { HookRespond } from '../hoc/LoaderContent/types';

// const useGetPokemonByUrl = (url: string): HookRespond => {
//   const [pokemon, setPokemon] = useState<PokemonDescription>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       return await getPokemon(url);
//     };

//     fetchData()
//       .then(({ errorMessage, result }) => {
//         if (errorMessage) {
//           setErrorMessage(errorMessage);
//           return;
//         }
//         if (result) {
//           setPokemon(result);
//         }
//       })
//       .catch((error) => {
//         setErrorMessage(error);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [url]);

//   return { content: pokemon, isLoading, errorMessage };
// };

// export default useGetPokemonByUrl;
