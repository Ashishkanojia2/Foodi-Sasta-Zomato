import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomNav = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <FontAwesome
        name="home"
        size={35}
        style={styles.Icone}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
      <Ionicons
        name="search"
        size={35}
        style={styles.Icone}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      />
      <FontAwesome6
        name="cart-shopping"
        size={28}
        style={styles.Iconecart}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
      <Feather
        name="map-pin"
        size={30}
        style={styles.Icone}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      />
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  Icone: {
    fontWeight: '600',
    // color: '#ffdd87',
    color: 'green',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 30,
  },
  Iconecart: {
    fontWeight: '600',
    // color: '#ffdd87',
    color: 'green',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 30,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 5,
  },
});
