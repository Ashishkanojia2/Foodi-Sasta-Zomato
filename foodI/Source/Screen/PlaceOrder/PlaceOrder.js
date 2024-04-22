import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const PlaceOrder = ({route}) => {
  const [data, setdata] = useState('');
  const [TotalFoodPrice, setTotalFoodPrice] = useState('');
  const [SingleFoodPrice, setSingleFoodPrice] = useState(0);
  // const [zeroPrice, setzeroPrice] = useState('');

  // const dataRecived = route.params.docData.cart;
  // setdata(dataRecived);
  // setdata(dataRecived);

  // console.log('====================================');
  // console.log(dataRecived);

  // console.log('====================================');

  // useEffect(() => {
  //   const docRef = firestore()
  //     .collection('UserData')
  //     .doc(auth().currentUser.uid);
  //   docRef
  //     .get()
  //     .then(doc => {
  //       console.log('Document data:', doc.data());
  //       if (doc.exists) {
  //         console.log('userData', doc.data());
  //       } else {
  //         console.log("Data Doesn't exist");
  //       }
  //     })
  //     .catch(error => {
  //       console.log(
  //         'Error retrieving user data from PlaceOrderPage:',
  //         error.message,
  //       );
  //     });
  // }, []);
  useEffect(() => {
    const dataRecived = route.params.docData.cart;
    setdata(dataRecived);
    console.log('====================================');
    console.log(dataRecived);
    console.log('====================================');

    let FoodPrice = 0;
    if (dataRecived !== '') {
      dataRecived.map(item => {
        const addonPrice =
          item.FoodData.foodAddon_price === ''
            ? 0
            : parseInt(item.FoodData.foodAddon_price);
        // setzeroPrice(addonPrice);
        FoodPrice =
          parseInt(item.FoodData.food_Price) * parseInt(item.AddFoodQuantity) +
          parseInt(addonPrice) * parseInt(item.AddonQuantity) +
          FoodPrice;
        setSingleFoodPrice(FoodPrice);
        console.log('first check ', FoodPrice);
      });
      setTotalFoodPrice(FoodPrice);
      console.log('ye raha ', FoodPrice);
    }
  }, [route.params.docData.cart]);

  // user ditals ---------------------------------------------------------------------------------------------
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
  console.log('====================================');
  console.log('ye vala', recivedData);
  console.log('====================================');

  const PlaceNow = () => {
    const docRef = firestore()
      .collection('UserOrders')
      .doc(new Date().getTime().toString());
    docRef
      .set({
        orderid: docRef.id,
        orderData: data,
        orderStatus: 'Pending',
        orderCost: TotalFoodPrice,
        orderDate: firestore.FieldValue.serverTimestamp(),
        orderAddress: recivedData.address,
        orderphone: recivedData.phoneNo,
        orderUserId: uesrProfileData,
        orderPayment: 'online UPI',
        paymentStatus: 'Paid',
      })
      .then(() => {
        Alert.alert('Order Placed');
      });
  };

  return (
    <View style={styles.screenCont}>
      <View style={styles.TopCont}>
        <Text style={styles.headerTxt}> Your Order Summery</Text>
      </View>
      <View style={styles.MainCont}>
        <View style={styles.OrderCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <ScrollView>
                  <View style={styles.MainContainer}>
                    <View style={styles.HoriContainer}>
                      <Text
                        style={{
                          position: 'absolute',
                          bottom: 8,
                          fontSize: 17,
                          fontWeight: '600',
                          paddingHorizontal: 5,
                          color: 'green',
                        }}>
                        Total Price :
                        {parseInt(item.FoodData.food_Price) *
                          parseInt(item.AddFoodQuantity) +
                          parseInt(
                            item.FoodData.foodAddon_price === ''
                              ? 0
                              : parseInt(item.FoodData.foodAddon_price),
                          ) *
                            parseInt(item.AddonQuantity)}
                      </Text>
                      <View style={styles.VertiContainer}>
                        <Image
                          source={{uri: item.FoodData.food_imageUrl}}
                          style={{
                            height: windowHeight / 8,
                            width: '100%',
                            resizeMode: 'stretch',
                          }}
                        />
                        {/* <Text style={{fontSize: 20, color: '#000'}}>
                        {item.FoodData.food_Name}
                      </Text> */}
                      </View>
                      <View style={styles.VertiContainer2}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.foodItem}>
                            {item.FoodData.food_Name}
                          </Text>
                          <Text style={styles.foodItem}>
                            {item.FoodData.food_Price}
                          </Text>
                        </View>

                        <Text style={styles.foodItem}>
                          Qty : {item.AddFoodQuantity}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.foodItem}>
                            {item.FoodData.food_addon}
                          </Text>
                          <Text style={styles.foodItem}>
                            {item.FoodData.foodAddon_price}
                          </Text>
                        </View>
                        <Text style={styles.foodItem}>
                          Extra Qty : {item.AddonQuantity}
                        </Text>
                        {/* <TouchableOpacity
                          style={styles.iconContainer}
                          // onPress={() => {
                          //   deleteFun(item);
                          // }}
                        >
                          <MaterialCommunityIcons
                            name="delete"
                            size={25}
                            style={styles.Icone}
                          />
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          />
        </View>
        <View style={styles.addressCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
          <Text style={styles.AddressHeading}>Your details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetailHead}>Name</Text>
            <Text style={styles.addressDetail}>{recivedData.fullName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetailHead}>Email</Text>
            <Text style={styles.addressDetail}>{recivedData.emailId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetailHead}>Phone No.</Text>
            <Text style={styles.addressDetail}>{recivedData.phoneNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetailHead}>Address</Text>
            <Text style={styles.addressDetail}>{recivedData.address}</Text>
          </View>
        </View>
        <View style={styles.OrderBtnCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
          {/* <View><</View> */}
          <Text
            style={{
              color: '#fff',
              marginRight: '10%',
              fontSize: 18,
              fontWeight: '700',
            }}>
            ₹ {TotalFoodPrice}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginRight: '10%',
              fontSize: 25,
              fontWeight: '900',
            }}>
            |
          </Text>
          <TouchableOpacity
            onPress={() => {
              PlaceNow();
            }}>
            <Text style={styles.btnTxt}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  screenCont: {flex: 1},
  TopCont: {
    height: windowHeight / 13,
    backgroundColor: '#ffb700',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    // marginTop: 10,
  },
  headerTxt: {
    color: 'green',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  MainCont: {
    justifyContent: 'space-evenly',
    // backgroundColor: 'green',
    height: windowHeight - 100,
    // marginTop: 10,
  },
  OrderCont: {
    height: windowHeight / 2,
    width: windowWidth - 40,
    backgroundColor: '#fff',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressCont: {
    height: windowHeight / 4,
    width: windowWidth - 40,
    backgroundColor: '#fff',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  OrderBtnCont: {
    height: windowHeight / 15,
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    // justifyContent: 'center',
    // marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 10,
  },
  btnTxt: {color: '#ffb700', fontSize: 18, fontWeight: '800', letterSpacing: 2},
  MainContainer: {
    height: '90%',
    width: '98%',
    borderWidth: 1,
    // borderColor: 'green',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 10,
  },
  HoriContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
  },
  VertiContainer: {
    // backgroundColor: 'brown',
    height: '70%',
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ffb700',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    overflow: 'hidden',
  },
  VertiContainer2: {
    // backgroundColor: 'green',
    height: '100%',
    flex: 4,
    paddingHorizontal: 7,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  foodItem: {fontSize: 14, fontWeight: '600', color: '#000'},
  Icone: {
    fontWeight: '600',
    color: '#ffb700',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 30,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  AddressHeading: {color: 'green', alignSelf: 'center', fontSize: 18},
  addressDetail: {color: '#000', fontSize: 15},
  addressDetailHead: {color: '#000', fontSize: 15, fontWeight: 'bold'},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
});
