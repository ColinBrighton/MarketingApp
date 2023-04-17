import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import SelectDropdown from 'react-native-select-dropdown';

const {width, height} = Dimensions.get('window');
export const DrawerHead = props => {
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1, height: height * 0.9, position: 'relative'}}>
        <ImageBackground
          source={require('./../Images/Drawer/drawer.jpg')}
          style={{height: 180, position: 'relative'}}></ImageBackground>
        <View>
          <DrawerItemList {...props} />
        </View>
        <View>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({});
