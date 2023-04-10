import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonComp} from '../../Components/Button';
import {IconComp} from '../../Components/Icon';

const {width, height} = Dimensions.get('window');
export const HomePage = props => {
  return (
    <ImageBackground
      source={require('../../Images/homePage/homebg.jpg')}
      style={styles.background}>
      <View style={styles.mobile}>
        <Image
          source={require('../../Images/homePage/mobile.png')}
          style={styles.mobileImg}
        />
      </View>
      <View style={styles.board}>
        <Image
          source={require('../../Images/homePage/board.png')}
          style={styles.mobileImg}
        />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headwrap}>
          <TouchableOpacity
            style={styles.iconwrap}
            activeOpacity={0.2}
            onPress={() => props.navigation.openDrawer()}>
            <Image
              source={require('../../Images/menu-icon.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headText}>Home</Text>
        {/* <IconComp/> */}
        </View>

        <View style={styles.cardWrap}>
          <View style={styles.card}>
            <View style={styles.imgWrap}>
              <Image
                style={styles.image}
                source={require('../../Images/homePage/pending.png')}
              />
            </View>
            <Text style={styles.cardHead}>Pending Orders</Text>
            <View style={styles.text}>
              <Text style={styles.text1}>20</Text>
            </View>
            <View style={styles.btnWrap}>
              <ButtonComp
                mode={'elevated'}
                text={'View'}
                style={styles.btn}
                textColor={'black'}
                onPress={() => props.navigation.navigate('PendingOrders')}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.imgWrap}>
              <Image
                style={styles.image}
                source={require('../../Images/homePage/due.png')}
              />
            </View>
            <Text style={styles.cardHead}>Due Amount</Text>
            <View style={styles.text}>
              <Text style={styles.text1}>10000</Text>
            </View>
            <View style={styles.btnWrap}>
              <ButtonComp
                mode={'elevated'}
                text={'View'}
                style={styles.btn}
                textColor={'black'}
                onPress={() => props.navigation.navigate('DueAmount')}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.imgWrap}>
              <Image
                style={styles.image}
                source={require('../../Images/homePage/customers.png')}
              />
            </View>
            <Text style={styles.cardHead}>No. of Customers</Text>
            <View style={styles.text}>
              <Text style={styles.text1}>50</Text>
            </View>
            <View style={styles.btnWrap}>
              <ButtonComp
                mode={'elevated'}
                text={'View'}
                style={styles.btn}
                textColor={'black'}
                onPress={() => props.navigation.navigate('NumberofCustomers')}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.imgWrap}>
              <Image
                style={styles.image}
                source={require('../../Images/homePage/cancel.png')}
              />
            </View>
            <Text style={styles.cardHead}>Cancelled Orders</Text>
            <View style={styles.text}>
              <Text style={styles.text1}>5</Text>
            </View>
            <View style={styles.btnWrap}>
              <ButtonComp
                mode={'elevated'}
                text={'View'}
                style={styles.btn}
                textColor={'black'}
                onPress={() => props.navigation.navigate('CancelledOrders')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1B262C',
    letterSpacing: 2,
    shadowColor: 'green',
    paddingLeft: 20,
  },
  headwrap: {
    // backgroundColor: '#95BDFF',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
  iconwrap: {
    marginRight: 10,
    marginLeft: 10,
  },
  cardWrap: {
    marginTop: 50,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FAF7F0',
    height: height * 0.2,
    marginHorizontal: 20,
    marginVertical: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: '#150E56',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  imgWrap: {
    // backgroundColor:'red',
    position: 'absolute',
    right: 10,
    top: 30,
  },
  cardHead: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 2,
    marginTop: 20,
    marginLeft: 10,
  },
  image: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  mobile: {
    position: 'absolute',
    top: 90,
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
  btnWrap: {
    alignItems: 'center',
    // backgroundColor: 'red',
    marginRight: 100,
    alignItems: 'flex-start',
    marginTop: 5,
    paddingLeft: 10,
  },
  btn: {
    width: 100,
    backgroundColor: '#B9E9FC',
  },
  text: {
    // backgroundColor:'yellow',
    height: 40,
    width: 250,
  },
  text1:{
    color: '#150E56',
    paddingLeft:20,
    marginTop:10,
    fontSize:15,
    fontWeight:'bold'
  }
});
