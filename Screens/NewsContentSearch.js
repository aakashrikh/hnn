import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,Dimensions,ActivityIndicator,Pressable,
  ScrollView,Share
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Image,Chip,Tab ,Text,Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const win = Dimensions.get('window');
import { WebView } from 'react-native-webview';
import moment from'moment';
const ratio = win.width/541; //541 is actual image width

class NewsContentSearch extends Component
{
  constructor(props) {
    super(props);
    console.warn(this.props.route.params.item.id)
    // Don't call this.setState() here!
    this.state = { counter: 0,liked:false,data:[],  isLoading: true, id:this.props.route.params.item.id, news:"",title:"",description:"",
    excerpt:"",new_image:""};
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

  componentDidMount(){
    this.fetch_data()
  }

  onShare = async (news_title,news_url,news_msg) => {
    try {
      const result = await Share.share({
        title: news_title,
        url: news_url,
        message: news_msg,

      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  fetch_data=()=>{
    fetch("https://hnn24x7.com/wp-json/wp/v2/posts/"+this.state.id, { 
        method: 'GET',
          headers: {    
              Accept: 'application/json',  
                'Content-Type': 'application/json',
                'Authorization': global.token  
               }, 
              }).then((response) => response.json())
                        .then((json) => {
                           
                            this.setState({news:json})
                             console.warn(json.title.rendered)
                             this.setState({title:json.title.rendered,description:json.content.rendered,excerpt:json.excerpt.rendered,
                                new_image:json.yoast_head_json.twitter_image})
                             
                           return json;    
                       }).catch((error) => {  
                               console.error(error);   
                            }).finally(() => {
                               this.setState({isLoading:false})
                            });

  }


    render()
    {
      var id=global.uri+"news-content/"+this.props.route.params.itemId;
      const {item}=this.props.route.params;
      // this.props.navigation.openDrawer();
        return(
          <ScrollView style={styles.card}>
                
              <View>
               <View style={{alignSelf:'flex-end'}}>
              <Pressable onPress={()=>this.onShare(this.state.title,this.state.link)} >
              <Icon
              name='share-social-outline'
              type='ionicon' 
              color='#222' style={{marginRight:15}} /> 
            </Pressable>
              </View>

                <Text h4 style={{marginTop:10,fontSize:16}} >{this.state.title}
                  </Text>
 {/* <Text style={{marginLeft:0}}>{moment(item.modified_gmt).fromNow()}</Text> */}
<View style={{marginTop:10}}>
<HTMLView
        value={this.state.excerpt}
        stylesheet={{marginTop:50}}
      />
</View>
  
              </View>
            
              <Image 
                style={styles.FeedImage} 
                source= {{uri: this.state.new_image}}
              PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}
             />

<HTMLView
        value={this.state.description}
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

export default NewsContentSearch;

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

