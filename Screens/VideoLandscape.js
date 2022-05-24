import React from 'react'
import { Component } from 'react';

import { View,Dimensions, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Button, ScrollView,ActivityIndicator } from 'react-native'

import Card from '../Components/videocomp/Card';
import {LivePlayer} from "react-native-dbb-rtmp";
import Orientation from 'react-native-orientation';
const {width, height} = Dimensions.get('window');
class VideoLandscape extends Component {

   constructor(props) {
      super(props)
      this.state = {
         activeIndex: 0
      }
   }
   
   render() {
      return (
         <View style={[styles.Container,{
            
            }]}>
            <View>
         
               
               <LivePlayer 
               source={{uri:"rtmp://thelegitpro.in/hnnnews/hnnnews"}}
                  ref={(ref) => {
                  this.player = ref
                }}
               style={{ height:Dimensions.get('window').height, width:Dimensions.get('window').width}}
               paused={false}
               muted={true}
               bufferTime={300}
                maxBufferTime={1000}
               resizeMode={"cover"}
               onLoading={()=>{}}
               onLoad={()=>{}}
               onEnd={()=>{}}
            />
            </View>
         </View>

      )
   }
}


class Category extends Component
{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { cat_data:false,data:[],  isLoading: true };
  }

  componentDidMount()
  {
    fetch(global.api_key+'news_cat')
    .then((response) => response.json())
    .then((json) => {
      
      this.setState({ data: json });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }

  category_update = () =>
  {
    console.warn("hskhs");
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
          <TouchableOpacity onPress={()=>{this.category_update}} style={styles.border1}>
          <Text style={{ color: 'white', fontSize: 15, alignSelf: "center", marginTop: 6 }}>{news.n_c_categories}</Text>
        </TouchableOpacity >
        )
      })
     
      return (
        <View>
          <ScrollView
        horizontal={true} 
      >
        <TouchableOpacity onPress={()=>{this.category_update}} style={styles.border1}>
          <Text style={{ color: 'white', fontSize: 15, alignSelf: "center", marginTop: 6 }}>All</Text>
        </TouchableOpacity>
          {news_cat}
            </ScrollView>
            </View>
      );
      }

  }
}



export default VideoLandscape;

const styles = StyleSheet.create({
   header: {
      color: '#ffffff',
      fontSize: height / 25,
   
      paddingTop: height / 20,
      paddingLeft: width / 25,
      fontWeight: 'bold',
    },
   Container:
   {

      flex: 1,
      // Set hex color code here.
      backgroundColor: 'black',

   },
   title: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      
   },

   videos: {
      height: 100
   },
   button: {
      backgroundColor: 'black',
      height: 35,
      marginTop: 30,

      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: 370,
      marginLeft: 55,


      borderWidth: 1,
      borderColor: 'white',

   },


   text: {
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 17,


   },
   text1: {
      color: 'white'
   },

   tex: {
      color: 'white',
      fontSize: 18

   },

   tex1: {
      color: 'white',
      fontSize: 18

   },

   text3: {
      color: 'white',
      alignSelf: 'center',
      marginTop: 8
   },



   terms: {
      borderWidth: 2,
      borderColor: 'red',
      width: 90,
      height: 40,



   },
   border1: {
      color: "white",
      borderWidth: 1,
      borderColor: "white",
      height: 35,
      width: 130,
      borderRadius: 20,
      marginLeft: 15,
      marginBottom: 10,
      marginTop: 5
  
  
    },









   /*styling for Post button data */

})