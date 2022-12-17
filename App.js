import { StatusBar } from 'expo-status-bar';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/UserProfileScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import SearchScreen from "./screens/SearchScreen";

const Stack = createStackNavigator();

const theme = {
    colors: {
        primary: '#37B34A'
    }
};

const globalScreenOptions = {
    headerStyle: { backgroundColor: '#37B34A' },
    headerTitleStyle: { color: "white" },
    headerTintColor: "white"
};

export default function App() {
  return (
      <ThemeProvider theme={theme}>
          <NavigationContainer>
              <Stack.Navigator screenOptions={globalScreenOptions}>
                  <Stack.Screen options={{title: "Login"}} name="Login" component={LoginScreen}/>
                  <Stack.Screen options={{title: "Register"}} name="Register" component={RegisterScreen}/>
                  <Stack.Screen options={{title: "Home"}} name="Home" component={HomeScreen}/>
                  <Stack.Screen options={{title: "Add Chat"}} name="AddChat" component={AddChatScreen}/>
                  <Stack.Screen options={{title: "Chat"}} name="Chat" component={ChatScreen}/>
                  <Stack.Screen options={{title: "UserProfile"}} name="UserProfile" component={UserProfileScreen}/>
                  <Stack.Screen options={{title: "SearchScreen"}} name="SearchScreen" component={SearchScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
      </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
