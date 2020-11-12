import React from 'react';
import { Route } from 'react-router-dom';

import Footer from '../components/Footer';
import './styles.css';

function LoginLayout({ component: Component, ...props }) {
  return (
    // <Route {...props} component={Component} />
    <>
       <Route
      {...props}
      render={(routerProps) => (
        <>
          <Component {...routerProps} />
        </>
      )}
    />
    </>
  );
}

export default LoginLayout;
