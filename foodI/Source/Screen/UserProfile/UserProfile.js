import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const UserProfile = ({navigation}) => {
  const [uesrProfileData, setuesrProfileData] = useState('');
  const [recivedData, setrecivedData] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(data => {
      if (data) {
        console.log('ID mil gaya', data.uid);
        setuesrProfileData(data.uid);
      } else {
        console.log('data nhi mili UserProfile me');
      }
    });
  }, []);

  useEffect(() => {
    getuserData();
  }, [uesrProfileData]);

  //
  //
  const getuserData = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('UserData')
        .where('Uid', '==', uesrProfileData)
        .get();

      if (querySnapshot.empty) {
        console.log('No matching documents');
        return;
      }

      querySnapshot.forEach(doc => {
        const userData = doc.data(); // Access the data of the document
        // console.log('User ka Pura Data', userData);
        setrecivedData(userData);
      });
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };
  //   console.log('from recived data', recivedData);
  return (
    <View style={{flex: 1}}>
      <View style={styles.Container}>
        <View style={styles.Minicontainer}>
          <Text style={styles.topheading}>UserData</Text>
          <Text style={styles.headline}>FullName</Text>
          <Text style={styles.heading}>{recivedData.fullName}</Text>
          <Text style={styles.headline}>Email Id</Text>
          <Text style={styles.heading}>{recivedData.emailId}</Text>
          <Text style={styles.headline}>Phone No</Text>
          <Text style={styles.heading}>{recivedData.phoneNo}</Text>
          <Text style={styles.headline}>Address</Text>
          <Text style={styles.heading}>{recivedData.address}</Text>

          <View style={styles.BtnScontainer}>
            <TouchableOpacity
              style={styles.UserLoginBtn}
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}>
              <Ionicons name="arrow-back-circle" size={30} color={'#fff'} />
              <Text style={styles.btntext}>Go Back </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

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
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
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
    // color: '#ffb700',   // yellow color
    color: '#65d360', // green Color
    fontSize: 20,
    fontWeight: '900',
    borderWidth: 1,
    borderColor: '#65d360',
    padding: 5,
    borderRadius: 10,
    paddingLeft: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  headline: {
    color: '#000',
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  topheading: {
    color: '#ffb700', // yellow color
    // color: '#65d360', // green Color
    fontSize: 30,
    fontWeight: '900',
    padding: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
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
