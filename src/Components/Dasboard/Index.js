import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

const Index = () => {
  return (
    <>
      <Sidebar />
      <div className='main-content'>
        <Header />
        <MainContent />
      </div>
    </>
  )
}

export default Index;