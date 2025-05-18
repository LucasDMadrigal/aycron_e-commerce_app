import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';

const RoutesAuthAdmin = (route) => {

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isAdmin = useSelector((state) => state.auth.user.isAdmin);

  return loggedIn && isAdmin && <Route path={route.path} key={route.key} element={route.element} />;
};

export default RoutesAuthAdmin;