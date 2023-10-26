import { useState, useEffect, useContext } from 'react'

import { Outlet, Link } from 'react-router-dom'

import './navBar.css'

// importar iconos
import { ImHome } from 'react-icons/im'

import { AiOutlineSetting, AiOutlineBarChart, AiOutlineUser } from 'react-icons/ai'
import { TransactionContext } from '../../Context/TransactionContext'
import { useAuthMethods } from '../../Context/UserAuthContext'

const NavBar = () => {
  const { currentUser } = useAuthMethods()
  const { dateForFilter, setDateForFilter } = useContext(TransactionContext)

  const [navItemToggleOn, setNavItemToggleOn] = useState({ home: true })

  useEffect(() => {
    const oldStatusNav = JSON.parse(sessionStorage.getItem('navData'))

    if (oldStatusNav) {
      setNavItemToggleOn(oldStatusNav)
    }
  }, [])

  const updateStatusNavItemToggleOn = ({ property }) => {
    let newStatus
    if (property === 'home')
      newStatus = {
        home: true,
        reports: false,
        configuration: false,
        profile: false,
      }
    if (property === 'reports')
      newStatus = {
        home: false,
        reports: true,
        configuration: false,
        profile: false,
      }
    if (property === 'configuration')
      newStatus = {
        home: false,
        reports: false,
        configuration: true,
        profile: false,
      }
    if (property === 'profile')
      newStatus = {
        home: false,
        reports: false,
        configuration: false,
        profile: true,
      }

    sessionStorage.setItem('navData', JSON.stringify(newStatus))
    setNavItemToggleOn(newStatus)
  }

  return (
    <>
      <div className='headerNavContainer'>
        <li
          className='link-to-page logoApp'
          onClick={() =>
            updateStatusNavItemToggleOn({
              property: 'home',
            })
          }
        >
          <Link to='/'>
            <span>#Finanza</span>
          </Link>
        </li>
        <div className='inputDateProfileContainer'>
          <input
            type='month'
            min='2023-01'
            defaultValue={dateForFilter}
            onChange={(e) => {
              setDateForFilter(e.target.value)
            }}
          />
          <li
            className='link-to-page avatarProfile'
            onClick={() =>
              updateStatusNavItemToggleOn({
                property: 'profile',
              })
            }
          >
            <Link to='/perfil'>
              {currentUser !== null && currentUser.photoURL != null ? (
                <img
                  src={currentUser.photoURL}
                  alt='foto de perfil'
                  className='icon-nav link-to-page avatarProfile'
                />
              ) : (
                <AiOutlineUser className='icon-nav link-to-page iconProfile' />
              )}
            </Link>
          </li>
        </div>
      </div>
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
            className={`link-to-page ${navItemToggleOn.home ? 'navItem-on' : ''}`.trim()}
            onClick={() => {
              updateStatusNavItemToggleOn({
                property: 'home',
              })
            }}
          >
            <Link to='/'>
              <ImHome
                className={`link-to-page ${
                  navItemToggleOn.home ? 'nav-icon-optionSelected' : 'nav-icon-option'
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
            <Link to='/reportes'>
              <AiOutlineBarChart
                className={`link-to-page ${
                  navItemToggleOn.reports ? 'nav-icon-optionSelected' : 'nav-icon-option'
                }`.trim()}
              />
            </Link>
            {navItemToggleOn.reports && <span className='navItemText-on'> Reportes</span>}
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
            <Link to='/configuracion'>
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
              navItemToggleOn.profile ? 'navItem-on' : ''
            }`.trim()}
            onClick={() =>
              updateStatusNavItemToggleOn({
                property: 'profile',
              })
            }
          >
            <Link to='/perfil'>
              <AiOutlineUser
                className={`link-to-page ${
                  navItemToggleOn.profile ? 'nav-icon-optionSelected' : 'nav-icon-option'
                }`.trim()}
              />
            </Link>
            {navItemToggleOn.profile && <span className='navItemText-on'> profile</span>}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
