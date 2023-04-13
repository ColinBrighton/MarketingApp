import React from 'react';
import {View} from 'react-native';
import {AddShopDetailsForm} from './Modules/AddShopDetails/AddShopDetailsForm';
import {OrderForm} from './Modules/OrderForm/OrderForm';
import {StackNavigation} from './Navigation/StackNavigation';
import {DrawerNavigation} from './Navigation/DrawerNavigation';
import {Provider} from 'react-redux';
import { store } from './Store/Store';
const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
};

export default App;
