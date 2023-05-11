import React from 'react';
import Navbar from '../features/navbar/Navbar';
import SearchResults from '../features/SearchResults/SearchResults';

import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        {/* <SearchResults /> */}
        <AppRoutes />
      </Provider>
    </div>
  );
};

export default App;
