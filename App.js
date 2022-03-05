import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator} from '@react-navigation/stack';

import Home from './Screens/Home';
import Profile from './Screens/Profile';
import Podcast from './Screens/Podcast';
import Videos from './Screens/Video';
import AddNews from './Screens/AddNews';
import SongsListScreen from './Screens/SongsListScreen';
import SongsPlayScreen from './Screens/SongsPlayScreen';
import Otp from './Screens/Otp';
import FirstUserProfile from './Screens/FirstUserProfile';
import SignIn from './Screens/SignIn';
import EditProfile from './Screens/EditProfileScreen';
import PodcastList from './Screens/PodcastList';
import NewsContent from './Screens/NewsContent';
import VideoContent from './Screens/VideoContent';
import CreatePost from './Screens/CreatePost';

import { DrawerContent } from './Screens/DrawerContent';


const Tab = createBottomTabNavigator();

global.api_key="https://healthyrabbit.in/hnn/public/api/";
global.uri="https://healthyrabbit.in/hnn/public/";
const TabNavi = () =>
{
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Podcast') {
            iconName = focused ? 'mic' : 'mic-outline';
          }

          else if (route.name === 'AddNews') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }

          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          else if (route.name === 'Video') {
            iconName = focused ? 'film' : 'film-outline';
          }
          
          
          else if (route.name === 'CreatePost') {
            iconName = focused ? 'create' : 'create-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff5d23',
        inactiveTintColor: '#000000',
        showLabel:false
      }}

      >
        <Tab.Screen name="Home" component={StackNavi} />
        <Tab.Screen name="Podcast" component={Podcast} />
        <Tab.Screen name="CreatePost" component={CreatePost} />
        <Tab.Screen name="Video" component={Videos} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    )
}

const Stack = createStackNavigator();

class StackNavi extends Component
{
  render()
  {
    return (
        <Stack.Navigator>
           <Stack.Screen options={{headerShown: false}}name="Home" component={Home} />
         
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="About Us"  component={Home} />
          <Stack.Screen name="PrivacyPolicy"  component={Home} />
          <Stack.Screen name="LoginView"  component={Home} />
          <Stack.Screen name="SongsList" component={SongsListScreen} />
          <Stack.Screen  options={{headerShown: false}} name="SongsPlay" component={SongsPlayScreen} />
          <Stack.Screen name="PodcastList" component={PodcastList} />
          <Stack.Screen name="NewsContent" component={NewsContent} />
          <Stack.Screen name="VideoContent" component={VideoContent} />
        </Stack.Navigator>
      )
  }
}


class StackNavi_logout extends Component
{
  render()
  {
    return (
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}}name="SignIn" component={SignIn} />
          <Stack.Screen options={{headerShown: true}}name="Otp" component={Otp} option={{headerShown:false}}/>
          <Stack.Screen options={{headerShown: false}}name="FirstUserProfile" component={FirstUserProfile} />
        </Stack.Navigator>
      )
  }
}

const DrawerNavi = () =>
{
  return (
    <SafeAreaView style={styles.safeArea}>
    <Drawer.Navigator screenOptions={{headerShown:false}} initialRouteName="Home"  drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen options={{headerShown:false,
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'home' : 'home'}></Icon>
        }}  name="Home" component={TabNavi} />

        <Drawer.Screen options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'article' : 'article'}></Icon>
        }}   name="About Us" component={Home} />

        <Drawer.Screen options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'visibility' : 'visibility'}></Icon>
        }}   name="Privacy Policy" component={Home} />

        <Drawer.Screen options={{
            drawerIcon: config => <Icon
                size={23}
                name={Platform.OS === 'android' ? 'share' : 'share'}></Icon>
        }}  name="Invite Friends" component={Home} />

      </Drawer.Navigator>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 safeArea: {
  flex: 2,
  maxHeight:'100%',
  backgroundColor: '#15558d'
 }
})
const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {  
    super(props);  
    this.state = {  
      userToken:"no"
    };  
}
  render()
  {
    try {
       AsyncStorage.getItem('user_login').then((value) =>
      {
          if(value != null)
          {
            // alert(value)
              this.setState({userToken:value});
          }
      })
    } catch(e) {
      // error reading value
    }

    if(this.state.userToken=='yes')
    {
      return (
      
        <NavigationContainer>
        
          <DrawerNavi/>
        </NavigationContainer>
      );
    }
    else{

    } return (
      
        <NavigationContainer>
        
          <StackNavi_logout/>
        </NavigationContainer>
      );
    // alert(this.state.userToken);
    
  };
};



const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    alert("shsks");
    // saving error
  }
}



const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key').then((value) =>
    {
      alert(value);
    })
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}


export default App;
