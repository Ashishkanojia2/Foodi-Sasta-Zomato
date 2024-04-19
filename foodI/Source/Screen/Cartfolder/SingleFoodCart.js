import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const SingleFoodCart = ({navigation, docData}) => {
  console.log('====================================');
  console.log('this is i want ', docData);

  // const name = JSON.parse(data).cart
  // console.log("this is what i'm saying", docData.);

  console.log('====================================');
  return (
    <View>
      {/* <Text>SingleFoodCart</Text> */}
      <FlatList
        data={docData?.cart || []}
        renderItem={({item}) => (
          // <Text>{item.FoodData.food_Name}</Text>
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
                <Image
                  source={{uri: item.FoodData.food_imageUrl}}
                  style={{
                    height: windowHeight / 8,
                    width: '100%',
                    resizeMode: 'stretch',
                  }}
                />
                <Text style={{fontSize: 20}}>Image</Text>
              </View>
              <View style={styles.VertiContainer2}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.foodItem}>{item.FoodData.food_Name}</Text>
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
                  <Text style={styles.foodItem}>Extra Gravy</Text>
                  <Text style={styles.foodItem}>
                    {item.FoodData.foodAddon_price}
                  </Text>
                </View>
                <Text style={styles.foodItem}>Qty : {item.AddonQuantity}</Text>
                <View style={styles.iconContainer}>
                  {/* <Text>Remove your Food</Text> */}
                  <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    style={styles.Icone}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SingleFoodCart;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight / 7,
    width: windowWidth - 20,
    borderWidth: 2,
    // borderColor: 'green',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
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
});
