import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/styles/sidebar.css';
import { AuthProvider, Usercontext } from '../context/AuthProvider';
import UserApi from '../service/api/UserApi';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate=useNavigate()
  const {logout}=Usercontext();
  const handlelogout = async (e) => {
    e.preventDefault();
    await logout(); 
      logout()
      navigate('/login',{replace: true})
     
  };
  return (
    <div className='sidebar-div'>
      <nav className="navbar navbar-dark  fixed-top custom-navbar-color">
        <div className="container-fluid">
          <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
          </button>
          {/* <a className="navbar-brand " href="/dashboard"></a> */}
          <Link className="navbar-brand " to='/dashboard'>Gestion Vocation</Link>
          <div className="offcanvas offcanvas-start text-bg-white custom-navbar-color" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-white" id="offcanvasDarkNavbarLabel">Navigation</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
              <div className="flex-grow-1">
                <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                  <li className="nav-item">
                    <i className="bx text-white bx-grid-alt"></i>
                    <Link className="nav-link active" aria-current="page" to='/dashboard'>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <i className="bx text-white bx-user"></i>
                    <Link className="nav-link" to='/personnel'>Personnel </Link>
                  </li>
                  <li className="nav-item">
                    <i className="bx text-white bx-pie-chart-alt-2"></i>
                    <Link className="nav-link" to='/budget'>Budget</Link>
                  </li>
                  <li className="nav-item">
                    <i className="bx text-white bx-folder"></i>
                    <Link className="nav-link" to='/jury'>Jury</Link>
                  </li>
                  <li className="nav-item">
                    <i className="bx text-white bx-folder"></i>
                    <Link className="nav-link" to='/users'>Users</Link>
                  </li>
                </ul>
              </div>
              <ul className='navbar-nav'>
                <li className="nav-item">
                    <i className="bx text-white bx-user"></i>
                    <Link className="nav-link" to='/Profile'>Profile</Link>
                  </li>
                <li className="nav-item">
                  <i className="bx text-white bx-log-out" id="log_out"></i>
                  <button className="nav-link" onClick={handlelogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
