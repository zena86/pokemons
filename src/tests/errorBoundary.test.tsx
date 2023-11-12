import ErrorBoundary from '../components/errorBoundary/';
import { render } from '@testing-library/react';

const Child = () => {
  throw new Error();
};

describe('Error Boundary', () => {
  test(`should render error boundary component when there is an error`, () => {
    // expect(true).toBe(true);
    // return;
    const renderProviders = (ui: React.ReactElement) => render(ui, {});
    const { getByText } = renderProviders(
      <ErrorBoundary fallback={'something went wrong'}>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = getByText('something went wrong');
    expect(errorMessage).toBeDefined();
  });
});
