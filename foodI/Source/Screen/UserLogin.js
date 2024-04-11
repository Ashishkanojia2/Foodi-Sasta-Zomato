import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const UserLogin = ({navigation}) => {
  const BtnPress = () => {};
  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <View style={styles.Minicontainer}>
          <Text style={styles.heading}>User Login Successfully </Text>

          <View style={styles.BtnScontainer}>
            <TouchableOpacity
              style={styles.UserLoginBtn}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Ionicons name="arrow-back-circle" size={30} color={'#fff'} />
              <Text style={styles.btntext}>Go Back </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.UserLoginBtn}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <FontAwesome name="sign-in" size={30} color={'#fff'} />

              <Text style={styles.btntext}>SignIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  BtnScontainer: {
    flexDirection: 'row',
  },
  Container: {
    backgroundColor: '#FFB700',
    flex: 1,
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
    paddingLeft: 10,
    color: '#000',
  },
  UserLoginBtn: {
    backgroundColor: '#FFB700',
    borderRadius: 10,
    height: windowHeight / 18,
    width: windowWidth / 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginTop: 25,
    elevation: 30,
    margin: 10,
    flexDirection: 'row',
  },
  btntext: {color: '#fff', fontSize: 20},
  heading: {
    color: '#ffb700',
    fontSize: 25,
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
