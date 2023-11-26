import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import Detail from '@/components/detail/Detail';
import { pokemonsRequest } from './data/pokemonsRequest';
import { createMockRouter } from './data/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Search from '@/components/search/Search';

describe('Detail Component', () => {
  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '1',
        search: '',
        limit: '12',
        details: 'venusaur',
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <Detail pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

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

  test('without query params', async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Detail pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

    expect(screen.queryByText(/moves/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '1',
        search: '',
        limit: '12',
        details: 'venusaur',
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <Detail pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );

    expect(await screen.findByText(/moves:/i)).toBeInTheDocument();
    const closeBtn = await screen.findByRole('close');
    if (closeBtn) await userEvent.click(closeBtn);
    expect(router.push).toHaveBeenCalledWith('?frontpage=1&search=&limit=12');
  });

  test('Close on panel click', async () => {
    const router = createMockRouter({
      query: {
        frontpage: '1',
        search: '',
        limit: '12',
        details: 'vwnusaur',
      },
    });

    render(
      <RouterContext.Provider value={router}>
        <Search pokemonsRequest={pokemonsRequest} />
      </RouterContext.Provider>
    );
    const closePanel = await screen.findByRole('closepanel');
    expect(closePanel).toBeInTheDocument();
    if (closePanel) await userEvent.click(closePanel);
    expect(router.push).toHaveBeenCalledWith('?frontpage=1&search=&limit=12');
  });
});
