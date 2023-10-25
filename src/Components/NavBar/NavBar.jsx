import { useState } from 'react';

import { Outlet, Link } from 'react-router-dom';

import './navBar.css';

// importar iconos
import { ImHome } from 'react-icons/im';

import { AiOutlineSetting, AiOutlineBarChart, AiOutlineUser } from 'react-icons/ai';

const NavBar = () => {
   const [navItemToggleOn, setNavItemToggleOn] = useState({
      home: true,
      reports: false,
      configuration: false,
      perfil: false,
   });

   const updateStatusNavItemToggleOn = ({ property }) => {
      if (property === 'home')
         setNavItemToggleOn({
            home: true,
            reports: false,
            configuration: false,
            perfil: false,
         });
      if (property === 'reports')
         setNavItemToggleOn({
            home: false,
            reports: true,
            configuration: false,
            perfil: false,
         });
      if (property === 'configuration')
         setNavItemToggleOn({
            home: false,
            reports: false,
            configuration: true,
            perfil: false,
         });
      if (property === 'perfil')
         setNavItemToggleOn({
            home: false,
            reports: false,
            configuration: false,
            perfil: true,
         });
   };

   return (
      <>
         {/* Se encargar de actualizar las páginas */}
         <Outlet />
         <nav className={`container-nav ${navItemToggleOn ? 'nav-abs' : ''}`.trim()}>
            {/* <FiMenu
               className='icon-nav'
               alt='Inicio'
               onClick={() => {
                  setNavItemToggleOn(!navItemToggleOn);
               }}
            /> */}
            <ul className='container-link'>
               <li
                  className={`link-to-page ${
                     navItemToggleOn.home ? 'navItem-on' : ''
                  }`.trim()}
                  onClick={() => {
                     updateStatusNavItemToggleOn({
                        property: 'home',
                     });
                  }}
               >
                  <Link to='/StatusWallet/'>
                     <ImHome
                        className={`link-to-page ${
                           navItemToggleOn.home
                              ? 'nav-icon-optionSelected'
                              : 'nav-icon-option'
                        }`.trim()}
                     />
                  </Link>
                  {navItemToggleOn.home && (
                     <span className='navItemText-on'>
                        {/* <p>Inicio</p> */}
                        Inicio
                     </span>
                  )}
               </li>
               <li
                  className={`link-to-page ${
                     navItemToggleOn.reports ? 'navItem-on' : ''
                  }`.trim()}
                  onClick={() =>
                     updateStatusNavItemToggleOn({
                        property: 'reports',
                     })
                  }
               >
                  <Link to='/StatusWallet/reportes'>
                     <AiOutlineBarChart
                        className={`link-to-page ${
                           navItemToggleOn.reports
                              ? 'nav-icon-optionSelected'
                              : 'nav-icon-option'
                        }`.trim()}
                     />
                  </Link>
                  {navItemToggleOn.reports && (
                     <span className='navItemText-on'> Reportes</span>
                  )}
               </li>
               <li
                  className={`link-to-page ${
                     navItemToggleOn.configuration ? 'navItem-on' : ''
                  }`.trim()}
                  onClick={() =>
                     updateStatusNavItemToggleOn({
                        property: 'configuration',
                     })
                  }
               >
                  <Link to='/StatusWallet/configuracion'>
                     <AiOutlineSetting
                        className={`link-to-page ${
                           navItemToggleOn.configuration
                              ? 'nav-icon-optionSelected'
                              : 'nav-icon-option'
                        }`.trim()}
                     />
                  </Link>
                  {navItemToggleOn.configuration && (
                     <span className='navItemText-on'> Configuración</span>
                  )}
               </li>
               <li
                  className={`link-to-page ${
                     navItemToggleOn.perfil ? 'navItem-on' : ''
                  }`.trim()}
                  onClick={() =>
                     updateStatusNavItemToggleOn({
                        property: 'perfil',
                     })
                  }
               >
                  <Link to='/StatusWallet/perfil'>
                     <AiOutlineUser
                        className={`link-to-page ${
                           navItemToggleOn.perfil
                              ? 'nav-icon-optionSelected'
                              : 'nav-icon-option'
                        }`.trim()}
                     />
                  </Link>
                  {navItemToggleOn.perfil && (
                     <span className='navItemText-on'> Perfil</span>
                  )}
               </li>
            </ul>
         </nav>
      </>
   );
};

export default NavBar;
