import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {AddShopDetailsForm} from '../Modules/AddShopDetails/AddShopDetailsForm';
import {OrderForm} from '../Modules/OrderForm/OrderForm';
import {HomePageStackNavigation} from './HomePageStackNavigation';
import {DrawerHead} from './DrawerHead';
import {Image} from 'react-native';
import { ViewOrders } from '../Modules/ViewOrders/ViewOrders';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerHead {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomePageStackNavigation}
        options={{
          drawerIcon: () => (
            <Image source={require('../Images/Drawer/home.png')} />
          ),

          drawerLabelStyle: {color: 'black'},
          drawerActiveTintColor: '#8DCBE6',
          drawerInactiveTintColor: '#01cfa9',
          drawerInactiveBackgroundColor: 'white',
          drawerStyle: {backgroundColor: 'white'},
          drawerItemStyle: {
            borderRadius: 15,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: 'black',
          },
        }}
      />
      <Drawer.Screen
        name="Add Shop"
        component={AddShopDetailsForm}
        options={{
          drawerIcon: () => (
            <Image source={require('../Images/Drawer/shop.png')} />
          ),

          drawerLabelStyle: {color: 'black'},
          drawerActiveTintColor: '#8DCBE6',
          drawerInactiveTintColor: '#01cfa9',
          drawerInactiveBackgroundColor: 'white',
          drawerStyle: {backgroundColor: 'white'},
          drawerItemStyle: {
            borderRadius: 15,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: 'black',
          },
        }}
      />
      <Drawer.Screen
        name="Take Order"
        component={OrderForm}
        options={{
          drawerIcon: () => (
            <Image source={require('../Images/Drawer/order.png')}/>
          ),

          drawerLabelStyle: {color: 'black'},
          drawerActiveTintColor: '#8DCBE6',
          drawerInactiveTintColor: '#01cfa9',
          drawerInactiveBackgroundColor: 'white',
          drawerStyle: {backgroundColor: 'white'},
          drawerItemStyle: {
            borderRadius: 15,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: 'black',
          },
        }}
      />
      <Drawer.Screen
        name="View Orders"
        component={ViewOrders}
        options={{
          drawerIcon: () => (
            <Image source={require('../Images/Drawer/view.png')}/>
          ),

          drawerLabelStyle: {color: 'black'},
          drawerActiveTintColor: '#8DCBE6',
          drawerInactiveTintColor: '#01cfa9',
          drawerInactiveBackgroundColor: 'white',
          drawerStyle: {backgroundColor: 'white'},
          drawerItemStyle: {
            borderRadius: 15,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: 'black',
          },
        }}
      />
    </Drawer.Navigator>
  );
};
