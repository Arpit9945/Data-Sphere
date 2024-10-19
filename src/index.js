import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DataSphere from './DataSphere';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; 
import { legacy_createStore as createStore } from 'redux';
import rootReducer from '../src/redux/reducers/redux_combiners';
const store = createStore(rootReducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DataSphere />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
