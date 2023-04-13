import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomePage} from '../Modules/Home/HomePage';
import { PendingOrders } from '../Modules/Home/cards/PendingOrders';
import { DueAmount } from '../Modules/Home/cards/DueAmount';
import { NumberofCustomers } from '../Modules/Home/cards/NumberofCustomers';
import { CancelledOrders } from '../Modules/Home/cards/CancelledOrders';


const Stack = createStackNavigator();

export const HomePageStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeHome" component={HomePage} />
      <Stack.Screen name="PendingOrders" component={PendingOrders} />
      <Stack.Screen name="DueAmount" component={DueAmount} />
      <Stack.Screen name="NumberofCustomers" component={NumberofCustomers} />
      <Stack.Screen name="CancelledOrders" component={CancelledOrders} />
    </Stack.Navigator>
  );
};
