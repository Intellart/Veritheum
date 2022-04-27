import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from './App';

test('renders App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(document.querySelector('.main-content')).toBeInTheDocument();
});
