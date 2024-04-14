import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const windowHeight = Dimensions.get('screen').height;
const windowwidth = Dimensions.get('screen').width;

const FoodCard = ({title, data, navigation}) => {
  const FoodDataRecived = item => {
    console.log({navigation});
    // console.log(item);
    navigation.navigate('SingleFoodDetl', (foodDetail = {item}));
  };

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.Heading}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <View style={styles.FoodContainer}>
            <TouchableOpacity
              style={styles.ImgeCoverContainer}
              key={item.index}
              onPress={() => {
                FoodDataRecived(item);
              }}>
              <Image
                source={{uri: item.food_imageUrl}}
                style={styles.ImgeContainer}
              />
            </TouchableOpacity>

            <Text
              style={{
                color: '#000',
                fontSize: 20,
                alignSelf: 'center',
              }}>
              {item.food_Name}
            </Text>
            <View style={styles.foodDetails}>
              <Text
                style={{
                  color: '#000',
                  //   position: 'absolute',
                  //   left: 10,
                  fontSize: 18,
                  //   backgroundColor: 'green',
                  width: '50%',
                  marginLeft: 10,
                }}>
                Rs.
                {item.food_Price}
              </Text>
              {item.food_type == 'veg' ? (
                <View style={styles.VegBox}></View>
              ) : (
                <View style={styles.NonVegBox}></View>
              )}
            </View>
            <View style={styles.BuyBtn}>
              <Text style={styles.btnTxt}>Buy</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    height: windowHeight / 2.5,
    // backgroundColor: 'pink',
    width: windowwidth,
    marginTop: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  Heading: {color: '#ffb700', fontSize: windowwidth / 15, fontWeight: '900'},
  FoodContainer: {
    // flex: 1,
    height: '90%',
    backgroundColor: '#ececed',
    width: windowwidth / 2,
    marginTop: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 15,
    elevation: 10,
    flexDirection: 'column',
  },
  VegBox: {
    height: windowHeight / 40,
    width: windowwidth / 20,
    backgroundColor: 'green',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
  },
  NonVegBox: {
    height: windowHeight / 40,
    width: windowwidth / 20,
    backgroundColor: 'red',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
  },
  ImgeContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    // backgroundColor: '#000',
  },
  ImgeCoverContainer: {
    height: '60%',
    width: '100%',
    // borderRadius: 10,
    // resizeMode: 'cover',
    // backgroundColor: '#000',
  },
  foodDetails: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    alignItems: 'center',
    marginTop: 10,
  },
  BuyBtn: {
    height: '10%',
    width: '50%',
    backgroundColor: '#ffb700',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  btnTxt: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
  },
});
