// eslint-disable-next-line @typescript-eslint/no-unused-vars
import exp from 'constants';
import { LineData } from '../components/LineChart/LineChart';
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './HomePage';


export function App() {
  return (
    <div className={styles['page-container']}>
      <div role="navigation">
        <ul className={styles['top-nav']}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <HomePage />
            </div>

          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
