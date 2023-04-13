import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native';
import {Formik} from 'formik';
import { useDispatch } from 'react-redux';
import {InputBox} from '../../Components/InputBox';
import {ButtonComp} from '../../Components/Button';
import { UpdateLogin } from '../../Store/Action';
const {width, height} = Dimensions.get('window');


export const UserLogin = props => {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      source={require('../../Images/loginPage/loginbg.jpg')}
      style={styles.background}>
     
      <View>
        <View>
          <Image
            source={require('../../Images/loginPage/marketingicon.png')}
            style={styles.shop}
          />
        </View>
        <View style={styles.textwrap}>
          <Text style={styles.text1}>Welcome</Text>
          <Text style={styles.text2}>Back!</Text>
        </View>
      </View>
      <View style={styles.loginwrap}>
        <View style={styles.loginTextWrap}>
          <Image
            source={require('../../Images/loginPage/usericon.png')}
            style={styles.userIcon}
          />
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={value => {
              console.log(value);
              dispatch(UpdateLogin(value));
              props.navigation.navigate('HomePage');
            }}>
            {formikprops => (
              <View style={styles.formikContainer}>
                <View style={styles.inputBox}>
                  <InputBox
                    mode={'flat'}
                    label={'Email'}
                    placeholder={'Enter Email'}
                    activeUnderlineColor={'#1EA2E4'}
                    value={formikprops.values.email}
                    onChangeText={formikprops.handleChange('email')}
                    onBlur={formikprops.handleBlur('shop_name')}
                  />
                </View>
                <View style={styles.inputBox}>
                  <InputBox
                    mode={'flat'}
                    label={'Password'}
                    placeholder={'Enter Password'}
                    secureText={true}
                    activeUnderlineColor={'#1EA2E4'}
                    value={formikprops.values.password}
                    onChangeText={formikprops.handleChange('password')}
                    onBlur={formikprops.handleBlur('password')}
                  />
                </View>
                <View style={styles.btnWrap}>
                  <ButtonComp
                    mode={'elevated'}
                    text={'Login'}
                    style={styles.btn}
                    textColor={'white'}
                    onPress={formikprops.handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View>
          <Image
            source={require('../../Images/loginPage/phone.png')}
            style={styles.marketing}
          />
        </View>
      </View>
     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    flexGrow:1
  },
  loginImg: {
    position: 'absolute',
    height: height * 0.6,
    width: width,
  },
  loginwrap: {
    height: height,
    width: width,
    backgroundColor: '#E3F6FF',
    top: 250,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  shop: {
    position: 'absolute',
    opacity: 0.8,
    right: 30,
    top: 60,
    height: 100,
    width: 100,
    // borderRadius:0,
    // transform: [
    //   {
    //     rotate: '15deg',
    //   },
    // ],
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#1EA2E4',
  },
  text1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#E3F6FF',
  },
  text2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#E3F6FF',
  },
  textwrap: {
    // backgroundColor:'red',
    position: 'absolute',
    marginTop: 60,
    marginLeft: 40,
  },
  userIcon: {
    height: 50,
    width: 50,
  },
  loginTextWrap: {
    flexDirection: 'row',
    // backgroundColor:'red',
    marginTop: 20,
  },
  inputBox: {
    marginVertical: 10,
  },
  formikContainer: {
    marginTop: 30,
  },
  btnWrap: {
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#1EA2E4',
    paddingHorizontal: 10,
  },
  marketing: {
    opacity: 0.4,
    height: 200,
    width: 200,
    left:0
  },
});
