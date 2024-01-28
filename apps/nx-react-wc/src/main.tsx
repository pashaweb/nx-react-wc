import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles.css';
import Top from './app/Top';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Top /> 
    </BrowserRouter>

  </StrictMode>
);
