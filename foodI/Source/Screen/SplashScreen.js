import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import cartImage from '../Assets/cartImage.jpg';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;
const SplashScreen = ({navigation}) => {
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
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btnText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Log</Text>
        </TouchableOpacity>
      </View>
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
