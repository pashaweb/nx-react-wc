import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client'
import { AriaAttributes, DOMAttributes } from "react";
import App from './app/app';
declare global {
interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // add any additional attributes here
    }
}
// import '@react-canvas/canvas-element';





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

