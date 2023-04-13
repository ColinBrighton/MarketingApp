import React from 'react'
import {Text,View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { ViewOrders } from '../Modules/ViewOrders/ViewOrders';
import { CancelOrder } from '../Modules/ViewOrders/CancelOrder/CancelOrder';

const Stack = createStackNavigator();

export const OrderStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='ViewOrderPage' component={ViewOrders}/>
        <Stack.Screen name='CancelOrder' component={CancelOrder}/>
    </Stack.Navigator>
  )
}
