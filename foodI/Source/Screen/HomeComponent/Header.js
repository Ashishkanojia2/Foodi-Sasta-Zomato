import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

const Header = ({navigation}) => {
  return (
    <View style={styles.MainContainer}>
      {/* <MaterialIcons name="" size={40} style={styles.HomeFoodIcon} /> */}
      <Text style={styles.headerText}>Foodi</Text>
      <AntDesign name="food-variant" size={60} />
      <TouchableOpacity
        style={styles.HomeFoodIcon}
        onPress={() => {
          navigation.navigation.navigate('UserProfile');
        }}>
        <FontAwesome name="user-circle-o" size={37} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    height: windowHeight / 15,
    backgroundColor: '#FFB700',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {fontSize: 40},
  HomeFoodIcon: {position: 'absolute', right: 10},
});
