import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Favorites from '../Screens/Favorites';
import Shops from '../Screens/Shops';
import {
    View,ImageBackground,
    StyleSheet,Pressable,
    Image,Text,Dimensions
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Tabs = createMaterialTopTabNavigator();

class TopTab extends Component{
  render(){
    return(
      <Tabs.Navigator 
      initialRouteName="Fav"  
      tabBarPosition="top"  
      lazy="true"
      tabBarOptions={
        {
        labelPosition: "below-icon",
        activeTintColor: "#326bf3",
        inactiveTintColor:"#c0c0c0",
        style: {
        backgroundColor: "white",
        // height:55,
        
      },
      
      labelStyle: {
        // fontSize:18,
        fontSize:RFValue(12, 580),
        fontFamily:"Montserrat-Bold"
        // paddingBottom:5,
      },
    }}>
      <Tabs.Screen name="Fav" component={Favorites} options={{title:"Products"}} />
      <Tabs.Screen name="Shop" component={Shops} options={{title:"Shops"}}/>
      
    </Tabs.Navigator>
    
    )
  }
}
export default TopTab
