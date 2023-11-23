import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import Select from '../select/Select';
import { selectOptions } from '@/constants';
import SearchBar from '../searchBar/SearchBar';
import SearchList from '../searchList/SearchList';
import { getNumberOfPages } from '@/utils/numberOfPages';
import Pagination from '../pagination/Pagination';
import { PokemonsRequestProps } from './types';

const Search = ({ pokemonsRequest }: PokemonsRequestProps) => {
  const { count, pokemons } = pokemonsRequest;
  const searchParams = useSearchParams();
  const router = useRouter();

  // const { data, isLoading, isError, error } = useGetPokemonsQuery({
  //   limit,
  //   page,
  //   search: term,
  // });

  const closeDetail = () => {
    if (searchParams.get('details')) {
      const page = searchParams.get('frontpage') as string;
      router.push(
        `?frontpage=${page}&search=${searchParams.get(
          'search'
        )}&limit=${searchParams.get('limit')}`
      );
    }
  };

  const handleChangePage = (page: number) => {
    router.push(
      `?frontpage=${page || Number(searchParams.get('frontpage'))}&search=${
        searchParams.get('search') || ''
      }&limit=${Number(searchParams.get('limit')) || 12}`
    );
  };

  return (
    <div
      className={`${styles.sidebar} ${
        searchParams.get('details') ? styles.disabled : ''
      }`}
      onClick={closeDetail}
    >
      <div className="container">
        <div className="wrapper">
          <Select options={selectOptions} />
          <SearchBar />
          {/* <LoaderContent
            isLoading={isLoading}
            errorMessage={rtkQueryErrorToText(error)}
          >
            <SearchList pokemons={data?.pokemons || []} />
          </LoaderContent> */}
          <SearchList pokemons={pokemons || []} />

          {(count || 0) > Number(searchParams.get('limit')) && (
            <Pagination
              nPages={getNumberOfPages(
                count || 0,
                Number(searchParams.get('limit') || 12)
              )}
              page={Number(searchParams.get('frontpage')) || 1}
              onChangePage={handleChangePage}
            />
          )}

          {/* {(data?.count || 0) > limit && !isLoading && !isError && (
            <Pagination
              nPages={getNumberOfPages(data?.count || 0, limit)}
              page={page}
              onChangePage={handleChangePage}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Search;

// import SearchBar from '../searchBar';
// import SearchList from '../searchList';
// import Pagination from '../pagination';
// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { getNumberOfPages } from '../../utils/numberOfPages';
// import Select from '../select/Select';
// import styles from './style.module.scss';
// import LoaderContent from '../../hoc/LoaderContent';
// import { NUM_OF_START_PAGE } from '../../constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { useGetPokemonsQuery } from '../../redux/pokemonsApi';
// import { selectOptions } from '../../constants';
// import { Option } from '../select/types';
// import { loadingMain } from '../../features/loadMain/loadMainSlice';
// import { rtkQueryErrorToText } from '../../utils/rtkQueryErrorToText';
// import { itemsPerPageUpdated } from '../../features/itemsPerPage/itemsPerPageSlice';

// const Search = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [page, setPage] = useState(Number(searchParams.get('frontpage')) || 1);
//   const term = useSelector((state: RootState) => state.search.term);
//   const itemsPerPage = useSelector(
//     (state: RootState) => state.itemsPerPage.itemsPerPage
//   );
//   const [limit, setLimit] = useState(itemsPerPage);

//   const { data, isLoading, isError, error } = useGetPokemonsQuery({
//     limit,
//     page,
//     search: term,
//   });

//   const goToFirstPage = () => {
//     setPage(NUM_OF_START_PAGE);
//     setSearchParams('frontpage=1');
//   };

//   const handleFormSubmit = () => {
//     goToFirstPage();
//   };

//   const handleSettingsChange = (selectedOption: Option) => {
//     setLimit(selectedOption.value);
//     goToFirstPage();
//   };

//   const closeDetail = () => {
//     searchParams.get('details') &&
//       setSearchParams(`?frontpage=${searchParams.get('frontpage')}`);
//   };

//   const handleChangePage = (page: number) => {
//     setPage(page);
//     navigate(`?frontpage=${page}`);
//   };

//   useEffect(() => {
//     dispatch(
//       itemsPerPageUpdated({
//         itemsPerPage: limit,
//       })
//     );

//     dispatch(loadingMain({ isLoading }));
//   }, [dispatch, isLoading, limit]);

//   return (
//     <div
//       className={`${styles.sidebar} ${
//         searchParams.get('details') ? styles.disabled : ''
//       }`}
//       onClick={closeDetail}
//     >
//       <div className="container">
//         <div className="wrapper">
//           <Select options={selectOptions} onChange={handleSettingsChange} />
//           <SearchBar onFormSubmit={handleFormSubmit} />
//           <LoaderContent
//             isLoading={isLoading}
//             errorMessage={rtkQueryErrorToText(error)}
//           >
//             <SearchList pokemons={data?.pokemons || []} />
//           </LoaderContent>
//           {(data?.count || 0) > limit && !isLoading && !isError && (
//             <Pagination
//               nPages={getNumberOfPages(data?.count || 0, limit)}
//               page={page}
//               onChangePage={handleChangePage}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;
