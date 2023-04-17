import {Formik} from 'formik';
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import DatePicker from 'react-native-modern-datepicker';
import {DropdownComp} from '../../Components/Dropdown';
import {ShopNames} from '../Datas/OrderData';
import {ButtonComp} from '../../Components/Button';
import {OrderData} from '../Datas/OrderData';
import {ProductList} from '../Datas/OrderData';
import {InputBox} from '../../Components/InputBox';
import {OrderDetailsSchema} from '../ValidatingSchema/Schema';
import {TableComp} from '../../Components/Table';
import {COL_TYPES} from 'react-native-datatable-component';
import {UpdateOrderDetails} from '../../Store/Action';
import {useIsFocused} from '@react-navigation/native';
import { SetPendingOrder } from '../../Store/Action';
import { AddMoreOrder } from '../../Store/Action';

const {width, height} = Dimensions.get('window');

let Quantity;
let count = 1;
let key = 0;
export const OrderForm = props => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [index, setIndex] = useState(null);
  const [listofProducts, setListofProducts] = useState(ProductList);
  const [addOrder, setAddOrder] = useState([]);
  const [addBtn1, setAddBtn1] = useState(false);
  const [addBtn2, setAddBtn2] = useState(true);
  const [addBtn3, setAddBtn3] = useState(true);
  const [selectedQuantitiy, setSelectedQuantity] = useState(selectedQuantitiy);
  const [orderNumber, setOrderNumber] = useState(1001);
  const VarientDropdownRef = useRef();
  const ProductDropdownRef = useRef();
  const shopDropdownRef = useRef();
  const [products, setProducts] = useState([]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const date = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = year + '/' + month + '/' + date;

  // const PendingOrderStatus = useSelector(state => state.PendingOrder);

  const colSettings = [
    
    {name: 'selectedProduct', type: COL_TYPES.STRING, width: '40%'},
    {name: 'selectedVariant', type: COL_TYPES.STRING, width: '40%'},
    {name: 'Quantity', type: COL_TYPES.INT, width: '20%'},
  ];
  const tableHeader = ['Product', 'Variant', 'Quantity'];
  const dispatch = useDispatch();
  const colNames = ['selectedProduct', 'selectedVariant', 'Quantity'];

  const handleShopSelection = (selectedItem, index) => {
    setSelectedShop(selectedItem);
    setAddBtn3(true);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelectedShop(null);
      setAddOrder([]);
      setProducts([])
    }
  }, [isFocused]);

  const handleProductSelection = (selectedItem, index) => {
    setSelectedProduct(selectedItem);
    setIndex(index + 1);
    setAddBtn1(true);
  };

  const handleVariantSelection = (selectedItem, index) => {
    setSelectedVariant(selectedItem);
    setAddBtn2(false);
  };

  const onSubmit = formikprops => {
    formikprops.handleSubmit();
  };

  const handleConfirm = () => {
    if (addOrder == '') {
      ToastAndroid.show('Fill the Table', ToastAndroid.SHORT);
    } else {
      shopDropdownRef.current.reset();
      setAddBtn3(false);
      const values = {
        order_number: orderNumber,
        order_date: formattedDate,
        selected_shop: selectedShop,
        product: products,
        key: count++,
      };
      console.log(key, 'keyyyyyy');
      setOrderNumber(orderNumber + 1);
      // console.log(values, 'sending values to redux');
      dispatch(UpdateOrderDetails(values));
      dispatch(SetPendingOrder(orderNumber));
      // dispatch(AddMoreOrder('ppp','vvv',2))
      props.navigation.navigate('Home');
    }
  };

  const SelectFilteredShops = OrderData.filter(shops => {
    return shops.shop_name === selectedShop;
  });

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

  // console.log(addOrder, 'addOrder');

  // console.log(products, 'products');

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
        <Text style={styles.headText}>Order Details</Text>
      </View>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            quantity: '',
          }}
          validationSchema={OrderDetailsSchema}
          onSubmit={(value, formikprops) => {
            if (
              selectedProduct != null &&
              selectedVariant != null &&
              addBtn1 == true &&
              addBtn2 == false
            ) {
              Quantity = value.quantity;

              // setSelectedQuantity(value.quantity)
              setAddOrder(pre => [
                ...pre,
                [selectedProduct, selectedVariant, Quantity],
                // [orderNumber, selectedShop, formattedDate],
              ]);

              setProducts(
                pre => [
                  ...pre,
                  {key:key++, selectedProduct, selectedVariant, Quantity},
                ],
                // console.log(pre, 'preeeeeeeeeeeeee');
              );

              VarientDropdownRef.current.reset();
              ProductDropdownRef.current.reset();

              formikprops.resetForm();
              setAddBtn1(false);
              setAddBtn2(true);
            } else {
              ToastAndroid.show(
                'Select the Reqiuired Fields',
                ToastAndroid.SHORT,
              );
            }
          }}>
          {formikprops => (
            <View>
              <View style={styles.container1}>
                <View>
                  <Text style={styles.orderText}>
                    Order Date : {formattedDate}
                  </Text>
                  <Text style={styles.orderText}>
                    Order Number : {orderNumber}
                  </Text>
                </View>
                <View style={styles.shopname}>
                  <Text style={styles.selectText}>Select Shop</Text>
                  <DropdownComp
                    data={ShopNames}
                    search={true}
                    disabled={selectedShop === null ? false : true}
                    defaultBtnText={'Select Shop'}
                    searchPlaceHolder={'Search here...'}
                    searchPlaceHolderColor="#FF8400"
                    dropdownRef={shopDropdownRef}
                    onselect={handleShopSelection}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonstyle={{
                      backgroundColor: '#FDF7C3',
                      width: width * 0.9,
                    }}
                    buttonTextStyle={{
                      letterSpacing: 2,
                    }}
                    rowstyle={{
                      backgroundColor: '#FDF7C3',
                    }}
                  />
                </View>
                <View>
                  {SelectFilteredShops.map(values => (
                    <View key={values.key} style={styles.mappedValuesWrap}>
                      <Text style={styles.text}>
                        Shop Name: {values.shop_name}
                      </Text>
                      <Text style={styles.text}>
                        Shop Contact Number: {values.shop_contact1}
                      </Text>
                      <Text style={styles.text}>
                        Shop Alternate Number: {values.shop_contact2}
                      </Text>
                      <Text style={styles.text}>
                        Shop Address: {values.address}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.container2}>
                <View style={styles.shopname}>
                  <Text style={styles.selectText}>Select Product</Text>
                  <DropdownComp
                    data={ProductNames}
                    search={true}
                    defaultBtnText={'Select Product'}
                    dropdownRef={ProductDropdownRef}
                    searchPlaceHolder={'Search here...'}
                    searchPlaceHolderColor="#FF8400"
                    onselect={handleProductSelection}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonstyle={{
                      backgroundColor: '#FDF7C3',
                      width: width * 0.9,
                    }}
                    buttonTextStyle={{
                      letterSpacing: 2,
                    }}
                    rowstyle={{
                      backgroundColor: '#FDF7C3',
                    }}
                  />
                </View>
                <View style={styles.shopname}>
                  <Text style={styles.selectText}>Select variant</Text>
                  <DropdownComp
                    data={VariantNames[0]}
                    search={true}
                    defaultBtnText={'Select Variant'}
                    searchPlaceHolder={'Search here...'}
                    searchPlaceHolderColor="#FF8400"
                    onselect={handleVariantSelection}
                    dropdownRef={VarientDropdownRef}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonstyle={{
                      backgroundColor: '#FDF7C3',
                      width: width * 0.9,
                    }}
                    buttonTextStyle={{
                      letterSpacing: 2,
                    }}
                    rowstyle={{
                      backgroundColor: '#FDF7C3',
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.selectText}>Enter Quantity</Text>
                  <InputBox
                    mode={'outlined'}
                    label={'Quantity'}
                    placeholder={'Enter Quantity'}
                    keyboardType={'numeric'}
                    activeOutlineColor={'#FF8400'}
                    placeholderTextColor={'grey'}
                    value={formikprops.values.quantity}
                    onChangeText={formikprops.handleChange('quantity')}
                    onBlur={formikprops.handleBlur('quantity')}
                  />
                  <Text style={styles.error}>
                    {formikprops.touched.quantity &&
                      formikprops.errors.quantity}
                  </Text>
                </View>
              </View>
              <View style={styles.btnholder}>
                <ButtonComp
                  mode={'elevated'}
                  text={'Add'}
                  onPress={() => onSubmit(formikprops)}
                  style={styles.Addbtn}
                  textColor={'white'}
                />
              </View>
              {/* <View>
                <TableComp
                  data={addOrder}
                  colNames={colNames}
                  colSettings={colSettings}
                  backgroundColor={'white'}
                  noOfPages={1}
                  sort={false}
                  
                />
              </View> */}
              <View style={styles.tablecontainer}>
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
                  <Rows data={addOrder} />
                </Table>
              </View>
              <View
                style={styles.Confirmbtnholder}
                textStyle={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                <ButtonComp
                  mode={'elevated'}
                  text={'Confirm'}
                  onPress={handleConfirm}
                  style={styles.Addbtn}
                  textColor={'white'}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollcontainer: {
    backgroundColor: '#F6F1E9',
    width: width,
    height: height,
    flexGrow: 1,
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
  headTextWrap: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  formContainer: {
    // backgroundColor: 'yellow',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  orderText: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  searchbox: {
    backgroundColor: '#DAF5FF',
    color: 'black',
    width: 350,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  back: {
    height: 40,
    width: 40,
    flex: 0.1,
    marginLeft: 10,
  },
  shopname: {
    // backgroundColor: 'red',
    marginVertical: 10,
    marginBottom: 25,
  },
  selectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 2,
  },
  btn2: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 10,
    marginRight: 10,
  },
  dobtext: {
    // marginHorizontal: 15,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#150E56',
    paddingLeft: 12,
    marginBottom: 5,
  },
  DropdownWrapper: {
    // flexDirection: 'row',
    marginHorizontal: 15,
    // marginBottom:3,
    // backgroundColor:'yellow'
  },
  DropdownHolder: {
    flexDirection: 'row',
  },
  dobWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  dobHolder: {
    flex: 0.4,
  },
  dateselected: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
  },
  mappedValuesWrap: {
    // backgroundColor:'red',
    paddingLeft: 15,
    marginBottom: 30,
  },
  btnholder: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  Addbtn: {
    backgroundColor: '#FF8400',
  },
  error: {
    color: 'red',
  },
  Confirmbtnholder: {
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
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
  tableheaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  tabletext: {
    textAlign: 'center',
    color: 'black',
  },
});
