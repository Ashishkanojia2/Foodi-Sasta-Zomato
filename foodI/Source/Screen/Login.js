import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import UserLogin from './UserLogin';
import Navigation from '../Nav/Navigation';
const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Login = ({navigation}) => {
  const [viewPass, setviewPass] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState(false);
  const [Passwordfocus, setPasswordfocus] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  //
  const [FullNameFocus, setFullNameFocus] = useState(false);
  const [PhonenumberFocus, setPhonenumberFocus] = useState(false);
  const [AddressFocus, setAddressFocus] = useState(false);
  // If user SucessFull Login
  const [SucessfullLogin, setSucessfullLogin] = useState('');
  //showing Loader when user Login
  const [showLoader, setshowLoader] = useState(false);

  // Collection User LoginData
  const [CollectionData, setCollectionData] = useState({
    fullName: '',
    emailId: '',
    phoneNo: '',
    password: '',
    Cpassword: '',
    address: '',
  });

  // setTimeout(() => {
  //   if (setshowLoader == true) {
  //     setshowLoader(false);
  //   }
  // }, 2000);
  const BtnPress = () => {
    navigation.navigate('UserLogin');

    // console.log('Kya aaya!', CollectionData, 'aaya');
    // setCollectionData({
    //   ...CollectionData,
    //   fullName: '',
    //   emailId: '',
    //   phoneNo: '',
    //   password: '',
    //   Cpassword: '',
    //   address: '',
    // });
    // Password Checking Condition

    // LoginSucessFully Page Design will be complete then remove Comment from Here

    // if (
    //   (CollectionData.fullName =
    //     '' ||
    //     CollectionData.emailId == '' ||
    //     CollectionData.phoneNo == '' ||
    //     CollectionData.password == '' ||
    //     CollectionData.Cpassword == '' ||
    //     CollectionData.address == '')
    // ) {
    //   console.log('Blank Box Not alloewed');
    //   Alert.alert('Something Wents Wrong');
    //   return;
    // } else if (CollectionData.password !== CollectionData.Cpassword) {
    //   console.log("Password Doesn't match");
    //   Alert.alert("Password Doesn't match");
    //   return;
    // } else if (CollectionData.phoneNo.length != 10) {
    //   Alert.alert('Check Your Phone Number');
    //   return;
    // }
    // try {
    //   auth()
    //     .createUserWithEmailAndPassword(
    //       CollectionData.emailId,
    //       CollectionData.password,
    //     )
    //     .then(data => {
    //       console.log(
    //         'User sucessfully Login',
    //         data.additionalUserInfo.isNewUser,
    //       );
    //       {
    //         data.additionalUserInfo.isNewUser != '' || false
    //           ? setshowLoader(true)
    //           : setshowLoader(false);
    //         setTimeout(() => {
    //           setshowLoader(false);
    //           navigation.navigate('UserLogin');
    //         }, 2000);
    //       }
    //     })
    //     .catch(error => {
    //       console.log('Here is the Error', error);
    //     });
    //   //this Error is Recinving From Our Code Error .. Both are different Catch
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <View style={styles.Minicontainer}>
          <ActivityIndicator
            size={50}
            color={'#FFB700'}
            animating={showLoader}
          />

          <Text style={styles.heading}>Login</Text>

          <View style={styles.inputTextView}>
            <FontAwesome
              name="user"
              size={25}
              color={FullNameFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Full Name"
              placeholderTextColor={'#b4b5b4'}
              onFocus={() => {
                setFullNameFocus(!FullNameFocus);
                setemailFocus(false);
                setPasswordfocus(false);
                setConfirmPass(false);
                setAddressFocus(false);
                setPhonenumberFocus(false);
              }}
              value={CollectionData.fullName}
              onChangeText={value =>
                setCollectionData({...CollectionData, fullName: value})
              }
            />
          </View>

          <View style={styles.inputTextView}>
            <Entypo
              name="email"
              size={25}
              color={emailFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Email-Id"
              placeholderTextColor={'#b4b5b4'}
              onFocus={() => {
                setFullNameFocus(false);
                setemailFocus(!emailFocus);
                setPasswordfocus(false);
                setConfirmPass(false);
                setAddressFocus(false);
                setPhonenumberFocus(false);
              }}
              value={CollectionData.emailId}
              onChangeText={value =>
                setCollectionData({...CollectionData, emailId: value})
              }
            />
          </View>

          <View style={styles.inputTextView}>
            <Feather
              name="phone"
              size={25}
              color={PhonenumberFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Phone Number"
              placeholderTextColor={'#b4b5b4'}
              keyboardType="number-pad"
              maxLength={10}
              onFocus={() => {
                setFullNameFocus(false);
                setemailFocus(false);
                setPasswordfocus(false);
                setConfirmPass(false);
                setAddressFocus(false);
                setPhonenumberFocus(!PhonenumberFocus);
              }}
              value={CollectionData.phoneNo}
              onChangeText={value =>
                setCollectionData({...CollectionData, phoneNo: value})
              }
            />
          </View>

          {/* ****************************************** */}
          <View style={styles.inputTextView}>
            <FontAwesome
              name="lock"
              size={25}
              color={Passwordfocus == true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Password"
              placeholderTextColor={'#b4b5b4'}
              secureTextEntry={viewPass == true ? false : true}
              onFocus={() => {
                setFullNameFocus(false);
                setemailFocus(false);
                setPasswordfocus(!false);
                setConfirmPass(false);
                setAddressFocus(false);
                setPhonenumberFocus(false);
              }}
              value={CollectionData.password}
              onChangeText={value =>
                setCollectionData({...CollectionData, password: value})
              }
            />
            <FontAwesome
              name={viewPass == true ? 'eye' : 'eye-slash'}
              size={25}
              style={{position: 'absolute', right: 10, color: '#999798'}}
              onPress={() => {
                setviewPass(!viewPass);
              }}
            />
          </View>
          {/* ****************************************** */}
          {/* ****************************************** */}
          <View style={styles.inputTextView}>
            <FontAwesome
              name="lock"
              size={25}
              color={ConfirmPass == true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Confirm Password"
              placeholderTextColor={'#b4b5b4'}
              secureTextEntry={ConfirmPass == true ? false : true}
              onFocus={() => {
                setFullNameFocus(false);
                setemailFocus(false);
                setPasswordfocus(false);
                setConfirmPass(!false);
                setAddressFocus(false);
                setPhonenumberFocus(false);
              }}
              value={CollectionData.Cpassword}
              onChangeText={value =>
                setCollectionData({...CollectionData, Cpassword: value})
              }
            />
            <FontAwesome
              name={ConfirmPass == true ? 'eye' : 'eye-slash'}
              size={25}
              style={{position: 'absolute', right: 10, color: '#999798'}}
              onPress={() => {
                setConfirmPass(!ConfirmPass);
              }}
            />
          </View>
          {/* ****************************************** */}
          <View style={styles.inputTextView}>
            <FontAwesome
              name="address-book-o"
              size={25}
              color={AddressFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="Address"
              placeholderTextColor={'#b4b5b4'}
              onFocus={() => {
                setFullNameFocus(false);
                setemailFocus(false);
                setPasswordfocus(false);
                setConfirmPass(false);
                setAddressFocus(!AddressFocus);
                setPhonenumberFocus(false);
              }}
              value={CollectionData.address}
              onChangeText={value =>
                setCollectionData({...CollectionData, address: value})
              }
            />
          </View>

          <TouchableOpacity
            style={styles.LoginBtn}
            onPress={() => {
              BtnPress();
            }}>
            <Text style={styles.btntext}>Login </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#FFB700',
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Minicontainer: {
    height: windowHeight / 1.6,
    width: windowWidth / 1.2,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  txtInputone: {
    // height: '10%',
    // width: '90%',
    // backgroundColor: '#fff',
    // zIndex: 1,
    // borderRadius: 10,
    // borderColor: '#FFB700',
    // borderWidth: 1.5,
    // marginTop: 10,
    paddingLeft: 10,
    color: '#000',
    // fontSize: 18,
    // elevation: 30,
  },
  LoginBtn: {
    backgroundColor: '#FFB700',
    borderRadius: 10,
    height: windowHeight / 18,
    width: windowWidth / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    elevation: 30,
  },
  btntext: {color: '#fff', fontSize: 20},
  heading: {
    color: '#ffb700',
    fontSize: 35,
    fontWeight: '900',
    // elevation: 30,
  },
  icon: {
    fontFamily: 'FontAwesome',
  },
  inputTextView: {
    flexDirection: 'row',
    height: '10%',
    width: '90%',
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 10,
    borderColor: '#FFB700',
    borderWidth: 1.5,
    // marginTop: 10,
    paddingLeft: 10,
    color: '#000',
    fontSize: 18,
    elevation: 30,
    alignItems: 'center',
    // color: '#000',
  },
});
