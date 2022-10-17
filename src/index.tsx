import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import 'react-app-polyfill/stable'
import 'core-js'
import "@coreui/coreui/dist/css/coreui.css"
import "antd/dist/antd.min.css"
import axios from 'axios';

axios.defaults.baseURL='http://localhost:4000'
let token = localStorage.getItem('Jwt-token')
if(token){
  axios.defaults.headers.common['Jwt-token']=token
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
