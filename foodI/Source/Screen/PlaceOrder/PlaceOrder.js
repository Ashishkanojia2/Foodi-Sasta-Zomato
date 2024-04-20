import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const PlaceOrder = ({route}) => {
  const [data, setdata] = useState(null);

  const dataRecived = route.params.docData.cart;
  // setdata(dataRecived);

  console.log('====================================');
  console.log(dataRecived);
  console.log('====================================');

  return (
    <View style={styles.screenCont}>
      <View style={styles.TopCont}>
        <Text style={styles.headerTxt}> Your Order Summery</Text>
      </View>
      <View style={styles.MainCont}>
        <View style={styles.OrderCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
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
                Total Price : 1000
              </Text>
              <View style={styles.VertiContainer}>
                {/* <Image
                  source={{uri: item.FoodData.food_imageUrl}}
                  style={{
                    height: windowHeight / 8,
                    width: '100%',
                    resizeMode: 'stretch',
                  }}
                /> */}
                <Text style={{fontSize: 20}}>Image</Text>
              </View>
              <View style={styles.VertiContainer2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.foodItem}>Price</Text>
                  <Text style={styles.foodItem}>Price</Text>
                </View>

                <Text style={styles.foodItem}>Price</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.foodItem}>Price</Text>
                  <Text style={styles.foodItem}>Price</Text>
                </View>
                <Text style={styles.foodItem}>Extra Qty :</Text>
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.addressCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
          <Text style={styles.AddressHeading}>Your details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetail}>Name</Text>
            <Text style={styles.addressDetail}>Ashish Kanojia</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetail}>Email</Text>
            <Text style={styles.addressDetail}>Ashish Kanojia</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetail}>Phone No.</Text>
            <Text style={styles.addressDetail}>Ashish Kanojia</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.addressDetail}>Address</Text>
            <Text style={styles.addressDetail}>Ashish Kanojia</Text>
          </View>
        </View>
        <View style={styles.OrderBtnCont}>
          {/* <Text style={styles.}> Your Order Summery</Text> */}
          <TouchableOpacity>
            <Text style={styles.btnTxt}>Placeorder</Text>
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
    justifyContent: 'center',
    // marginBottom: 20,
    borderRadius: 10,
    elevation: 10,
  },
  btnTxt: {color: '#ffb700', fontSize: 18, fontWeight: '800', letterSpacing: 2},
  MainContainer: {
    height: '30%',
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
  foodItem: {fontSize: 17, fontWeight: '600', color: '#000'},
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
});
