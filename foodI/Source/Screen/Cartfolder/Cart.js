import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomNav from '../HomeComponent/BottomNav';
import SingleFoodCart from './SingleFoodCart';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Cart = ({navigation}) => {
  const [cartData, setcartData] = useState('');
  const [docData, setdocData] = useState(null);

  useEffect(() => {
    getDataCart();
  }, []);

  const getDataCart = () => {
    const dataref = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);
    dataref
      .get()
      .then(doc => {
        if (doc.exists) {
          setdocData(doc.data());
          const revicedcartdata = JSON.stringify(doc.data());

          // console.log('Data exists:', revicedcartdata);

          setcartData(revicedcartdata);
        } else {
          setcartData('Data Not found!');
          // console.log('this is ', cartData);
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  const refreshCartData = () => {
    getDataCart(); // Refresh the docData
  };

  // console.log('================2====================');
  // console.log(cartData);
  // console.log('====================================');

  return (
    <View style={{flex: 1}}>
      <View style={styles.HeadingContainer}>
        <Text style={styles.Heading}>Food Cart</Text>
      </View>

      {cartData !== 'Data Not found!' ? (
        <View
          style={{backgroundColor: 'pink', flex: 0.934, paddingBottom: '13%'}}>
          <ScrollView>
            <SingleFoodCart
              navigation={navigation}
              docData={docData}
              onRefresh={refreshCartData}
            />
          </ScrollView>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceTxt}>Total Price </Text>
            <Text style={styles.totalPriceTxt}> ₹ 10000/-</Text>
          </View>
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
