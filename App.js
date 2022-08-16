import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image, ActivityIndicator,Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {   createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator} from '@react-navigation/stack';
// import { DrawerContent } from './Screens/DrawerContent';


//Screen Imports
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
import Splash from './Screens/Splash';
import {AuthContext} from './AuthContextProvider';
import Comments from './Screens/Comments';
import VideoLandscape from './Screens/VideoLandscape';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import linking from './src/linking';
import Search from './Screens/Search';
import NewsContentSearch
 from './Screens/NewsContentSearch';
//Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


//links
global.api_key="https://healthyrabbit.in/hnn/public/api/";
global.uri="https://healthyrabbit.in/hnn/public/";

global.image_url="https://hnn24x7.com/wp-content/uploads/";
global.login_data=true;

global.token=null;

//tab navigation
class TabNav extends Component
{
  render(){
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
          
          
          else if (route.name === 'LiveTv') {
            iconName = focused ? 'tv' : 'tv-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ff5d23',
        inactiveTintColor: '#fff',
        showLabel:true,
        style: {
          backgroundColor: '#000',//color you want to change
        }
      }}

      >
        <Tab.Screen name="Home" component={StackNav} />
        {/* <Tab.Screen name="Podcast" component={Podcast} /> */}
        <Tab.Screen name="Video" component={CreatePost} />
        <Tab.Screen name="LiveTv" component={Videos} />
        
      
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    )
  }
}

//StackNav
class StackNav extends Component
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
          <Stack.Screen name="SongsPlay" component={SongsPlayScreen} options={{headerShown: false}}/>
          <Stack.Screen name="PodcastList" component={PodcastList} />
          <Stack.Screen name="NewsContent" component={NewsContent} />
          <Stack.Screen name="VideoContent" component={VideoContent} />
          
        </Stack.Navigator>
      )
  }
}


class DrawerContent extends Component 
{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      cat_data:false,
      data:[],  
      isLoading: true,
      points:0,
      level:0,
      contact:"",
      email:""
    };
  }

  componentDidMount ()
  {
   
    
    fetch('https://hnn24x7.com/wp-json/wp/v2/categories?page=1')
    .then((response) => response.json())
    .then((json) => {
      this.setState({ data: json });

      fetch('https://hnn24x7.com/wp-json/wp/v2/categories?page=2')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: [...this.state.data, ...json]  });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });

      
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });


   

    if(global.token != null )
    {
      this.get_profile_data();
    }


    
    if(global.token != null )
    {
      this.get_profile_data();
    }
    

  }


  get_profile_data = () =>{

    fetch(global.api_key+"get_user_profile", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization':global.token 
        }
        }).then((response) => response.json())
        .then((json) => {
            console.warn(json)
           if(!json.status){
              // Toast.show(json.msg)
           }
            else
            {
             
                this.setState({name:json.data.name})
                this.setState({points:json.data.points})
                this.setState({level:json.data.level})
                this.setState({email:json.data.email})
                this.setState({contact:json.data.contact})
                // if(json.data.dob==null){
                // this.setState({chosenDate:this.state.chosenDate})
                // }
                // else{
                //     this.setState({chosenDate:json.data.dob})
                // }
            }
        })
        .catch((error) => console.error(error))
        .finally(() => {
        });
}

  render()
  {

    
    const { data, isLoading } = this.state;
    
    if(isLoading)
    {
      return(
        <View>
        <ActivityIndicator size="large" color="orange" />
        </View>
      )
    }
    else{
      let news_cat = data.map((news,id) => {
        
            return(
              <View style={{padding:10,borderBottomWidth:1,borderBottomColor:'#ececec'}}>
        <TouchableOpacity   onPress={() => Linking.openURL('hnn://main/'+news.id)} style={styles.border1}>
              <Text style={{ color: '#000', fontSize: 14, }}>{news.name}</Text>
            </TouchableOpacity >
      </View>
            )
          
        
      })
      
    return(
      <View style={{flex:1}}>
        <View style={{height:200,backgroundColor:'#ec3005',borderRadiusBottomRight:20}}>
        {global.token == null ?
          <View style={{width:'100%'}}>
              <View style={{width:'100%'}}>

              <Image source={require('./img/bas1.jpg')}
                            style={{
                                width: 80, height: 80, borderRadius: 100, marginTop: 50, alignSelf:"center"
                            }} />


              </View>

              <View style={{ marginTop: 5,marginBottom:20 }} >
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize:18,alignSelf:"center" }}>Welcome HNN 24*7</Text>
                    </View>

          </View>:

           <View style={{width:'100%'}}>
              <View style={{width:'100%'}}>

              <Image source={require('./img/bas1.jpg')}
                            style={{
                                width: 80, height: 80, borderRadius: 100, marginTop: 50, alignSelf:"center"
                            }} />


              </View>

              <View style={{ marginTop: 5,marginBottom:20 }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize:18,alignSelf:"center" }}>{this.state.name}</Text>
                        <Text style={{ color: 'white', fontSize: 14,alignSelf:"center" }}>{this.state.contact}</Text>
                    </View>

          </View>
      
    }
        </View>
                    <ScrollView>
        {news_cat}
    </ScrollView>
      </View>
    )
                          }
  }
}


class DrawerNav extends Component{
  render(){
    return (
      <SafeAreaView style={styles.safeArea}>
        
      <Drawer.Navigator screenOptions={{headerShown:false}} initialRouteName="Home"  drawerContent={props => <DrawerContent {...props} />}
      >
      <Drawer.Screen options={{headerShown:false,
              drawerIcon: config => <Icon
                  size={23}
                  name={Platform.OS === 'android' ? 'home' : 'home'}></Icon>
          }}  name="Home" component={TabNav} />
  
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
}


const styles = StyleSheet.create({
 safeArea: {
  flex: 2,
  maxHeight:'100%',
  backgroundColor: '#15558d'
 }
})


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      islogin: false,
      step: 'done'
    }
  }

  componentDidMount() {
    console.log(this.state.islogin)
    AsyncStorage.getItem('@auth_login', (err, result) => {
      // console.warn(result)
      if (JSON.parse(result) != null) {
        this.setState({ islogin: true, step: JSON.parse(result).use_type });
        global.token = JSON.parse(result).token;
        global.user = JSON.parse(result).user_id;
        global.step = this.state.step

      }
    });
    setTimeout(() => {
      this.setState({ isloading: false })
    }, 1000);
    }

    login = (step) => {
      this.setState({ islogin: true, step: step });
    }

    logout = () => {
      // this.props.navigation.navigate('SignIn');
      this.setState({ islogin: false })

      AsyncStorage.setItem('@auth_login', '');
      global.token=null;
      // this.props.navigation.navigate('SignIn');
    }


    render() {
      if (this.state.isloading) {
        return (
          <Splash />
        )
      }
      else {
        return (
         
          <AuthContext.Provider value={{ login: this.login, logout: this.logout }}>
            <NavigationContainer linking={linking}>
              <Stack.Navigator >
                {!this.state.islogin ? (
                  <>
                    <Stack.Screen options={{headerShown: false}}name="SignIn" component={SignIn} />
                    <Stack.Screen options={{headerShown: false}} name="Otp" component={Otp}/>

                    {/* <Stack.Screen options={{headerShown: false}} name="Home" component={Home} /> */}

                        {/* <Stack.Screen name="Drawer" component={DrawerNav} options={{headerShown: false}}/> */}

                        <Stack.Screen name="Home" component={DrawerNav} options={{headerShown: false}}/>

                        <Stack.Screen name="Profile" component={Profile} />

                        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>

                        {/* <Stack.Screen name="About Us"  component={Home} />

                        <Stack.Screen name="PrivacyPolicy"  component={Home} />

                        <Stack.Screen name="LoginView"  component={Home} /> */}

                        <Stack.Screen name="SongsList" component={SongsListScreen} />

                        <Stack.Screen name="SongsPlay" component={SongsPlayScreen} options={{headerShown: false}}/>
                        
                        <Stack.Screen name="PodcastList" component={PodcastList} />

                        <Stack.Screen name="NewsContent" component={NewsContent} />

                        <Stack.Screen name="VideoContent" component={VideoContent} />

                        <Stack.Screen name="Comments" component={Comments} options={{headerShown: false}}/>

                        
                  </>
                )
                  :
                  (
                    (this.state.islogin && this.state.step == 'steps') ?
                      <>
                        <Stack.Screen options={{headerShown: false}}name="FirstUserProfile" component={FirstUserProfile} />
                      </>
                      :
                      // User is signed in  
                      <>
                      
                        {/* <Stack.Screen options={{headerShown: false}} name="Home" component={Home} /> */}

                        {/* <Stack.Screen name="Drawer" component={DrawerNav} options={{headerShown: false}}/> */}
                     
                        <Stack.Screen name="Home" component={DrawerNav} options={{headerShown: false}}/>

                        <Stack.Screen name="Profile" component={Profile} />

                        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />

                        {/* <Stack.Screen name="About Us"  component={Home} />

                        <Stack.Screen name="PrivacyPolicy"  component={Home} />

                        <Stack.Screen name="LoginView"  component={Home} /> */}

                        <Stack.Screen name="SongsList" component={SongsListScreen} />

                        <Stack.Screen name="SongsPlay" component={SongsPlayScreen} options={{headerShown: false}}/>
                        
                        <Stack.Screen name="PodcastList" component={PodcastList} />

                        <Stack.Screen name="NewsContent" component={NewsContent} />

                        <Stack.Screen name="VideoContent" component={VideoContent} />

                        <Stack.Screen name="Comments" component={Comments} options={{headerShown: false}}/>

                        <Stack.Screen name='Search' component={Search}  options={{headerShown: false}}/>

                        <Stack.Screen name="NewsContentSearch" component={NewsContentSearch} />

                        <Stack.Screen name="VideoLandscape" component={VideoLandscape} options={{headerShown: false
                        }}/>


                        
                      </>
                  )
                }
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        )
      }
    }

    


  // render()
  // {
  //   try {
  //      AsyncStorage.getItem('user_login').then((value) =>
  //     {
  //         if(value != null)
  //         {
  //           // alert(value)
  //             this.setState({userToken:value});
  //         }
  //     })
  //   } catch(e) {
  //     // error reading value
  //   }

  //   if(this.state.userToken=='yes')
  //   {
  //     return (
      
  //       <NavigationContainer>
        
  //         <DrawerNavi/>
  //       </NavigationContainer>
  //     );
  //   }
  //   else{

  //   } return (
      
  //       <NavigationContainer>
        
  //         <StackNav_logout/>
  //       </NavigationContainer>
  //     );
  //   // alert(this.state.userToken);
    
  // };
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
