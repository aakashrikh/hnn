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
import {Header,Icon} from 'react-native-elements'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//Global Style Import
const styles = require('../Components/Style.js');

const Tabs = createMaterialTopTabNavigator();

class BottomSheetTab extends Component{
  render(){
    return(
      <Tabs.Navigator 
      initialRouteName="Filter"  
      tabBarPosition="top"  
      lazy="true"
      tabBarOptions={
        {
            tabStyle: { marginTop:-10 },
            labelPosition: "below-icon",
            activeTintColor: "#326bf3",
            inactiveTintColor:"#c0c0c0",
            style: {
            backgroundColor: "white",
            // height:55,
        
      },
      
      labelStyle: {
        fontSize:18,
        // fontSize:RFValue(13, 580),
        fontFamily:"Montserrat-Bold"
        // paddingBottom:5,
      },
    }}>
        
      <Tabs.Screen name="Filter" component={Filter} options={{title:"Sort By"}}/>
      <Tabs.Screen name="Sort" component={Sort} options={{title:"Filter"}} />
      
    </Tabs.Navigator>
    
    )
  }
}
export default BottomSheetTab

class Sort extends Component{
    render(){
        return(
            <View style={{backgroundColor:"#fff",flex:1}}>
            <View style={{flexDirection:"row",padding:10}}>
                <View style={{backgroundColor:"#f5f5f5",
                height:40,width:40,justifyContent:"center",borderRadius:50}}>
                <MaterialCommunityIcons name="store" size={25} style={{alignSelf:"center"}} />
                </View>
                <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>Shop Offers</Text>
            </View>

            <View style={{flexDirection:"row",padding:10}}>
                <View style={{backgroundColor:"#f5f5f5",
                height:40,width:40,justifyContent:"center",borderRadius:50}}>
                <MaterialCommunityIcons name="label" size={25} style={{alignSelf:"center"}} />
                </View>
                <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>
                    Product Offers</Text>
            </View>

        </View>
        )
    }
}

class Filter extends Component{
    render(){
        return(
            <View style={{backgroundColor:"#fff",flex:1}}>
                            
            <View style={{flexDirection:"row",padding:10}}>
                <View style={{backgroundColor:"#f5f5f5",
                height:40,width:40,justifyContent:"center",borderRadius:50}}>
            <Icon name="caret-down-outline" type="ionicon" size={25} style={{alignSelf:"center"}} />
                </View>
                <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>Offers <Text style={{fontSize:RFValue(12, 580),}}>(High-to-low) </Text></Text>
            </View>

                <View style={{flexDirection:"row",padding:10}}>
                <View style={{backgroundColor:"#f5f5f5",
                height:40,width:40,justifyContent:"center",borderRadius:50}}>
                <Icon name="caret-up-outline" type="ionicon" size={25} style={{alignSelf:"center"}} />
                </View>
                <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>Offers <Text style={{fontSize:RFValue(12, 580)}}>(Low-to-High) </Text></Text>
            </View>

            <View style={{flexDirection:"row",padding:10}}>
                <View style={{backgroundColor:"#f5f5f5",
                height:40,width:40,justifyContent:"center",borderRadius:50}}>
                <MaterialCommunityIcons name="map-marker" size={25} style={{alignSelf:"center"}} />
                </View>
                <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>
                    Near me</Text>
            </View>

        </View>
        )
    }
}