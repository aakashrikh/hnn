import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,Dimensions,ActivityIndicator,Pressable,
  ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Image,Chip,Tab ,Text,Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const win = Dimensions.get('window');
import { WebView } from 'react-native-webview';
import moment from'moment';
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
      const {item}=this.props.route.params;
      // this.props.navigation.openDrawer();
        return(
          <ScrollView style={styles.card}>
                
              <View>
             
                <Text h4 style={{marginTop:10,fontSize:16}} onPress={()=>{this.props.navigation.navigate('NewsContent',{
                  item: item })}}>{item.title.rendered}
                  </Text>
 <Text style={{marginLeft:0}}>{moment(item.modified_gmt).fromNow()}</Text>
<View style={{marginTop:10}}>
<HTMLView
        value={item.excerpt.rendered}
        stylesheet={{marginTop:50}}
      />
</View>
  
              </View>
            
              <Image 
                style={styles.FeedImage} 
                source= {{uri: item.yoast_head_json.twitter_image}}
              PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}
             />

<HTMLView
        value={item.content.rendered}
        stylesheet={styles}
      />
           <View style={{marginBottom:50}}></View> 
            {/* <View style={{flex:1,flexDirection:'row',marginTop:10}}> */}

            {/* <LikeDislike feed_id={news.id} like_count={80} islike={true}/> */}
            {/* <Pressable onPress={this.like_dislike_news}>
            <Icon
              name={this.state.liked ? "heart" : "heart-outline"}
              size={28}
              type='ionicon'
              color={this.state.liked ? "red" : "black"}

              style={{flex:1,flexDirection:'row',marginRight:15,marginLeft:15}}
            />
        </Pressable> */}


        {/* <Pressable onPress={()=>{this.props.navigation.navigate('Comments',{itemId:news.id,description:news.short_description})}}>
              <Icon
              name='chatbubble-outline'
              type='ionicon' 
              color='gray' style={{flex:1,flexDirection:'row',marginRight:15}}/> 
              </Pressable>

              
              <Pressable onPress={()=>this.onShare(news.heading,global.uri+"news-content/"+news.id,news.short_description)} >
              <Icon
              name='share-social-outline'
              type='ionicon' 
              color='gray' style={{marginRight:15}} /> 
            </Pressable>
            <Pressable >
    
              </Pressable> */}
            {/* </View> */}
          </ScrollView>
        //     <WebView 
        //     source={{ uri: id }}
        //      style={{ flex: 1 }} 
        //      javaScriptEnabled={true}
        //  domStorageEnabled={true}
        //  renderLoading={this.ActivityIndicatorLoadingView} 
        //  startInLoadingState={true} 
        //      />
            
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
    borderRadius:5,
    marginTop:20,
    marginBottom:20
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

