import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const windowHeight = Dimensions.get('screen').height;

const OfferSlider = () => {
  return (
    <View
      style={{
        height: windowHeight / 4.5,
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
      }}>
      <Swiper
        autoplay={true}
        autoplayTimeout={5}
        showsButtons={true}
        activeDotColor="#ffb700">
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: '#000',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Assets/Food1.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center'}}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: '#000',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Assets/Food2.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center'}}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: '#000',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Assets/Food3.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center'}}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: '#000',
            borderRadius: 10,
          }}>
          <Image
            source={require('../../Assets/food4.png')}
            style={{height: '100%', width: '100%', justifyContent: 'center'}}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default OfferSlider;

const styles = StyleSheet.create({});
