import React from 'react';

const Header = () => {
    return (
        <header id='nav-header'>
            <h2>
                <label htmlFor='navbar-toggle' className="nav-toggler"><i className='fa fa-bars'></i></label>
                <span>Dashboard</span>
            </h2>
            <div className='search-wrapper d-lg-block d-none'>
                <span><i className='fa fa-search'></i></span>
                <input type='text' placeholder='search here' />
            </div>
            <div className='user wrapper'>
               <img src='./9dyousdmyyr41.png'  alt='profile'/>
               <div className='profile'>
                   <h3>Name</h3>
                   <small>Super Admin</small>
               </div>
            </div>
        </header>
    )
}

export default Header;