import React from 'react'
import { Link } from 'react-router-dom';


export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top' style={{ margin: "auto" }}>
      <div className='container'>

        <div className='navbar-header'>

          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a class="logo-img" href="" >
            <img src="./img/logo.jpg" alt="" width="25px" height="px" />
          </a>

          <Link to='/' className='navbar-brand page-scroll'>
                geidea
              </Link>

         

        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >

          <ul className='nav navbar-nav navbar-right'>
          <li>
              <Link to='/resource' className='page-scroll'>
                Add Resource
              </Link>
            </li>
            <li>
              <Link to='/location' className='page-scroll'>
                Locations
              </Link>
            </li>
            <li>
              <Link to='/leaderlist' className='page-scroll'>
                Team Leader
              </Link>
            </li>
            <li style={{ margintop: '25px' }}><Link to='/techlist' className='page-scroll'>
                  Technician List
                </Link></li>


            {/* <li className="drop-down" >
              <a href='#' className='page-scroll'>
                Team Leader
              </a>
              <ul>
                <li ><Link to='/addteamleader' className='page-scroll'>
                  Add Team Leader
                </Link></li>

                <li style={{ margintop: '30px' }} ><Link to='/leaderlist' className='page-scroll'>
                  Team  Leader List
                </Link></li>
              </ul>



            </li> */}

            {/* <li className="drop-down">
              <a href='#' className='page-scroll'>
                Technicians
              </a>
              <ul>
                <li><Link to='/addtech' className='page-scroll'>
                  Add Technician
                </Link></li>

                <li style={{ margintop: '25px' }}><Link to='/techlist' className='page-scroll'>
                  Technician List
                </Link></li>
              </ul>

            </li> */}
            <li>
            <Link to='/sales' className='page-scroll'>
                  Terminals</Link>
               
            </li>
            <li>
            <Link to='/login' className='page-scroll'>
                  Login</Link>
               
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
