import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import Login from '../Screen/Login';
import Signup from '../Screen/Signup';
import HomeScreen from '../Screen/HomeComponent/HomeScreen';
import UserLogin from '../Screen/UserLogin';

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
      </Stack.Navigator>
    </NavigationContainer>

    // <View>
    //   <Text>Hello this is Navigation</Text>
    // </View>
  );
};

export default Navigation;
