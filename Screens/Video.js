import React from 'react'
import { Component } from 'react';

import { View,Dimensions, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Button, ScrollView,ActivityIndicator } from 'react-native'
import Orientation from 'react-native-orientation';
import Card from '../Components/videocomp/Card';
import {LivePlayer} from "react-native-dbb-rtmp";
import {VideoPlayer} from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {Icon } from 'react-native-elements';

class Video extends Component {

   constructor(props) {
      super(props)
      this.state = {
         activeIndex: 0,
         play:false,
         mute:false
      }
   }

   componentDidMount()
   {
      Orientation.lockToPortrait();
      this.focusListener=this.props.navigation.addListener('focus',() =>
      {
         this.play();
         this.play();
         Orientation.lockToPortrait();
         Orientation.addOrientationListener(this._orientationDidChange);
      });
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

 change_o = ()=>{
   Orientation.lockToLandscape()
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
         <ImageBackground style={styles.Container}>
            <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text onPress={()=>{this.props.navigation.navigate('hf')}} style={styles.header}>Live Tv <Image style={{width:50,height:30}} source={require('../assets/live.png')}/></Text>
        </View>
               
        {/* <VideoPlayer
    video={{ uri: "rtmp://thelegitpro.in/hnnnews/hnnnews" }}
    videoWidth={1600}
    videoHeight={900}
    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
/> */}


               <LivePlayer 
               source={{uri:"rtmp://thelegitpro.in/hnnnews/hnnnews"}}
                  ref={(ref) => {
                  this.player = ref
                }}
               
               style={{ height:200, width:'98%',marginTop:100,marginLeft:5 ,}}
               paused={this.state.play}
               muted={this.state.mute}
               bufferTime={300}
                maxBufferTime={1000}
               resizeMode={"cover"}
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
<View style={{flexDirection:'row',marginTop:100,alignSelf:'center'}}>

<TouchableOpacity 
               onPress={()=>{this.mute()}}
               style={{alignSelf:"flex-end",padding:5,marginLeft:15,marginTop:-15,borderRadius:5}}>
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


<TouchableOpacity 
               onPress={()=>{this.play()}}
               style={{alignSelf:"flex-end",padding:5,marginLeft:15,borderRadius:5}}>
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
               </TouchableOpacity>
               
            
               <TouchableOpacity 
               onPress={()=>{this.props.navigation.navigate('VideoLandscape')}}
               style={{alignSelf:"flex-end",padding:5,marginLeft:15,marginTop:-15,borderRadius:5}}>
                 <Icon
                        name='expand-outline'
                        type='ionicon' 
                        color='#eeeeee' size={25} style={{marginRight:15}} /> 
               </TouchableOpacity>

</View>

            </View>
         </ImageBackground>

      )
   }
}



export default Video;


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