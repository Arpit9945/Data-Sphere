import Header_menu from './pages/header/Header';
import Login_page from './pages/login/login';
import './style/global.scss'

import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="datasphere-app">
        <ul className="ds-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      <HashRouter>
        <Header_menu />
        <Routes>
          <Route path='/login_page' element={<Login_page />} />
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
