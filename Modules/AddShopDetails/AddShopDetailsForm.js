import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {ButtonComp} from '../../Components/Button';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {InputBox} from '../../Components/InputBox';
import {ShopDetailsSchema} from '../ValidatingSchema/Schema';
import {UpdateShopDetails} from '../../Store/Action';

const {width, height} = Dimensions.get('window');

export const AddShopDetailsForm = props => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const date = ('0' + currentDate.getDate()).slice(-2);
  const formattedDate = year + '/' + month + '/' + date;

  const onReset = formikprops => {
    formikprops.resetForm();
  };
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
        <Text style={styles.headText}>Shop Details</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            shop_name: '',
            shop_mail: '',
            shop_landmark: '',
            contact_number_1: '',
            contact_number_2: '',
            shop_pincode: '',
            gst_number: '',
            shop_address: '',

          }}
          // validationSchema={ShopDetailsSchema}
          onSubmit={value => {
            console.log(value);
            ToastAndroid.show(
              'Shop Details Added Sucessfully!',
              ToastAndroid.SHORT,
            );
            dispatch(UpdateShopDetails(value));
            //  props.navigation.navigate('OrderForm')
          }}>
          {formikprops => (
            <View>
              <View style={styles.dateWrap}>
                <Text style={styles.dateselected}>{formattedDate}</Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Shop Name'}
                  placeholder={'Enter Shop Name'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.shop_name}
                  onChangeText={formikprops.handleChange('shop_name')}
                  onBlur={formikprops.handleBlur('shop_name')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.shop_name &&
                    formikprops.errors.shop_name}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'E-mail'}
                  placeholder={'Enter e-mail'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.shop_mail}
                  onChangeText={formikprops.handleChange('shop_mail')}
                  onBlur={formikprops.handleBlur('shop_mail')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.shop_mail &&
                    formikprops.errors.shop_mail}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Landmark'}
                  placeholder={'Enter Landmark'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.shop_landmark}
                  onChangeText={formikprops.handleChange('shop_landmark')}
                  onBlur={formikprops.handleBlur('shop_landmark')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.shop_landmark &&
                    formikprops.errors.shop_landmark}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Contact Number'}
                  placeholder={'Enter Contact Number'}
                  keyboardType={'numeric'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.contact_number_1}
                  onChangeText={formikprops.handleChange('contact_number_1')}
                  onBlur={formikprops.handleBlur('contact_number_1')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.contact_number_1 &&
                    formikprops.errors.contact_number_1}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Alternate Number'}
                  placeholder={'Enter Alternate Number'}
                  keyboardType={'numeric'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.contact_number_2}
                  onChangeText={formikprops.handleChange('contact_number_2')}
                  onBlur={formikprops.handleBlur('contact_number_2')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.contact_number_2 &&
                    formikprops.errors.contact_number_2}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Pincode'}
                  placeholder={'Enter Pincode'}
                  keyboardType={'numeric'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.shop_pincode}
                  onChangeText={formikprops.handleChange('shop_pincode')}
                  onBlur={formikprops.handleBlur('shop_pincode')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.shop_pincode &&
                    formikprops.errors.shop_pincode}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'GST Number'}
                  placeholder={'Enter GST Number'}
                  keyboardType={'numeric'}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.gst_number}
                  onChangeText={formikprops.handleChange('gst_number')}
                  onBlur={formikprops.handleBlur('gst_number')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.gst_number &&
                    formikprops.errors.gst_number}
                </Text>
              </View>
              <View style={styles.inputBox}>
                <InputBox
                  mode={'outlined'}
                  label={'Shop Address'}
                  placeholder={'Enter Shop Address'}
                  multiline={true}
                  activeOutlineColor={'#4F200D'}
                  placeholderTextColor={'#FF8400'}
                  value={formikprops.values.shop_address}
                  onChangeText={formikprops.handleChange('shop_address')}
                  onBlur={formikprops.handleBlur('shop_address')}
                />
                <Text style={styles.error}>
                  {formikprops.touched.shop_address &&
                    formikprops.errors.shop_address}
                </Text>
              </View>
              <View style={styles.btnwrap}>
                <View style={styles.btnholder}>
                  <ButtonComp
                    mode={'contained'}
                    text={'Clear'}
                    onPress={() => onReset(formikprops)}
                    style={styles.btn2}
                    textColor={'white'}
                  />
                </View>
                <View style={styles.btnholder}>
                  <ButtonComp
                    mode={'contained'}
                    text={'Save'}
                    onPress={formikprops.handleSubmit}
                    style={styles.btn1}
                    textColor={'black'}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  inputBox: {
    // marginVertical: 5,
  },
  btn1: {
    backgroundColor: '#B3FFAE',
  },
  btn2: {
    backgroundColor: '#FF7D7D',
  },
  btnwrap: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  btnholder: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dateselected: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginVertical: 5,
    width: 120,
  },
  dateWrap: {
    alignItems: 'flex-end',
  },
  error: {
    color: '#E21818',
  },
  back: {
    height: 40,
    width: 40,
    flex: 0.1,
    marginLeft: 10,
  },
});
