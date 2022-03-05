import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,Dimensions,ActivityIndicator,
  ScrollView
} from 'react-native';

import { Image,Chip,Tab ,Text,Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const win = Dimensions.get('window');
import { WebView } from 'react-native-webview';
const ratio = win.width/541; //541 is actual image width

class NewsContent extends Component
{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { counter: 0,liked:false,data:[],  isLoading: true};
  }

hideSpinner() {
    this.setState({ visible: false });
  }

  ActivityIndicatorLoadingView() {
    
    return (
 
      <ActivityIndicator
        color='#009688'
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

    render()
    {
      var id=global.uri+"news-content/"+this.props.route.params.itemId;
  
      // this.props.navigation.openDrawer();
        return(
          
            <WebView 
            source={{ uri: id }}
             style={{ flex: 1 }} 
             javaScriptEnabled={true}
         domStorageEnabled={true}
         renderLoading={this.ActivityIndicatorLoadingView} 
         startInLoadingState={true} 
             />
            
      )
    }
}

export default NewsContent;

const styles = StyleSheet.create({
  Container:
  {
     flex: 1,
     // Set hex color code here.
     backgroundColor: 'black',

  },
  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  
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
  card: {
    marginTop: 10,
    backgroundColor:'#ffffff',
    padding:10
  },

  FeedImage: {
    width:'100%',
    height:250,
    resizeMode: "contain",
    borderRadius:5
  },

  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }

});

