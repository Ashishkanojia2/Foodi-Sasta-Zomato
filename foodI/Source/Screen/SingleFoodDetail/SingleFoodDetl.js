import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const WindowHight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;

const SingleFoodDetl = ({route}) => {
  const [addonQty, setaddonQty] = useState('0');
  const [foodQty, setfoodQty] = useState('1');
  const [firstPrice, setfirstPrice] = useState('');
  const [totalfoodQty, settotalfoodQty] = useState('0');
  const FoodData = route.params.item;
  // THIS IS FOR INCREASE THE QUANTITY OF FOOD ITEM
  const IncrementQty = () => {
    setfoodQty((parseInt(foodQty) + 1).toString());
  };
  const DecrementQty = () => {
    if (parseInt(foodQty) > 1) {
      setfoodQty((parseInt(foodQty) - 1).toString());
    }
  }; // THIS IS FOR INCREASE EXTRA FOOD ITEM
  const IncrementExtraQty = () => {
    setaddonQty((parseInt(addonQty) + 1).toString());
    console.log('firstextraPrice', firstPrice);
  };
  const DecrementExtraQty = () => {
    if (parseInt(addonQty) > 0) {
      setaddonQty((parseInt(addonQty) - 1).toString());
    }
  };
  const updateTotalQty = () => {
    const foodQtyValue = parseInt(foodQty) * parseInt(FoodData.food_Price);
    const addonQtyValue =
      FoodData.food_addon !== ''
        ? parseInt(addonQty) * parseInt(FoodData.foodAddon_price)
        : 0;
    const totalQty = foodQtyValue + addonQtyValue;
    settotalfoodQty(totalQty.toString());
  };

  useEffect(() => {
    updateTotalQty();
  }, [foodQty, addonQty]);
  // setfirstPrice(
  //   (parseInt(FoodData.foodAddon_price) * parseInt(addonQty)).toString(),
  // );
  const addtocartfun = () => {
    console.log('addtocart', foodQty, addonQty);

    const colRef = firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);
    const whatDatasend = {
      FoodData,
      AddFoodQuantity: foodQty,
      AddonQuantity: addonQty,
    };
    // console.log(whatDatasend);
    colRef.get().then(dataRecived => {
      if (dataRecived.exists) {
        colRef.update({cart: firestore.FieldValue.arrayUnion(whatDatasend)});
        Alert.alert('One More food is Added on Cart');
      } else {
        colRef.set({
          cart: [whatDatasend],
        });
        Alert.alert('Food is Add on Cart');
      }
    });
  };

  return (
    <View>
      <Image
        source={{uri: FoodData.food_imageUrl}}
        style={styles.ImgContainer}
      />

      <View style={styles.detailContainer}>
        <ScrollView
          style={{height: WindowHight}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.NamePriceCont}>
            <Text style={[styles.txt, {width: WindowWidth / 1.5}]}>
              {FoodData.food_Name}
            </Text>
            <View style={styles.PriceCont}>
              <Text style={styles.smallTxt}>price </Text>
              <Text style={styles.txtPrice}>{FoodData.food_Price}</Text>
              <Text style={styles.smallTxt}> rs </Text>
            </View>
          </View>
          <View style={styles.detCont}>
            {FoodData.food_type == 'veg' ? (
              <Text style={styles.txtVeg}>Pure-Veg</Text>
            ) : (
              <Text style={styles.txtNonVeg}>Non-Veg</Text>
            )}
            <Text style={styles.desctxt}>{FoodData.food_description}</Text>
            <Text style={styles.LocationHeading}> Restaurant Name :</Text>
            <Text style={styles.Locationtxt}>{FoodData.restaurant_name}</Text>
            <Text style={styles.LocationHeading}> Restaurant Location :</Text>
            <Text style={styles.Locationtxt}>
              {FoodData.restaurant_address_building}, {}
              {FoodData.restaurant_address_street}, {}
              {FoodData.restaurant_address_city}, {}
              {FoodData.restaurant_address_pincode}
            </Text>
            {/* 
            
            
            EXTRA QTY 
            
            
            */}
            <Text style={styles.AddItemHeading}>Add Extra Item</Text>
            {FoodData.food_addon != '' && (
              <>
                <Text style={[styles.Additemtxt, {marginTop: 10}]}>
                  {FoodData.food_addon}
                </Text>
                <View style={styles.addItem}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.addItemCont}
                      onPress={() => {
                        DecrementExtraQty();
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          color: '#000',
                          fontWeight: '900',
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      value={addonQty}
                      //   onChangeText={setaddonQty('1')}
                      style={{
                        borderRadius: 5,
                        borderColor: '#c9c9c9',
                        borderWidth: 3,
                        height: '10%',
                        width: WindowHight / 20,
                        marginHorizontal: 2,

                        color: '#000',
                        paddingTop: 3,
                      }}
                      keyboardType="decimal-pad"></TextInput>
                    <TouchableOpacity
                      style={styles.addItemCont}
                      onPress={() => {
                        IncrementExtraQty();
                      }}>
                      <Text style={{fontSize: 25, color: '#000'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginLeft: '5%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.P1}> X </Text>
                    <Text style={styles.P1}>{FoodData.foodAddon_price}</Text>
                    <Text style={styles.P1}> = </Text>
                    {addonQty == '0' ? (
                      <>
                        <Text style={styles.P2}>0</Text>
                      </>
                    ) : (
                      <Text style={styles.P2}>
                        {(
                          parseInt(FoodData.foodAddon_price) *
                          parseInt(addonQty)
                        ).toString()}
                      </Text>
                    )}
                    {/* <Text style={styles.Additemtxt}> total Price 1 </Text> */}
                  </View>
                </View>
              </>
            )}
            {/*
            
            Food QTY 
            
            
            */}
            <Text style={[styles.Additemtxt, {marginTop: 10}]}>
              Increase Qty.
            </Text>
            <View style={styles.addItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={styles.addItemCont}
                  onPress={() => {
                    DecrementQty();
                  }}>
                  <Text
                    style={{fontSize: 25, color: '#000', fontWeight: '900'}}>
                    -
                  </Text>
                </TouchableOpacity>
                <TextInput
                  value={foodQty}
                  style={{
                    borderRadius: 5,
                    borderColor: '#c9c9c9',
                    borderWidth: 3,
                    height: '10%',
                    width: WindowHight / 20,
                    marginHorizontal: 2,
                    color: '#000',
                    paddingTop: 3,
                  }}></TextInput>
                <TouchableOpacity
                  style={styles.addItemCont}
                  onPress={() => {
                    IncrementQty();
                  }}>
                  <Text style={{fontSize: 25, color: '#000'}}>+</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: '5%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.P1}> X </Text>
                <Text style={styles.P1}>{FoodData.food_Price}</Text>
                <Text style={styles.P1}> = </Text>
                {foodQty == '1' ? (
                  <>
                    <Text style={styles.P2}>{FoodData.food_Price}</Text>
                  </>
                ) : (
                  <Text style={styles.P2}>
                    {(
                      parseInt(FoodData.food_Price) * parseInt(foodQty)
                    ).toString()}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.bottomLine}></View>
            {/*
            
            
            Total Food Price
            
            
            */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: '7%',
              }}>
              <Text style={styles.P3}>Total Price - </Text>
              <Text style={styles.P2}>{totalfoodQty} </Text>
            </View>

            {/*button Container*/}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  addtocartfun();
                }}>
                <Text style={styles.btntxt}>Add to cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntxt}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SingleFoodDetl;

const styles = StyleSheet.create({
  ImgContainer: {
    height: WindowHight / 3.5,
    width: WindowWidth,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  detailContainer: {
    height: WindowHight,
    width: WindowWidth,
    position: 'absolute',
    paddingTop: '60%',
    paddingBottom: '6%',
  },
  NamePriceCont: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '5%',
    justifyContent: 'space-around',
  },
  PriceCont: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFB700',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: '100%',
    // marginRight: '5%',
  },
  addItemCont: {
    flexDirection: 'row',
    height: WindowHight / 25,
    backgroundColor: '#FFB700',
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  txt: {color: '#4a4748', fontSize: 23, fontWeight: '700'},
  txtPrice: {color: '#4a4748', fontSize: 22},
  txtVeg: {color: '#38ae2d', fontSize: 20, fontWeight: '700'},
  txtNonVeg: {color: '#eb3128', fontSize: 20, fontWeight: '700'},
  smallTxt: {color: '#000', fontSize: 20},
  detCont: {paddingHorizontal: 10},
  desctxt: {
    color: '#4a4748',
    fontSize: 17,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: WindowHight / 13,
    alignItems: 'center',
    marginTop: '10%',
  },
  btn: {
    backgroundColor: '#ffb700',
    paddingHorizontal: 20,
    height: '70%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btntxt: {color: '#4a4748', fontSize: 18},
  LocationHeading: {
    fontSize: 20,
    color: '#4a4748',
    marginTop: 10,
    fontWeight: '500',
    alignSelf: 'center',
  },
  Locationtxt: {
    color: '#4a4748',
    fontSize: 15,
    alignSelf: 'center',
    letterSpacing: 2,
  },
  AddItemHeading: {
    fontSize: 20,
    color: '#4a4748',
    marginTop: 10,
    fontWeight: '500',
  },
  Additemtxt: {
    color: '#4a4748',
    fontSize: 15,
    letterSpacing: 2,
  },
  P1: {
    color: '#4a4748',
    fontSize: 20,
    letterSpacing: 2,
  },
  P3: {
    color: '#ffb700',
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: '800',
  },
  P2: {
    color: '#4a4748',
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: '500',

    marginLeft: '3%',
  },
  addItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '5%',
  },
  bottomLine: {
    borderWidth: 1,
    borderColor: '#bebfbe',
    width: WindowWidth / 2,
    marginLeft: WindowWidth / 2,
  },
});
