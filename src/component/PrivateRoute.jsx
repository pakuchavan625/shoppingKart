import React from 'react'
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      return <Route {...rest} element={<Element />} />;
    } else {
      return <Navigate to="/login" />;
    }
}

export default PrivateRoute