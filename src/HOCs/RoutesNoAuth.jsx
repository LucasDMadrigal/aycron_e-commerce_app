import React from 'react'
import { Route } from 'react-router';

const RoutesNoAuth = (route) => {

  return <Route path={route.path} key={route.key} element={route.element} />;
  
};

export default RoutesNoAuth;