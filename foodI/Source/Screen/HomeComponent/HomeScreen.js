import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Categories from './Categories';
import OfferSlider from './OfferSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import firestore from '@react-native-firebase/firestore';
import FoodCard from './FoodCard';
import SearchfoodBar from './SearchfoodBar';

const HomeScreen = () => {
  //HERE WE ARE RECIVED ALL THE DATA FROM THE  FIRESTORE DATABASE
  const [fireStoreDataRecived, setfireStoreDataRecived] = useState([]);
  const [VegData, setVegData] = useState([]);
  const [NonVegData, setNonVegData] = useState([]);
  const [isRefresh, setisRefresh] = useState(false);
  const [SearchValueItem, setSearchValueItem] = useState('');

  console.log('1', SearchValueItem);
  const RefreshingData = () => {
    setisRefresh(true);
    setTimeout(() => {
      setisRefresh(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
    // console.log('All data Recived', fireStoreDataRecived);
  }, [isRefresh]);

  const fetchData = async () => {
    try {
      const response = await firestore().collection('foodDataColl').get();
      const data = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setfireStoreDataRecived(data);
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
    }
  };

  useEffect(() => {
    try {
      const vegItems = fireStoreDataRecived.filter(
        item => item.food_type === 'veg',
      );
      const nonVegItems = fireStoreDataRecived.filter(
        item => item.food_type === 'Non-veg',
      );
      setVegData(vegItems);
      setNonVegData(nonVegItems);
    } catch (err) {
      console.log('ye error aa rehi hai Veg Data Ko Alag Krne me', err);
    }
  }, [fireStoreDataRecived]);

  // console.log('Ye raha Veg data ***********', VegData);
  // console.log('Ye raha NonVeg data ########', NonVegData);

  return (
    <ScrollView
      style={{paddingBottom: 10}}
      refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          onRefresh={() => RefreshingData()}
        />
      }>
      <Header />
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={25} color="#ffb700" />
        <TextInput
          placeholder="Search Food Here..."
          style={styles.inputTxt}
          onChangeText={SearchValue => {
            setSearchValueItem(SearchValue);
          }}
        />
      </View>
      {/* <SearchfoodBar data={fireStoreDataRecived} value={SearchValueItem} /> */}
      <Categories />
      <OfferSlider />
      <FoodCard title={`Today's Special`} data={fireStoreDataRecived} />
      <FoodCard title={`NonVeg Dish`} data={NonVegData} />
      <FoodCard title={`Veg Hunger`} data={VegData} />
    </ScrollView>
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
