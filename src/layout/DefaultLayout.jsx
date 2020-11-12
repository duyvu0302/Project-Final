import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import './styles.css';

function DefaultLayout({ component: Component, ...props }) {
  console.log("DefaultLayout -> propsLayout", props)
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header />
          <div className="main">
            <Component {...routerProps} />
          </div>
          {props.path=="/booking/:place/:idHotel/:idRoom"?'':<Footer/>}
        </>
      )}
    />
  );
}

export default DefaultLayout;
