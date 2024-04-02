import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Login = () => {
  const [viewPass, setviewPass] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState(false);
  const [Passwordfocus, setPasswordfocus] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <View style={styles.Minicontainer}>
          <Text style={styles.heading}>Login</Text>

          <View style={styles.inputTextView}>
            <FontAwesome
              name="user"
              size={25}
              color={emailFocus === true ? '#FFB700' : 'black'}
            />
            <TextInput
              style={styles.txtInputone}
              placeholder="UserName/EmailId"
              placeholderTextColor={'#b4b5b4'}
              onFocus={() => {
                setemailFocus(!emailFocus);
                setPasswordfocus(false);
                setConfirmPass(false);
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
              placeholderTextColor={'#b4b5b4'}
              secureTextEntry={viewPass == true ? false : true}
              onFocus={() => {
                setemailFocus(false);
                setPasswordfocus(!Passwordfocus);
                setConfirmPass(false);
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
                setemailFocus(false);
                setPasswordfocus(false);
                setConfirmPass(!false);
              }}
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

          <TouchableOpacity style={styles.LoginBtn}>
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
  LoginBtn: {
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
    // color: '#000',
  },
});
