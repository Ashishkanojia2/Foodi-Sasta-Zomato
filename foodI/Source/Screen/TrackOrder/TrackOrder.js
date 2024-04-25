import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../HomeComponent/Header';
import BottomNav from '../HomeComponent/BottomNav';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const TrackOrder = ({navigation}) => {
  const [orders, setorders] = useState([]);
  //   const getordersData = async () => {
  //     const orderRef = firestore()
  //       .collection.doc('UserOrders')
  //       .where('orderUserId', '==', auth().currentUser.uid);

  //     try {
  //       const snapshot = await orderRef.get();
  //       const ordersData = snapshot.docs.map(doc => doc.data());
  //       setorders(ordersData);
  //     } catch (error) {
  //       console.error('Error fetching orders: ', error);
  //     }
  //   };
  const getordersData = async () => {
    try {
      const orderRef = firestore()
        .collection('UserOrders')
        .where('orderUserId', '==', auth().currentUser.uid);

      const snapshot = await orderRef.get();
      const ordersData = snapshot.docs.map(doc => doc.data());
      setorders(ordersData);
    } catch (error) {
      console.error('Error fetching orders: ', error);
    }
  };
  useEffect(() => {
    getordersData();
    console.log(orders.orderData);
  }, [setorders]);
  convertDate = date => {
    let newDate = new Date(date.seconds * 1000);

    // Get the date components
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1; // Month is 0-indexed, so we add 1
    let year = newDate.getFullYear();

    // Get the time components
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();

    // Format the date and time strings with leading zeroes if necessary
    let formattedDate = `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year}`;
    let formattedTime = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={styles.MainContainer}>
      <Header navigation={{navigation}} />
      <View style={styles.innerContainer}>
        <ScrollView style={{height: '87%'}}>
          <Text style={styles.Mainheadertxt}>Track Order</Text>
          {orders
            .sort((a, b) => {
              b.orderDate.seconds - a.orderDate.seconds;
            })
            .map((item, index) => {
              return (
                <View style={styles.InnerMainContainer} key={index}>
                  <View style={styles.BoxHeader}>
                    <Text style={styles.headertxt}>Order Detail</Text>
                    <View style={styles.numberContainer}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 25,
                          fontWeight: '500',
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.OrderDetail}>
                    <Text style={styles.ordertxt}>
                      Order id :{item.orderid}
                    </Text>
                    <Text style={styles.ordertxt}>
                      Order Date {convertDate(item.orderDate)}
                    </Text>

                    {item.orderStatus == 'Pending' && (
                      <Text
                        style={{
                          backgroundColor: '#000',
                          color: '#fff',
                          fontWeight: '500',
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}>
                        Your Order is {item.orderStatus}
                      </Text>
                    )}
                    {item.orderStatus == 'On The Way' && (
                      <Text
                        style={{
                          backgroundColor: '#ffb700',
                          color: '#000',
                          fontWeight: '500',
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}>
                        Your Order is {item.orderStatus}
                      </Text>
                    )}
                    {item.orderStatus == 'Cancelled' && (
                      <Text
                        style={{
                          backgroundColor: 'red',
                          color: '#fff',
                          fontWeight: '500',
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}>
                        Your Order is {item.orderStatus}
                      </Text>
                    )}
                    {item.orderStatus == 'Deivered' && (
                      <Text
                        style={{
                          backgroundColor: 'green',
                          color: '#fff',
                          fontWeight: '500',
                          paddingHorizontal: 10,
                          borderRadius: 10,
                        }}>
                        Your Order is {item.orderStatus}
                      </Text>
                    )}

                    <View style={styles.DeliveryBoy}>
                      <Text style={styles.Deliverytxt}>
                        Delivery-Boy Name & PhoneNo.
                      </Text>
                      <Text style={styles.Deliveryboytxt}>
                        {item.deliveryboy_name} : {item.deliveryboy_Phone}
                      </Text>
                    </View>

                    <View style={styles.FoodItemDetails}>
                      <FlatList
                        data={item.orderData}
                        renderItem={({item}) => {
                          return (
                            <View style={styles.innerFoodItemDetails}>
                              <Text style={styles.fooditemtxtCont}>
                                {item.AddFoodQuantity} {item.FoodData.food_Name}
                              </Text>
                              {/* <Text style={styles.fooditemtxtCont}>
                                Yuppi Noodles
                              </Text> */}
                            </View>
                          );
                        }}></FlatList>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        //   alignItems: 'stretch',
                        width: '90%',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{color: '#000'}}>
                        Payment Mode{item.orderPayment}
                      </Text>
                      {/* <Text style={{color: '#000'}}>{item.paymentStatus}</Text> */}
                      <Text style={{color: '#000'}}>
                        Price :{item.orderCost}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  MainContainer: {flex: 1},
  bottomNav: {
    height: windowHeight / 16,
    width: windowWidth,
    backgroundColor: '#FFB700',
    position: 'absolute',
    bottom: 0,
  },
  innerContainer: {},
  InnerMainContainer: {
    backgroundColor: '#f3f3f3',
    height: windowHeight / 2,
    width: windowWidth - 40,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: '5%',
    elevation: 20,
    marginBottom: '5%',
  },
  BoxHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headertxt: {
    fontSize: 25,
    color: '#ffb700',
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: '5%',
    textDecorationLine: 'underline',
  },
  Mainheadertxt: {
    fontSize: 30,
    color: 'green',
    fontWeight: '800',
    alignSelf: 'center',
    marginTop: '5%',
  },
  numberContainer: {
    backgroundColor: '#ffb700',
    height: windowHeight / 28,
    width: windowWidth / 11,
    borderRadius: 50,
    position: 'absolute',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  OrderDetail: {
    // backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  DeliveryBoy: {
    height: windowHeight / 10,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#ffb700',
    justifyContent: 'space-around',
  },
  FoodItemDetails: {
    height: windowHeight / 5,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
    // shadowOpacity: 10,
    shadowColor: '#ffb700',
    // flexDirection: 'row',
    marginBottom: 10,
  },
  innerFoodItemDetails: {
    height: windowHeight / 20,
    width: '95%',
    backgroundColor: 'green',
    borderRadius: 10,
    alignSelf: 'center',
    // elevation: 10,
    // // shadowOpacity: 10,
    // shadowColor: '#ffb700',
    // // flexDirection: 'row',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  ordertxt: {
    color: '#000',
    fontSize: 17,
  },
  Deliverytxt: {
    color: '#ffb700',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '500',
  },
  Deliveryboytxt: {
    color: '#000',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '500',
  },
  fooditemtxtCont: {
    color: '#fff',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: '500',
  },
});
