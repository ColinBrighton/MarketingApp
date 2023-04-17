import React from 'react'
import { Text, View, StyleSheet,Image, ImageBackground, TouchableOpacity, ScrollView, } from 'react-native'
import {useSelector} from 'react-redux';

export const PendingOrders = (props) => {
  const OrderDetails = useSelector(state => state.OrderDetails);
  if (OrderDetails == '') {
    return (
      <ImageBackground
        source={require('../../../Images/homePage/homebg.jpg')}
        style={styles.background}>
        {/* <View style={styles.mobile}>
          <Image
            source={require('../../../Images/homePage/mobile.png')}
            style={styles.mobileImg}
          />
        </View>
        <View style={styles.board}>
          <Image
            source={require('../../../Images/homePage/board.png')}
            style={styles.mobileImg}
          />
        </View> */}
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headTextWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('WelcomeHome')}>
              <Image
                source={require('../../../Images/backarrow.png')}
                style={styles.back}
              />
            </TouchableOpacity>
            <Text style={styles.headText}>Pending Orders</Text>
          </View>
          <View style={styles.nocancelWwap}>
            <Image source={require('../../../Images/homePage/empty.png')} />
            <Text style={styles.nocancelText}>Empty</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }else {
    return(
      <ImageBackground
        source={require('../../../Images/homePage/homebg.jpg')}
        style={styles.background}>
        <View style={styles.mobile}>
          <Image
            source={require('../../../Images/homePage/mobile.png')}
            style={styles.mobileImg}
          />
        </View>
        <View style={styles.board}>
          <Image
            source={require('../../../Images/homePage/board.png')}
            style={styles.mobileImg}
          />
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headTextWrap}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('WelcomeHome')}>
              <Image
                source={require('../../../Images/backarrow.png')}
                style={styles.back}
              />
            </TouchableOpacity>

            <Text style={styles.headText}>Pending Orders</Text>
          </View>
          <Text style={styles.list}>List of Pending Orders :</Text>
          <View style={{marginBottom: 20, marginTop: 10}}>
            {OrderDetails.map(details => (
              <View style={styles.cancelOrderWrap} key={details.key}>
                <View style={styles.cancelorderHolder1}>
                  <Text style={styles.ordertext1}>
                    Order Id : {details.order_number}
                  </Text>
                  <Text style={styles.ordertext1}>
                    shop Name : {details.selected_shop}
                  </Text>
                </View>
                <View style={styles.cancelorderHolder2}>
                  <Image
                    source={require('../../../Images/homePage/pendingclock.png')}
                    style={styles.arrowImg}
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
  },
  headTextWrap: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30,
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
    color: '#DAF5FF',
    textAlign: 'center',
    letterSpacing: 2,
    paddingTop: 10,
    flex: 0.9,
    textShadowOffset: {width: 3, height: 2},
    textShadowRadius: 5,
    textShadowColor: '#070A52',
  },
  nocancelWwap: {
    // backgroundColor:'red',
    alignItems: 'center',
    marginTop: 250,
  },
  mobile: {
    position: 'absolute',
    top: 130,
  },
  mobileImg: {
    height: 100,
    width: 100,
  },
  board: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  nocancelText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
  },
  list: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#13005A',
    marginLeft: 20,
    textDecorationLine: 'underline',
    // textShadowOffset: { width: 3, height: 2 },
    // textShadowRadius: 5,
    // textShadowColor: '#000',
  },
  cancelOrderWrap: {
    backgroundColor: '#DAF5FF',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    elevation:10
  },
  cancelorderHolder1: {
    // backgroundColor: 'red',
    flex: 0.8,
  },
  cancelorderHolder2: {
    // backgroundColor: 'yellow',
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowImg: {
    height:50,
    width:50,
    opacity: 0.2,
    transform: [{ rotate: '-15deg' }],
  },
  ordertext1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 2,
  },
  orderheadText: {
    fontSize: 17,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 8,
    textDecorationLine: 'underline',
    color: 'black',
  },
})