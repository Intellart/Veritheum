// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { isEmpty } from 'lodash';
// Store needs to be imported before App in order for axios interceptors to work correctly
import { store } from './store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { getItem } from './localStorage';
import { actions as categoryActions } from './store/categoriesStore';
import { actions as nftActions } from './store/nftStore';
import { actions as userActions } from './store/userStore';
import { actions as exchangeRatesActions } from './store/exchangeRatesStore';
import './index.css';

const _jwt = getItem('_jwt');
if (!isEmpty(_jwt) && _jwt) store.dispatch(userActions.validateUser(_jwt));
store.dispatch(categoryActions.getCategories());
store.dispatch(nftActions.fetchNfts());
store.dispatch(exchangeRatesActions.getRates());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
