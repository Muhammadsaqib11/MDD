
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/Home/Home';
import loginScreen from './Components/Login/Login';
import PairingScreen from './Components/PairingScreen/PairingScreen';
import Dealership from './Components/DealerShip/Dealership';
import ResetPassword from './Components/ForgotPassword/ResetPassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import AssetsScreen from './Components/AssetsScreen/AssetsScreen'
import ProfileScreen from './Components/Profile/ProfileScreen'
import { Provider } from 'react-redux'
import store from './Store'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import config from './config';
Amplify.configure(config);
Auth.configure(config);
console.log(Amplify.Auth);
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#8FC54B" hidden={true} />
        <Stack.Navigator initialRouteName="Login" headerMode='none'>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={loginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="pairingScreen" component={PairingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="dealership" component={Dealership} options={{ headerShown: false }} />
          <Stack.Screen name="forgot" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="reset" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="Assets" component={AssetsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
