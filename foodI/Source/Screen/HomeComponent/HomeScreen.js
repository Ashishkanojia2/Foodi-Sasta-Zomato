import {StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import React from 'react';
import Header from './Header';
import Categories from './Categories';
import OfferSlider from './OfferSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Header />
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={25} color="#ffb700" />
        <TextInput placeholder="Search Food Here..." style={styles.inputTxt} />
      </View>
      {/* <Text style={styles.searchTxt}>HomeScreen</Text> */}
      <Categories />
      <OfferSlider />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB700',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 15,
    // fontSize: 50,
  },
  searchTxt: {fontSize: 20},
  inputTxt: {
    fontSize: 18,
    paddingLeft: 10,
    width: '90%',
    color: '#000',
  },
});
