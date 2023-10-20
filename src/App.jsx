import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar/NavBar';
import Home from './pages/Home';
import Configuration from './pages/Configuration';
import Reports from './pages/Reports';
import Profile from './pages/Profile';

function App() {
   return (
      <div className='container-app-global'>
         <BrowserRouter>
            <Routes>
               <Route
                  path='/'
                  element={<NavBar />}
               >
                  <Route
                     path='/'
                     Component={Home}
                  />
                  <Route
                     path='/reportes'
                     Component={Reports}
                  />
                  <Route
                     path='/configuracion'
                     Component={Configuration}
                  />
                  <Route
                     path='/perfil'
                     Component={Profile}
                  />
               </Route>
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
