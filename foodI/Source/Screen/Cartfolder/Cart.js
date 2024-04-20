import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  const [TotalFoodPrice, setTotalFoodPrice] = useState('');

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
          setcartData(revicedcartdata);
        } else {
          setcartData('Data Not found!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  const refreshCartData = () => {
    getDataCart(); // Refresh the docData
  };

  useEffect(() => {
    let FoodPrice = 0;
    if (cartData != '') {
      const food = JSON.parse(cartData).cart;
      // console.log('ye Food Ki CalCulatio ke Leye hai', food);
      food.map(item => {
        const addonPrice =
          item.FoodData.foodAddon_price === ''
            ? 0
            : parseInt(item.FoodData.foodAddon_price);

        FoodPrice =
          parseInt(item.FoodData.food_Price) * parseInt(item.AddFoodQuantity) +
          parseInt(addonPrice) * parseInt(item.AddonQuantity) +
          FoodPrice;
      });
      setTotalFoodPrice(FoodPrice);
      // console.log('ye kya aa gaya', FoodPrice);
    }
  }, [cartData]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.HeadingContainer}>
        <Text style={styles.Heading}>Food Cart</Text>
      </View>

      {cartData !== 'Data Not found!' ? (
        <View style={{flex: 0.934, paddingBottom: '13%'}}>
          <ScrollView>
            <SingleFoodCart
              navigation={navigation}
              docData={docData}
              onRefresh={refreshCartData}
            />
          </ScrollView>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceTxt}>You have to Pay</Text>
            <Text style={styles.totalPriceAmount}> ₹{TotalFoodPrice}/-</Text>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payBtntxt}>Place Order</Text>
            </TouchableOpacity>
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
    // backgroundColor: '#FFB700',
    backgroundColor: 'green',
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
  totalPriceTxt: {fontSize: 20, color: '#FFB700', fontWeight: '500'},
  totalPriceAmount: {fontSize: 25, color: '#FFB700', fontWeight: '500'},
  payBtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffb700',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  payBtntxt: {
    fontSize: 14,
    color: '#ffb700',
  },
});
