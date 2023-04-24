import React, {useEffect, useRef, useState} from 'react';
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
import {NoOfOrdersCancelled} from '../../Store/Action';
import {UpdateCancelOrder} from '../../Store/Action';
import {DropdownComp} from '../../Components/Dropdown';
import {ProductList} from '../Datas/OrderData';
import {InputBox} from '../../Components/InputBox';
import {ToastAndroid} from 'react-native';
import {AddMoreOrder} from '../../Store/Action';

const {width, height} = Dimensions.get('window');

export const ViewOrders = props => {
  const OrderDetails = useSelector(state => state.OrderDetails);
  const [orderList, setOrderList] = useState(OrderDetails);
  const [searchOrder, setSearchOrder] = useState('');
  const [shopOrderDetails, setShopOrderDetails] = useState();
  const [shop, setShop] = useState();
  const [cancelOrderNo, setCancelOrderNo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [checked, setChecked] = useState(null);
  const [cancelledShop, setCancelledShop] = useState(null);
  const [cancelledOrderId, setCancelledOrderId] = useState(null);
  const [modalData, setModalData] = useState();
  const [listofProducts, setListofProducts] = useState(ProductList);
  const [index, setIndex] = useState(null);

  // Add more Products
  const [addedProduct, setAddedProduct] = useState(null);
  const [addedVariant, setAddedVariant] = useState(null);
  const [addedQuantity, setAddedQuantity] = useState(null);
  const [tabledata, setTableData] = useState([]);
  const [productCondition, setProductCondition] = useState(false);
  const [variantCondition, setVariantCondition] = useState(false);
  const [quantityCondition, setQuantityCondition] = useState(false);
  const [shopListForAddMore, setShopListForAddMore] = useState();

  const [overallAdded, setOverallAdded] = useState({});
  const addVarientDropdownRef = useRef();
  const addProductDropdownRef = useRef();
  const addQuantityDropdownRef = useRef();

  const tableHeader = ['Product', 'Variant', 'Quantity'];

  const dispatch = useDispatch();

  useEffect(() => {
    setOrderList(OrderDetails);
    console.log('use effect check');
  }, [OrderDetails]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setChecked(null);
      // setOrderList(OrderDetails)
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
    const selectedShopOrders = OrderDetails.filter(
      order => order.selected_shop == shopName,
    );
    setShopOrderDetails(selectedShopOrders);
    // console.log(selectFilteredShop,'selectFilteredShop')
    // console.log(selectedShopOrders,'selectedShopOrders')
  };
  const handleCancelBtn = (orderNo, shop) => {
    setChecked(null);
    const key = 0;
    const values = [{keys: key + 1, order_no: orderNo, shop: shop}];
    setModalData(values);
    setCancelledOrderId(orderNo);
    setCancelledShop(shop);
    setCancelOrderNo(orderNo);
    setCancelModal(true);
  };
  // console.log(cancelOrderNo, 'cancelOrderNo');
  // console.log(cancelledShop, 'cancelledShop');
  const handleCancelOrder = () => {
    const values = {
      cancelled_shop: cancelledShop,
      cancelled_order_id: cancelledOrderId,
      reason: checked,
    };

    dispatch(DeleteOrderDetails(cancelOrderNo));
    dispatch(NoOfOrdersCancelled());
    dispatch(UpdateCancelOrder(values));

    setCancelModal(false);
    // console.log(cancelledShop,'cancelledShop');
    // console.log(cancelledOrderId,'cancelledOrderId');
    // console.log('Reason to Cancel Order :', checked);
  };

  const handleAddMore = orderNo => {
    setAddModal(true);
    const filterShop = orderList.filter(
      orderrr => orderrr.order_number == orderNo,
    );
    setShopListForAddMore(filterShop);
  };

  const ProductNames = listofProducts.map(names => {
    return names.product;
  });

  const VariantNames = listofProducts
    .map(names => {
      if (index == names.key) {
        return names.variant.map(varient => {
          return varient.type;
        });
      }
    })
    .filter(Boolean);

  const handleProductSelection = (selectedItem, index) => {
    setAddedProduct(selectedItem);
    setIndex(index + 1);
    setProductCondition(true);
  };

  const handleVariantSelection = (selectedItem, index) => {
    setAddedVariant(selectedItem);
    setVariantCondition(true);
  };

  const handleQuantityChange = qty => {
    setAddedQuantity(qty);
    setQuantityCondition(true);
  };

  const handleAddMoreBtn = () => {
    const key = 1;
    if (
      productCondition == true &&
      variantCondition == true &&
      quantityCondition == true
    ) {
      addProductDropdownRef.current.reset();
      addVarientDropdownRef.current.reset();
      setTableData(pre => [
        ...pre,
        [addedProduct, addedVariant, addedQuantity],
      ]);
      setOverallAdded(pre => [
        ...pre,
        {key: key++, addedProduct, addedVariant, addedQuantity},
      ]);
      setAddedQuantity('');
      setProductCondition(false);
      setVariantCondition(false);
      setQuantityCondition(false);
    } else {
      ToastAndroid.show('Fill the Reqiuired Fields', ToastAndroid.SHORT);
    }
  };

  const handleAddMoreConfirm = () => {
    dispatch(AddMoreOrder());
  };

  // console.log(orderList, 'redux data');
  // console.log(shopOrderDetails, 'shopOrderDetails');
  // console.log(OrderDetails, 'OrderDetails');
  // console.log(OrderDetails, 'OrderDetails');
  console.log(setShopListForAddMore, 'setShopListForAddMore');

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
          {orderList.map((val, index) => (
            <View style={styles.cardContainer} key={val.key}>
              <View style={styles.textWrap}>
                <Text style={styles.text}>OrderID : {val.order_number}</Text>
                <Text style={styles.text}>Shop Name : {val.selected_shop}</Text>
                <Text style={styles.text}>Order Date : {val.order_date}</Text>
              </View>
              <TouchableOpacity
                style={styles.add}
                activeOpacity={0.7}
                onPress={() => handleAddMore(val.order_number)}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
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
                  text={'Cancel'}
                  textColor={'#FF8400'}
                  onPress={() =>
                    handleCancelBtn(val.order_number, val.selected_shop)
                  }
                />
              </View>
              {/* view modal */}
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
                      <Text style={styles.orderheadText}>
                        The Order Details are as Follows:
                      </Text>
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
                                  Product : {rrr.selected_product}
                                </Text>
                                <Text style={styles.ordertext}>
                                  Variant : {rrr.selected_variant}
                                </Text>
                                <Text style={styles.ordertext}>
                                  Quantity : {rrr.selected_quantity}
                                </Text>
                              </View>
                            ))}
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
              {/* cancel  modal */}
              <View>
                <Modal
                  visible={cancelModal}
                  onRequestClose={() => setCancelModal(false)}
                  transparent>
                  <View style={styles.center}>
                    <View style={styles.modal}>
                      <View style={styles.modalcontainer}>
                        <Text style={styles.modalHeadText}>
                          Cancel The Order
                        </Text>
                        <View>
                          {modalData?.map(www => (
                            <View key={www.keys} style={styles.modaltextwrap}>
                              <Text style={styles.modalsideHead}>
                                Selected Shop :
                              </Text>
                              <Text style={styles.modaltext}>
                                Order Id : {www.order_no}
                              </Text>
                              <Text style={styles.modaltext}>
                                Shop Name : {www.shop}
                              </Text>
                            </View>
                          ))}
                        </View>
                        <Text style={styles.modalsideHead}>
                          Select a reason to cancel :
                        </Text>
                        <View style={styles.radiogroup}>
                          <RadioButton.Group
                            onValueChange={value => setChecked(value)}
                            value={checked}>
                            <RadioButton.Item
                              label="Reason 1"
                              value="Reason 1"
                              color="orange"
                            />
                            <RadioButton.Item
                              label="Reason 2"
                              value="Reason 2"
                              color="orange"
                            />
                            <RadioButton.Item
                              label="Reason 3"
                              value="Reason 3"
                              color="orange"
                            />
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
              {/* Add More modal */}
              <View>
                <Modal visible={addModal}>
                  <View style={styles.modalwrap}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                      <View style={styles.headTextWrap}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => setAddModal(false)}>
                          <Image
                            source={require('../../Images/backarrow.png')}
                            style={{height: 40, width: 40, marginLeft: 10}}
                          />
                        </TouchableOpacity>
                        <Text style={styles.headText}>Add</Text>
                      </View>
                      <Text style={styles.orderheadText}>
                        Add More Products:
                      </Text>
                      <View>
                        {shopListForAddMore?.map(addMore => (
                          <View key={addMore.key}>
                            <View style={styles.addTextWrap}>
                              <Text style={styles.addText1}>
                                Shop Name : {addMore.selected_shop}
                              </Text>
                              <Text style={styles.addText1}>
                                Order Date : {addMore.order_date}
                              </Text>
                              <Text style={styles.addText1}>
                                Order Number : {addMore.order_number}
                              </Text>
                            </View>
                            <View>
                              {addMore.product.map(() => (
                                <View></View>
                              ))}
                            </View>
                            <View style={styles.wrap}>
                              <View style={styles.dropdownWrap}>
                                <View style={styles.dropdown}>
                                  <DropdownComp
                                    data={ProductNames}
                                    search={true}
                                    defaultBtnText={'Select Product'}
                                    searchPlaceHolder={'Search here...'}
                                    searchPlaceHolderColor="#FF8400"
                                    onselect={handleProductSelection}
                                    dropdownRef={addProductDropdownRef}
                                    buttonstyle={{
                                      backgroundColor: '#FDF7C3',
                                      width: width * 0.8,
                                    }}
                                    buttonTextStyle={{
                                      letterSpacing: 2,
                                    }}
                                    rowstyle={{
                                      backgroundColor: '#FDF7C3',
                                    }}
                                  />
                                </View>
                                <View style={styles.dropdown}>
                                  <DropdownComp
                                    data={VariantNames[0]}
                                    search={true}
                                    defaultBtnText={'Select Variant'}
                                    searchPlaceHolder={'Search here...'}
                                    searchPlaceHolderColor="#FF8400"
                                    onselect={handleVariantSelection}
                                    dropdownRef={addVarientDropdownRef}
                                    buttonstyle={{
                                      backgroundColor: '#FDF7C3',
                                      width: width * 0.8,
                                    }}
                                    buttonTextStyle={{
                                      letterSpacing: 2,
                                    }}
                                    rowstyle={{
                                      backgroundColor: '#FDF7C3',
                                    }}
                                  />
                                </View>
                              </View>
                              <View>
                                <InputBox
                                  styles={styles.Quantity}
                                  mode={'outlined'}
                                  label={'Quantity'}
                                  placeholder={'Enter Quantity'}
                                  keyboardType={'numeric'}
                                  placeholderTextColor={'gray'}
                                  value={addedQuantity}
                                  onChangeText={handleQuantityChange}
                                  refff={addQuantityDropdownRef}
                                />
                              </View>
                              <View style={styles.addmoreBtnWrap}>
                                <ButtonComp
                                  style={styles.addmoreBtn}
                                  mode={'elevated'}
                                  text={'Add More'}
                                  textColor={'white'}
                                  onPress={handleAddMoreBtn}
                                />
                              </View>
                            </View>
                            <View style={styles.tablecontainer}>
                              <Table borderStyle={styles.tableborder}>
                                <Row
                                  data={tableHeader}
                                  style={styles.tableheader}
                                  // textStyle={{
                                  //   textAlign: 'center',
                                  //   fontWeight: 'bold',
                                  //   color: 'black',
                                  // }}
                                />
                                <Rows data={tabledata} />
                              </Table>
                            </View>
                            <View style={styles.addmoreBtnWrap}>
                              <ButtonComp
                                style={styles.addmoreBtn}
                                mode={'elevated'}
                                text={'Confirm'}
                                textColor={'white'}
                                onPress={handleAddMoreConfirm}
                              />
                            </View>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
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
    marginTop: 10,
    marginBottom: 20,
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
    width: 350,
    height: 450,
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
    letterSpacing: 1,
    marginTop: 15,
    color: 'black',
  },
  orderheadText: {
    fontSize: 17,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 8,
    textDecorationLine: 'underline',
    color: 'black',
  },
  radiogroup: {
    // backgroundColor:'red',
    marginBottom: 20,
  },
  cancelWrap: {
    alignItems: 'center',
  },
  cancelOrderbtn: {
    backgroundColor: 'orange',
  },
  modaltextwrap: {
    // backgroundColor: 'red',
    marginTop: 20,
    marginBottom: 20,
  },
  modalsideHead: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
  modaltext: {
    color: '#5A5A5A',
    marginLeft: 30,
  },
  add: {
    position: 'absolute',
    backgroundColor: '#FF8400',
    right: 0,
    borderTopRightRadius: 10,
    // right:20 ,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingRight: 5,
    borderBottomLeftRadius: 50,
  },
  addText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 3,
    // transform: [{ rotate: '40deg' }],
  },
  addTextWrap: {
    // backgroundColor: 'red',
    height: 100,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  addText1: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginVertical: 2,
    color: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  dropdownWrap: {
    // backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: 20,
  },
  dropdown: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  Quantity: {
    marginHorizontal: 35,
    marginBottom: 30,
  },
  addmoreBtnWrap: {
    // backgroundColor:"red",
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  addmoreBtn: {
    backgroundColor: '#FF8400',
  },
  wrap: {
    // backgroundColor: 'red',
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});
