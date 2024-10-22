import Control_panel from './pages/controls/control-panel';
import Header_menu from './pages/header/Header';
import Data_Structure from './pages/insert/Data-structure';
import Login_page from './pages/login/login';
import Show_toast from './pages/necessaries/necessaries';
import './style/global.scss'

import {
  HashRouter,
  Routes,
  Route,
} from 'react-router-dom';

const Data_Sphere = () => {


  return (
    <div className="datasphere-app">
      <div className="ds-circles" style={{ display: window.location.hash === "#/login_page" ? 'none' : '' }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <HashRouter>
        <Header_menu />
        <Routes>
          <Route path='/' element={<Control_panel />} />
          <Route path='/login_page' element={<Login_page />} />
          <Route path='/data_structure' element={<Data_Structure />} />
        </Routes>
      </HashRouter>
      
      <Show_toast />

    </div>
  );
}

export default Data_Sphere;
