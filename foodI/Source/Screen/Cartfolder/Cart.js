import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNav from '../HomeComponent/BottomNav';
import SingleFoodCart from './SingleFoodCart';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Cart = ({navigation}) => {
  const [cartData, setcartData] = useState('');
  const [docData, setdocData] = useState(null);
  const [actualprice, setactualprice] = useState('');
  const [actualprice1, setactualprice1] = useState('');
  const [addPrice, setaddPrice] = useState('');
  const [addPrice1, setaddPrice1] = useState('');
  const [totalCost, settotalCost] = useState('0');
  const [havingData, sethavingData] = useState('');

  useEffect(() => {
    getDataCart();
    // console.log('====================================');
    // console.log('koii', {actualprice, actualprice1, addPrice, addPrice1});
    // console.log('====================================');
  }, []);

  const getDataCart = () => {
    const dataref = firestore()
      .collection('UserCart')
      //.doc is use to check send me this data who having this uid
      .doc(auth().currentUser.uid);
    dataref
      .get()
      .then(doc => {
        if (doc.exists) {
          setdocData(doc.data());
          const revicedcartdata = JSON.stringify(doc.data());
          // JSON.parse(revicedcartdata).cart.map(item => {
          //   item.FoodData.food_Name,
          //     setactualprice(item.addFoodQuantity),
          //     setaddPrice(item.addonQuantity),
          //     setactualprice1(item.FoodData.food_Price),
          //     setaddPrice1(item.FoodData.foodAddon_price);
          // });
          console.log('Data exists:', revicedcartdata);
          // console.log(
          //   'Data exists@@@2:',
          //   JSON.parse(revicedcartdata).cart.map(
          //     item => item.FoodData.food_Name,
          //     // setactualprice(item.addFoodQuantity),
          //     // setaddPrice(item.addonQuantity),
          //     // setactualprice1(item.FoodData.food_Price),
          //     // setaddPrice1(item.FoodData.foodAddon_price),
          //   ),
          // );
          // Update state with cart data
          setcartData(revicedcartdata);
        } else {
          setcartData('Data Not found!');
          console.log('this is ', cartData);
          // console.log('Data not found!');
          // sethavingData('Data No Found');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.HeadingContainer}>
        <Text style={styles.Heading}>Food Cart</Text>
      </View>

      {cartData !== 'Data Not found!' ? (
        <View
          style={{backgroundColor: 'pink', flex: 0.934, paddingBottom: '13%'}}>
          <ScrollView>
            <SingleFoodCart navigation={navigation} docData={docData} />
            {/* <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} />
            <SingleFoodCart navigation={navigation} /> */}
          </ScrollView>
          <View style={styles.totalPriceContainer}>
            {/* <BottomNav navigation={navigation} /> */}
            <Text style={styles.totalPriceTxt}>Total Price </Text>
            <Text style={styles.totalPriceTxt}> ₹ 10000/-</Text>
          </View>
          {/* //// */}
        </View>
      ) : (
        <View>
          <Text>No Data found</Text>
        </View>
      )}

      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  bottomNav: {
    height: windowHeight / 16,
    width: windowWidth,
    backgroundColor: '#FFB700',
    position: 'absolute',
    bottom: 0,
  },
  totalPriceContainer: {
    height: windowHeight / 16,
    width: windowWidth,
    backgroundColor: '#FFB700',
    position: 'absolute',
    bottom: '1.2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  Heading: {color: '#ffb700', fontSize: 40, fontWeight: '700'},
  HeadingContainer: {alignItems: 'center', backgroundColor: 'green'},
  totalPriceTxt: {fontSize: 30, color: 'green', fontWeight: 'bold'},
});
