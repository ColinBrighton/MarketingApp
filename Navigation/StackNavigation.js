import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AddShopDetailsForm} from '../Modules/AddShopDetails/AddShopDetailsForm';
import {OrderForm} from '../Modules/OrderForm/OrderForm';
import { UserLogin } from '../Modules/UserLogin/UserLogin';
import { HomePageStackNavigation } from './HomePageStackNavigation';
import { DrawerNavigation } from './DrawerNavigation';
const Stack = createStackNavigator();

export const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='UserLogin' component={UserLogin}/>
        <Stack.Screen
          name="HomePage"
          component={DrawerNavigation}
        />
        {/* <Stack.Screen
          name="AddShopDetailsForm"
          component={AddShopDetailsForm}
        />
        <Stack.Screen name="OrderForm" component={OrderForm} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
