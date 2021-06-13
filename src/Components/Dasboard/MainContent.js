import React from 'react';
import {Switch, useRouteMatch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Order from './Order';
import AddProduct from './AddProduct';

const MainContent = () =>{
    const { path } = useRouteMatch();
    return(
        <Switch>
        <Route exact path={path}>
          <Dashboard />
        </Route>
        <Route path={`${path}/dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${path}/projects`}>
          <AddProduct />
        </Route>
        <Route path={`${path}/shopping`}>
          <Order />
        </Route>
      </Switch>
    )
}

export default MainContent;