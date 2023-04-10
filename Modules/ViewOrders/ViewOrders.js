import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

export const ViewOrders = (props) => {
  const OrderDetails = useSelector(state => state.OrderDetails);

  console.log(OrderDetails, 'redux data');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      Style={styles.scrollcontainer}>
      <View style={styles.headTextWrap}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Home')}>
          <Image
            source={require('../../Images/backarrow.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <Text style={styles.headText}>Orders</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    // backgroundColor: 'red',
    // width: width,
    // height: height,
    // flexGrow: 1,
  },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: '#78B7BB',
    borderRadius: 2,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
  headTextWrap: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  back: {
    height: 40,
    width: 40,
    flex: 0.1,
    marginLeft: 10,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF8400',
    textAlign: 'center',
    letterSpacing: 2,
    paddingTop: 10,
    flex: 0.9,
  },
});
