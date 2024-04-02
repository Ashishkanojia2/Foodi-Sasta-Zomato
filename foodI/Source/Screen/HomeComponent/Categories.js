import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const WindowHeight = Dimensions.get('screen').height;
const WindowWidth = Dimensions.get('screen').width;

const Categories = () => {
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.CatText}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.CatItemView}>
          <FontAwesome name="hamburger" size={40} color={'#ffb700'} />
          <Text style={styles.CatItemText}>Burger</Text>
        </View>
        <View style={styles.CatItemView}>
          <FontAwesome name="pizza-slice" size={40} color={'#ffb700'} />
          <Text style={styles.CatItemText}>Pizza</Text>
        </View>
        <View style={styles.CatItemView}>
          <MaterialCommunityIcons name="noodles" size={40} color={'#ffb700'} />
          <Text style={styles.CatItemText}>Burger</Text>
        </View>
        <View style={styles.CatItemView}>
          <FontAwesome6 name="bowl-food" size={40} color={'#ffb700'} />
          <Text style={styles.CatItemText}>BowlFood</Text>
        </View>
        <View style={styles.CatItemView}>
          <MaterialCommunityIcons
            name="food-drumstick"
            size={40}
            color={'#ffb700'}
          />
          <Text style={styles.CatItemText}>Chicken</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    elevation: 10,
    height: WindowHeight / 7,
    width: WindowWidth - 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  CatText: {fontSize: 20, color: '#000', textDecorationLine: 'underline'},
  CatItemText: {fontSize: 20, color: '#000'},
  CatItemView: {
    elevation: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: '60%',
    width: WindowWidth / 3,
    flexDirection: 'row',
    // padding: '10',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
});
