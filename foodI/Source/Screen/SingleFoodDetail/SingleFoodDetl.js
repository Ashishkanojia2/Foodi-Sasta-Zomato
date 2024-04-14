import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
        <ScrollView style={{height: WindowHight}}>
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
    // borderTopRightRadius: ,
    // borderTopLeftRadius: ,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  detailContainer: {
    height: WindowHight,
    width: WindowWidth,
    // backgroundColor: '#bbd700',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    position: 'absolute',
    // top: 50,
    // paddingTop: 50,
    paddingTop: '60%',
  },
  NamePriceCont: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: '#000',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  PriceCont: {
    flexDirection: 'row',
    // padding: 10,
    // backgroundColor: '#000',
    // marginTop: '5%',
    // justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#FFB700',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  txt: {color: '#4a4748', fontSize: 25},
  txtPrice: {color: '#4a4748', fontSize: 22},
  txtVeg: {color: '#38ae2d', fontSize: 20, fontWeight: '700'},
  txtNonVeg: {color: '#eb3128', fontSize: 20, fontWeight: '700'},
  smallTxt: {color: '#000', fontSize: 20},
  detCont: {paddingHorizontal: 10},
  desctxt: {
    color: '#4a4748',
    fontSize: 17,
    // borderColor: '#ffb700',
    // borderWidth: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: '#000',
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
});
