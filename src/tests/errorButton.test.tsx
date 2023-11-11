import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorFallback from '../components/errorFallback/';
import { routerConfig } from '../router';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('ErrorButton Component', () => {
  test('Error Button', async () => {
    // expect(true).toBe(true);
    // return;

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['?frontpage=1'],
    });
    render(<RouterProvider router={router} />);
    // render(
    //   <MemoryRouter initialEntries={['?frontpage=1']}>
    //     <SearchContext.Provider
    //       value={{
    //         term: '',
    //         pokemonsPerPage: JSON.parse(allPokemons2).pokemons,
    //       }}
    //     >
    //       <SearchList />
    //     </SearchContext.Provider>
    //   </MemoryRouter>
    // );
    const errorBtn = await screen.findByText(/error/i);
    expect(errorBtn).toBeInTheDocument();

    // await userEvent.click(errorBtn);
    // expect(
    //   await screen.findByText(/Something went wrong/i)
    // ).toBeInTheDocument();
  });

  // test('Error FallBack', async () => {
  //   // expect(true).toBe(true);
  //   // return;
  //   render(<ErrorFallback text={'Test error message'} />);
  //   expect(await screen.findByText(/Test error message/i)).toBeInTheDocument();
  // });
});

test('ErrorFallback Component', async () => {
  // expect(true).toBe(true);
  // return;

  // render(
  //   <MemoryRouter initialEntries={['?frontpage=1']}>
  //     <Search />
  //   </MemoryRouter>
  // );
  // const errorBtn = await screen.findByText(/error/i);
  // expect(errorBtn).toBeInTheDocument();

  // const errorBtn = screen.getByRole('button', { name: /error/i });
  // await userEvent.click(errorBtn);
  // expect(await screen.findByText(/Something went wrong/i)).toBeInTheDocument();

  const renderProviders = (ui: React.ReactElement) => render(ui, {});
  const { getByText } = renderProviders(
    <ErrorFallback text={'something went wrong'} />
  );
  const errorMessage = getByText('something went wrong');
  expect(errorMessage).toBeDefined();
});
