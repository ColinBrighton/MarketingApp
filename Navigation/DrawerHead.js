import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {OrderForm} from '../Modules/OrderForm/OrderForm';

const {width, height} = Dimensions.get('window');

export const DrawerHead = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, height: height * 0.9, position: 'relative'}}>
        <ImageBackground
          source={require('./../Images/Drawer/drawer.jpg')}
          style={{height: 180, position: 'relative'}}></ImageBackground>
        <View>
          <DrawerItemList {...props} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({

});
