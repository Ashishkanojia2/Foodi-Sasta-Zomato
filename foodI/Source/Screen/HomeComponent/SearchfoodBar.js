import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SearchfoodBar = ({data, searchValue}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          if (item.food_Name.includes(searchValue)) {
            return console.log(
              '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
              item.food_Name,
              console.log(
                '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
                searchValue,
              ),
            );
          }
        }}
      />
    </View>
  );
};

export default SearchfoodBar;

const styles = StyleSheet.create({});
