// import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './style.css';
import 'lib/PointUtils';
import 'lib/RectUtils';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <HashRouter>
  //     <App />
  //   </HashRouter>
  // </React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
);
