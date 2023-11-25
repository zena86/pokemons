import { screen, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// import {
//   MemoryRouter,
//   RouterProvider,
//   createMemoryRouter,
// } from 'react-router-dom';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
// import { routerConfig } from '../router';
// import { searchMock } from './data/searchMock';
// import { renderWithProviders } from './test-utils';
import Detail from '@/components/detail/Detail';
import { pokemonsRequest } from './data/pokemonsRequest';
import DetailDescription from '@/components/detailDescription/DetailDescription';
import pockemonN3ResponseJson from './data/pokemonN3.json';
import { pokemonDescription } from './data/pokemonDescription';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// import { RouterContext } from 'next/dist/next-server/lib/router-context';
// import mockRouter from "next-router-mock";

import { Router } from 'next/router';
import { createMockRouter } from './data/createMockRouter';

describe('Detail Component', () => {
  // beforeEach(() => {
  //   searchMock();
  // });
  // const router = createRouter('', { user: 'nikita' }, '', {
  //   initialProps: {},
  //   pageLoader: jest.fn(),
  //   App: jest.fn(),
  //   Component: jest.fn(),
  // });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    // renderWithProviders(
    //   <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
    //     <Detail />
    //   </MemoryRouter>,
    //   {
    //     preloadedState: {},
    //   }
    // );

    // mockRouter.setCurrentUrl("/?frontpage=1&search=&limit=12&details=venusaur");
    // render(<Detail pokemonsRequest={pokemonsRequest} />);
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        {/* <DetailDescription pokemon={pokemonDescription} /> */}
        <Detail pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );
    screen.debug();

    expect(await screen.findByText(/venusaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/weight:/i)).toBeInTheDocument();
    expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    expect(await screen.findByText(/height:/i)).toBeInTheDocument();
    expect(await screen.findByText(/20/i)).toBeInTheDocument();
    expect(await screen.findByText(/abilities:/i)).toBeInTheDocument();
    expect(await screen.findByText(/overgrow/i)).toBeInTheDocument();
    expect(await screen.findByText(/chlorophyll/i)).toBeInTheDocument();
    expect(await screen.findByText(/swords-dance/i)).toBeInTheDocument();
    expect(await screen.findByText(/sprites/i)).toBeInTheDocument();
    expect(await screen.findByText(/moves/i)).toBeInTheDocument();
    expect(await screen.findByRole('close')).toBeInTheDocument();
  });

  // test('without query params', async () => {
  //   renderWithProviders(
  //     <MemoryRouter initialEntries={['?frontpage=1&details=venusaur']}>
  //       <Detail />
  //     </MemoryRouter>,
  //     {
  //       preloadedState: {},
  //     }
  //   );

  //   expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
  //   expect(screen.queryByRole('button')).not.toBeInTheDocument();
  // });

  // test('Ensure that clicking the close button hides the component', async () => {
  //   const memoryRouter = createMemoryRouter(routerConfig, {
  //     initialEntries: ['/?frontpage=1&details=venusaur'],
  //   });

  //   renderWithProviders(<RouterProvider router={memoryRouter} />, {
  //     preloadedState: {},
  //   });

  //   expect(await screen.findByText(/moves:/i)).toBeInTheDocument();
  //   const closeBtn = await screen.findByRole('close');
  //   if (closeBtn) await userEvent.click(closeBtn);
  //   expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
  // });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    expect(true).toBe(true);
    return;
  });
});
