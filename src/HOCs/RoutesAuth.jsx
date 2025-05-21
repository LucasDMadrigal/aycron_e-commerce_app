import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

const RoutesAuth = (route) => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);

  return loggedIn && <Route path={route.path} key={route.key} element={route.element} />;
}

export default RoutesAuth