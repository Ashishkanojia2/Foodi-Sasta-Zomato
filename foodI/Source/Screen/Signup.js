import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Signup = ({navigation}) => {
  const [viewPass, setviewPass] = useState(false);
  // const [ConfirmPass, setConfirmPass] = useState(false);
  const [Passwordfocus, setPasswordfocus] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  // COLLECTION USER DATA
  const [Userdata, setUserdata] = useState({
    email: '',
    password: '',
  });
  //STORING ERROR MESSAGE
  const [ErrorMessage, setErrorMessage] = useState('');
  //SHOWING lOADING ANIMATION
  const [Loader, setLoader] = useState(false);
  const SignUpBtnPress = () => {
    console.log(Userdata);
    if (Userdata.email == '' || Userdata.password == '') {
      console.log('Blank Box Not allowed');
      setErrorMessage('Blank Box Not allowed');
      // Alert.alert('Something Wents Wrong');
      return;
    }
    // else if (CollectionData.password !== CollectionData.Cpassword) {
    //   console.log("Password Doesn't match");
    //   Alert.alert("Password Doesn't match");
    //   return;
    // } else if (CollectionData.phoneNo.length != 10) {
    //   Alert.alert('Check Your Phone Number');
    //   return;
    // }

    try {
      auth()
        .signInWithEmailAndPassword(Userdata.email, Userdata.password)
        .then(ReturnValue => {
          console.log(ReturnValue);
          setLoader(true);

          {
            ReturnValue.additionalUserInfo.isNewUser == false &&
              setTimeout(() => {
                setLoader(false);
                navigation.navigate('HomeScreen');
              }, 3000);
          }
        })
        .catch(err => {
          const errorMessage = err.message;
          console.log(err.message);
          if (
            errorMessage ===
            '[auth/invalid-email] The email address is badly formatted.'
          ) {
            setErrorMessage('Invalid Email-Id');
            console.log('Invalid Email-Id');
          } else if (
            errorMessage ===
            '[auth/invalid-credential] The supplied auth credential is incorrect, malformed or has expired.'
          ) {
            console.log('Incorrect Password');
            setErrorMessage('Incorrect Password');
          }
        });
    } catch (err) {
      console.log('Ye error Code ki hai SignIn Page main', err);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <View style={styles.Minicontainer}>
          <Text style={styles.heading}>Signup</Text>
          {ErrorMessage !== '' && (
            <Text style={styles.ErrorMessage}>{ErrorMessage}</Text>
          )}
          <View style={styles.inputTextView}>
            <FontAwesome
              name="user"
              size={25}
              color={emailFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="UserName/EmailId"
              placeholderTextColor={'#b5b4b5'}
              onChangeText={value => {
                setUserdata({...Userdata, email: value});
              }}
              onFocus={() => {
                setemailFocus(!emailFocus);
                setPasswordfocus(false);
                setErrorMessage('');
                setLoader(false);

                // setConfirmPass(false);
              }}
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
              placeholderTextColor={'#b5b4b5'}
              secureTextEntry={viewPass == true ? false : true}
              onChangeText={value => {
                setUserdata({...Userdata, password: value});
              }}
              onFocus={() => {
                setemailFocus(false);
                setPasswordfocus(!Passwordfocus);
                setErrorMessage('');
                setLoader(false);

                // setConfirmPass(false);
              }}
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
          <TouchableOpacity
            style={styles.SignupBtn}
            onPress={() => {
              SignUpBtnPress();
              // navigation.navigate('HomeScreen');
            }}>
            <Text style={styles.btntext}>Signup </Text>
          </TouchableOpacity>
          <ActivityIndicator size={50} color={'#FFB700'} animating={Loader} />
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
    height: windowHeight / 2,
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
  SignupBtn: {
    backgroundColor: '#FFB700',
    borderRadius: 10,
    height: windowHeight / 18,
    width: windowWidth / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    elevation: 30,
  },
  btntext: {color: '#fff', fontSize: 20},
  heading: {
    color: '#ffb700',
    fontSize: 40,
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
  },
  ErrorMessage: {
    color: 'red',
    fontSize: 15,
  },
});
