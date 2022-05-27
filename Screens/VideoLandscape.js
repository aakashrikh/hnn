import React from 'react'
import { Component } from 'react';

import { View,Dimensions, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Button, ScrollView,ActivityIndicator,StatusBar } from 'react-native'
import Orientation from 'react-native-orientation';
import Card from '../Components/videocomp/Card';
import {LivePlayer} from "react-native-dbb-rtmp";
const {width, height} = Dimensions.get('window');
import {Icon } from 'react-native-elements';

class VideoLandscape extends Component {

   constructor(props) {
      super(props)
      this.state = {
         activeIndex: 0,
         play:false,
         mute:false
      }
   }
   
   componentDidMount() {
      StatusBar.setHidden(true);
      // this locks the view to Portrait Mode
      Orientation.lockToLandscape();
   
      // this locks the view to Landscape Mode
      // Orientation.lockToLandscape();
   
      // this unlocks any previous locks to all Orientations
      // Orientation.unlockAllOrientations();
   
      Orientation.addOrientationListener(this._orientationDidChange);
    }
   
    _orientationDidChange = (orientation) => {
   
      if (orientation === 'LANDSCAPE') {
        // do something with landscape layout
      } else {
        // do something with portrait layout
      }
    }
   
    componentWillUnmount() {
      Orientation.getOrientation((err, orientation) => {
        console.log(`Current Device Orientation: ${orientation}`);
      });
   
   
      // Remember to remove listener
      Orientation.removeOrientationListener(this._orientationDidChange);
    }

    
   play = () =>
   {
      if(this.state.play)
      {
         this.setState({play:false})
      }
      else
      {
         this.setState({play:true})
      }
   }
   
   mute = () =>
   {
      if(this.state.mute)
      {
         this.setState({mute:false})
      }
      else
      {
         this.setState({mute:true})
      }
   }
   
   render() {
      return (
         <View>

               <LivePlayer 
               source={{uri:"rtmp://thelegitpro.in/hnnnews/hnnnews"}}
                  ref={(ref) => {
                  this.player = ref
                }}
               
               style={{ height:'100%', width:'100%',marginTop:0 ,}}
               paused={this.state.play}
               muted={this.state.mute}
               bufferTime={300}
                maxBufferTime={1000}
               // resizeMode={"cover"}
               onLoading={()=>{}}
               onLoad={()=>{}}
               onEnd={()=>{}}
               
            />
               {/* <View style={{ marginTop: 10 }}>
               <Category />
                 
               <ScrollView>
               <Card navigation={this.props.navigation} />
               </ScrollView>

               </View> */}
<TouchableOpacity 
               onPress={()=>{this.mute()}}
               style={{position:'absolute',alignSelf:"flex-end",padding:5,marginLeft:15,bottom:10,borderRadius:5}}>
                  <Text style={{color:"#fff",fontWeight:"bold",fontSize:15}}>
                    {(!this.state.mute)?
                        <Icon
                        name='volume-high-outline'
                        type='ionicon' 
                        color='#eeeeee'  size={30}style={{marginRight:15}} /> :

                        <Icon
                        name='volume-mute-outline'
                        type='ionicon' 
                        color='#eeeeee' size={30} style={{marginRight:15}} /> 
                    }
                  </Text>
               </TouchableOpacity>


{/* <TouchableOpacity 
               onPress={()=>{this.play()}}
               style={{position:'absolute',alignSelf:"flex-end",padding:5,alignSelf:'center',top:5,borderRadius:5}}>
                  <Text style={{color:"#fff",fontWeight:"bold",fontSize:15}}>
                    {(!this.state.play)?
                        <Icon
                        name='pause-circle-outline'
                        type='ionicon' 
                        color='#eeeeee'size={40}style={{marginRight:15}} /> :

                        <Icon
                        name='play-circle-outline'
                        type='ionicon' 
                        color='#eeeeee' size={40}style={{marginRight:15}} /> 
                    }
                  </Text>
               </TouchableOpacity> */}



<TouchableOpacity 
               onPress={()=>{this.props.navigation.goBack()}}
               style={{position:'absolute',alignSelf:"flex-end",padding:5,marginLeft:15,marginTop:15,borderRadius:5}}>
                 <Icon
                        name='contract-outline'
                        type='ionicon' 
                        color='#eeeeee' size={25} style={{marginRight:15}} /> 
               </TouchableOpacity>

            </View>


      )
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



    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },





   /*styling for Post button data */

})