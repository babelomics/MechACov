import React from 'react';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import { BrowserRouter as Router } from 'react-router-dom';

import MenuToolbar from './components/menuToolbar/MenuToolbar';
import Footer from './components/footer/Footer';

//Routes
import Routes from './Routes';
import { Box } from '@material-ui/core';

import appStore from './appStore';


function App() {
  return (
    <Router>
      <Provider store={appStore}>
        <div className="content">
          <MenuToolbar />
          <Routes />
          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;