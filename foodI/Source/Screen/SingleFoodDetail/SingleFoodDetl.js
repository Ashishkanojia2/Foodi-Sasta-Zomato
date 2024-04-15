import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WindowHight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;

const SingleFoodDetl = ({route}) => {
  const FoodData = route.params.item;
  //   console.log('ye mil gaya', route.params.item);
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
            <Text style={styles.txt}>{FoodData.food_Name}</Text>
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
            <Text style={styles.AddItemHeading}>Add Extra Item</Text>
            <Text style={[styles.Additemtxt, {marginTop: 10}]}>
              {FoodData.food_addon}
            </Text>
            <View style={styles.addItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity style={styles.addItemCont}>
                  <Text
                    style={{fontSize: 25, color: '#000', fontWeight: '900'}}>
                    -
                  </Text>
                </TouchableOpacity>
                <TextInput
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
                <TouchableOpacity style={styles.addItemCont}>
                  <Text style={{fontSize: 25, color: '#000'}}>+</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: '5%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={styles.Additemtxt}> X </Text>
                <Text style={styles.Additemtxt}>
                  {FoodData.foodAddon_price}
                </Text>
                <Text style={styles.Additemtxt}> = </Text>
                <Text style={styles.Additemtxt}> total Price </Text>
              </View>
            </View>
            <Text style={[styles.Additemtxt, {marginTop: 10}]}>
              Increase Qty.
            </Text>
            <View style={styles.addItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity style={styles.addItemCont}>
                  <Text
                    style={{fontSize: 25, color: '#000', fontWeight: '900'}}>
                    -
                  </Text>
                </TouchableOpacity>
                <TextInput
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
                <TouchableOpacity style={styles.addItemCont}>
                  <Text style={{fontSize: 25, color: '#000'}}>+</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginLeft: '5%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={styles.Additemtxt}> X </Text>
                <Text style={styles.Additemtxt}>{FoodData.food_Price}</Text>
                <Text style={styles.Additemtxt}> = </Text>
                <Text style={styles.Additemtxt}> total Price </Text>
              </View>
            </View>
            {/*button Container*/}
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntxt}>Add to cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntxt}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn}>
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
  },
  NamePriceCont: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  PriceCont: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFB700',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addItemCont: {
    flexDirection: 'row',
    height: WindowHight / 25,
    backgroundColor: '#FFB700',
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  txt: {color: '#4a4748', fontSize: 25, fontWeight: '700'},
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
  addItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '5%',
  },
});
