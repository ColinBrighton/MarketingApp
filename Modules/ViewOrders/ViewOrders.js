import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {OrderData} from '../Datas/OrderData';
import {useSelector} from 'react-redux';
import {ButtonComp} from '../../Components/Button';
import {Searchbar} from 'react-native-paper';
import {RadioButton} from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';
import {DeleteOrderDetails} from '../../Store/Action';

const {width, height} = Dimensions.get('window');

export const ViewOrders = props => {
  const OrderDetails = useSelector(state => state.OrderDetails);
  const [orderList, setOrderList] = useState(OrderDetails);
  const [searchOrder, setSearchOrder] = useState('');
  const [shopOrderDetails, setShopOrderDetails] = useState();
  const [shop, setShop] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [checked, setChecked] = useState();

  const dispatch = useDispatch();

  const tableHeader = ['Product', 'Variant', 'Quantity'];

  const tabledata = orderList.map(vals => {
    const table = [];
    vals.product.map(vvv => {
      table.push(vvv.selectedProduct, vvv.selectedVariant, vvv.Quantity);
    });
    return table;
  });
  // console.log(tabledata, 'tabledata');

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setChecked(null);
    }
  }, [isFocused]);

  const onChangeSearch = query => {
    setSearchOrder(query);
    setOrderList(
      OrderDetails.filter(
        order =>
          order.selected_shop.toString().toLowerCase().includes(query) ||
          order.order_number.toString().toLowerCase().includes(query),
      ),
    );
  };

  const handleView = shopName => {
    setOpenModal(true);
    const selectFilteredShop = OrderData.filter(val => {
      return val.shop_name == shopName;
    });
    setShop(selectFilteredShop);
    const selectedShopOrders = orderList.filter(
      order => order.selected_shop == shopName,
    );
    setShopOrderDetails(selectedShopOrders);
    // console.log(selectFilteredShop,'selectFilteredShop')
    // console.log(selectedShopOrders,'selectedShopOrders')
  };

  const handleCancelOrder = value => {
    console.log(value,'btn pressed');
    dispatch(DeleteOrderDetails(value));
    setCancelModal(false);
  };

  // console.log(orderList, 'redux data');
  // console.log(shopOrderDetails, 'shopOrderDetails');
  console.log(OrderDetails, 'OrderDetails');
  console.log(orderList, 'orderList');
  // console.log(shop, 'shop data');
  if (OrderDetails == '') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollcontainer}>
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

        <Text style={styles.empty}>Take Order</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.navigation.navigate('Take Order')}>
          <Image
            source={require('../../Images/homePage/mobileorder.png')}
            style={styles.Image}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
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
        <View style={styles.searchboxWrap}>
          <Searchbar
            placeholder="Search"
            value={searchOrder}
            onChangeText={onChangeSearch}
          />
        </View>
        <View>
          {orderList.map(val => (
            <View style={styles.cardContainer} key={val.order_number}>
              <View style={styles.textWrap}>
                <Text style={styles.text}>OrderID : {val.order_number}</Text>
                <Text style={styles.text}>Shop Name : {val.selected_shop}</Text>
                <Text style={styles.text}>Order Date : {val.order_date}</Text>
              </View>
              <View style={styles.btnWrap}>
                <ButtonComp
                  style={styles.cardBtn}
                  mode={'elevated'}
                  text={'View'}
                  textColor={'white'}
                  onPress={() => handleView(val.selected_shop)}
                />
                <ButtonComp
                  style={styles.cardBtn1}
                  mode={'outlined'}
                  text={'Cancel Order'}
                  textColor={'#FF8400'}
                  onPress={() => setCancelModal(true)}
                />
              </View>
              <View>
                <Modal visible={openModal}>
                  <View style={styles.modalwrap}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                      <View style={styles.headTextWrap}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => setOpenModal(false)}>
                          <Image
                            source={require('../../Images/backarrow.png')}
                            style={{height: 40, width: 40, marginLeft: 10}}
                          />
                        </TouchableOpacity>
                        <Text style={styles.headText}>Order Details</Text>
                      </View>

                      <View>
                        {shop?.map(param => (
                          <View key={param.shop_name}>
                            <View style={styles.ordertextWrap}>
                              <Text style={styles.ordertext}>
                                Shop Name : {param.shop_name}
                              </Text>
                              <Text style={styles.ordertext}>
                                Shop Mail : {param.shop_mail}
                              </Text>
                              <Text style={styles.ordertext}>
                                Contact Number : {param.shop_contact1}
                              </Text>
                              <Text style={styles.ordertext}>
                                Alternate Number : {param.shop_contact2}
                              </Text>
                              <Text style={styles.ordertext}>
                                GST Number : {param.gst_number}
                              </Text>
                              <Text style={styles.ordertext}>
                                Landmark : {param.landmark}
                              </Text>
                              <Text style={styles.ordertext}>
                                Pincode : {param.pincode}
                              </Text>
                              <Text style={styles.ordertext}>
                                Address : {param.address}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>

                      <View>
                        {shopOrderDetails?.map(qqq => (
                          <View key={qqq.key}>
                            <View style={styles.ordertextWrap}>
                              <Text style={styles.ordertext}>
                                Order Date : {qqq.order_date}
                              </Text>
                              <Text style={styles.ordertext}>
                                Order Number : {qqq.order_number}
                              </Text>
                            </View>
                            {qqq.product.map(rrr => (
                              <View style={styles.ordertextWrap} key={qqq.key}>
                                <Text style={styles.ordertext}>
                                  Product : {rrr.selectedProduct}
                                </Text>
                                <Text style={styles.ordertext}>
                                  Variant : {rrr.selectedVariant}
                                </Text>
                                <Text style={styles.ordertext}>
                                  Quantity : {rrr.Quantity}
                                </Text>
                              </View>
                            ))}
                            {/* <View style={styles.tablecontainer}>
                              <Table borderStyle={styles.tableborder}>
                                <Row
                                  data={tableHeader}
                                  style={styles.tableheader}
                                  textStyle={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: 'black',
                                  }}
                                />
                                <Rows data={tabledata} />
                              </Table>
                            </View> */}
                            <View style={styles.modalbtnwrap}>
                              <ButtonComp
                                style={styles.modalbtn}
                                mode={'elevated'}
                                text={'OK'}
                                textColor={'white'}
                                onPress={() => setOpenModal(false)}
                              />
                            </View>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                </Modal>
              </View>
              <View>
                <Modal
                  visible={cancelModal}
                  onRequestClose={() => setCancelModal(false)}
                  transparent>
                  <View style={styles.center}>
                    <View style={styles.modal}>
                      <View style={styles.modalcontainer}>
                        <Text style={styles.modalHeadText}>
                          Select a Reason to Cancel
                        </Text>
                        <View style={styles.radiogroup}>
                          <RadioButton.Group
                            onValueChange={value => setChecked(value)}
                            value={checked}>
                            <RadioButton.Item label="First" value="first" />
                            {/* <RadioButton.Item label="Second" value="second" />
                            <RadioButton.Item label="Third" value="third" /> */}
                          </RadioButton.Group>
                        </View>
                        <View style={styles.cancelWrap}>
                          <ButtonComp
                            style={styles.cancelOrderbtn}
                            disabled={checked === null ? true : false}
                            mode={'contained'}
                            text={'Cancel Order'}
                            textColor={'black'}
                            onPress={() => handleCancelOrder(val.order_number)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  scrollcontainer: {
    backgroundColor: '#F6F1E9',
    width: width,
    height: height,
    flexGrow: 1,
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
    color: '#FF8400',
    textAlign: 'center',
    letterSpacing: 2,
    paddingTop: 10,
    flex: 0.9,
  },
  empty: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  Image: {
    height: 50,
    width: 50,
    left: 170,
  },
  cancelbtn: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFF2CC',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'black',
    // flexDirection: 'row',
  },
  text: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 3,
  },
  textWrap: {
    // flex: 0.7,
    // backgroundColor:'red'
  },
  btnWrap: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardBtn: {
    marginTop: 10,
    backgroundColor: '#FF8400',
    // marginHorizontal:10
    marginRight: 10,
  },
  cardBtn1: {
    marginTop: 10,
    backgroundColor: 'transparent',
    // marginHorizontal:10
    marginRight: 10,
  },
  modalwrap: {
    backgroundColor: '#F6F1E9',
    flex: 1,
  },
  searchbox: {
    backgroundColor: 'white',
    color: 'black',
    width: 370,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  ordertext: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    // marginVertical: 3,
    marginHorizontal: 15,
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  ordertextWrap: {
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  searchboxWrap: {
    marginBottom: 10,
  },
  modalbtnwrap: {
    alignItems: 'center',
  },
  modalbtn: {
    backgroundColor: '#FF8400',
  },
  tablecontainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  tableborder: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
  },
  tableheader: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000070',
  },
  modal: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    // borderRadius:20,
    borderWidth: 1,
    borderColor: 'black',
  },
  modalcontainer: {
    backgroundColor: '#F6F1E9',
    flex: 1,
  },
  modalHeadText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:'red',
    marginTop: 15,
    color: 'black',
  },
  radiogroup: {
    // backgroundColor:'red',
    marginTop: 10,
    marginBottom: 20,
  },
  cancelWrap: {
    alignItems: 'center',
  },
  cancelOrderbtn: {
    backgroundColor: 'orange',
  },
});
