import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import cartImage from '../Assets/cartImage.jpg';
import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;
const SplashScreen = ({navigation}) => {
  const [UserLogged, setUserLogged] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('User Already Login Hai', user);
        setUserLogged(user);
      } else {
        // console.log('User is Not LogIn Yet..');
      }
    });
  }, [UserLogged]);

  const LogOutfun = () => {
    auth().signOut();
    // console.log('logout ke baad user ka kya huya :', UserLogged);
    setUserLogged('');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={(require = cartImage)}
        style={{
          height: windowHeight,
          width: windowWidth,
          resizeMode: 'stretch',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <Text style={{color: '#fff', fontSize: 40, zIndex: 1}}>
        Welcome to Foodi
      </Text>
      <View style={{flexDirection: 'row'}}>
        {UserLogged != '' ? (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => LogOutfun()}>
              <Text style={styles.btnText}>LogOut</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.btnText}>SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.btnText}>LogIn</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {UserLogged != '' ? (
        <>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 80,
              fontSize: 20,
              color: '#fff',
            }}>
            You are Login From This Account :
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              fontSize: 18,
              color: 'brown',
            }}>
            {UserLogged.email}
          </Text>
        </>
      ) : (
        <>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 80,
              fontSize: 14,
              color: '#fff',
            }}>
            You Are Not Login..!
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 14,
                color: '#fff',
              }}>
              If You have a Already Account then
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  marginLeft: 5,
                  fontSize: 14,
                  color: 'brown',
                }}>
                SignIn..
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  btn: {
    // backgroundColor:"#fff",
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 5,
    width: windowWidth / 2.5,
    height: windowHeight / 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
});
