import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/Login';
import Signup from '../Screen/Signup';
import HomeScreen from '../Screen/HomeComponent/HomeScreen';
import UserLogin from '../Screen/UserLogin';
import UserProfile from '../Screen/UserProfile/UserProfile';
import SingleFoodDetl from '../Screen/SingleFoodDetail/SingleFoodDetl';
import FoodCard from '../Screen/HomeComponent/FoodCard';
import BottomNav from '../Screen/HomeComponent/BottomNav';
import Cart from '../Screen/Cartfolder/Cart';
import PlaceOrder from '../Screen/PlaceOrder/PlaceOrder';
import TrackOrder from '../Screen/TrackOrder/TrackOrder';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="SingleFoodDetl" component={SingleFoodDetl} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="TrackOrder" component={TrackOrder} />
        {/* <Stack.Screen name="FoodCard" component={FoodCard} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
