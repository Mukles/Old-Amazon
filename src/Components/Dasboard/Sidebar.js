import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

const Sidebar = () => {

  let { url } = useRouteMatch();

  const handleClick = event => {
    const active = document.getElementsByClassName('active')[0];
    const element = event.target;
    if(element.className === 'admin' && active.className !=='dasboard'){
      active.classList.remove('active');
      document.getElementsByClassName('dashboard')[0].className += ' active';
    }
    else if (element.className !== `active` && element.className !=='admin') {
      active.classList.remove('active');
      element.className += ` active`;
    }
    
  }

  useEffect(() =>{
   let url = window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2]: 'dashboard';
   const element = document.getElementsByClassName(`${url}`)[0];
   const prevActive = document.getElementsByClassName('active')[0];
   if(element.className !== 'dashboard' && element.className !== `${url} active`){
     prevActive.classList.remove('active');
     element.className += ' active';
   }
  }, [])

  return (
    <>
      <input type='checkbox' id='navbar-toggle' />

    <div className='sidebar'>
      <div className="sidebar-brand">
        <Link to='/admin' className='admin' onClick={handleClick}>
          <span className='fab fa-accusoft' style={{pointerEvents: "none"}}></span>
          <span style={{pointerEvents: "none"}}>Accusoft</span>
        </Link>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className='sidebar-item'>
            <Link to={`${url}/dashboard`} className='dashboard active' onClick={handleClick}>
              <span><i className="fas fa-igloo"></i></span>
              <span>Dashboar</span>
            </Link>
          </li>
          <li className='sidebar-item'>
          <Link to={`${url}/customers`} className='customers' onClick={handleClick}>
              <span> <i className="fas fa-user"></i></span>
              <span>Customers</span>
            </Link>
          </li>
          <li className='sidebar-item'>
            <Link to={`${url}/projects`} className='projects' onClick={handleClick}>
              <span><i className="fas fa-clipboard-list"></i></span>
              <span>Projects</span>
            </Link>
          </li>
          <li className='sidebar-item'>
            <Link to={`${url}/shopping`} className='shopping' onClick={handleClick}>
              <span><i className="fas fa-shopping-bag"></i></span>
              <span>Orders</span>
            </Link>
          </li>
          <li className='sidebar-item'>
            <Link to={`${url}/Inventory`} className = 'Inventory' onClick={handleClick}>
              <span><i className="fas fa-receipt"></i></span>
              <span>Inventory</span>
            </Link>
          </li>
          <li className='sidebar-item'>
            <Link to={`${url}/account`} className='account' onClick={handleClick}>
              <span><i className="fas fa-user-circle"></i></span>
              <span>Account</span>
            </Link>
          </li>
          <li className='sidebar-item'>
            <Link to={`${url}/tasks`} className='tasks' onClick={handleClick}>
              <span><i className="fas fa-clipboard-list"></i></span>
              <span>Tasks</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Sidebar;