import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,Dimensions,ActivityIndicator,
  ScrollView,Share,Pressable,TouchableOpacity 
} from 'react-native';

import { Image,Chip,Tab ,Text,Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';


const win = Dimensions.get('window');
const ratio = win.width/541; //541 is actual image width

class Home extends Component
{
  renderLeftComponent()
  {
    return(
      <Image 
      onPress={()=>{this.props.navigation.openDrawer()}}
                  style={{width:30,height:30,marginTop:5}} 
                  source= {require('../assets/user.png')}
                />
    )
  }
  renderCenterComponent()
  {
    return(
      <Image 
                  style={{width:50,height:50}} 
                  source= {require('../assets/logo.png')}
                />
    )
  }

  renderRightComponent()
  {
    return(
      <Icon
              name='notifications-outline'
              type='ionicon' 
              color='black' style={{marginTop:5}} /> 
    )
  }

    render()
    {
      // this.props.navigation.openDrawer();
        return(
          <View style={{flex:1}}>
            
            <Header
         statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['white', 'white'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
            
          }}
        />
            <Category />
            <Feeds navigation={this.props.navigation} />
          </View>
      )
    }
}

//component for the catch the category of news from the api
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
          <Text style={{ color: '#5d5d5d', fontSize: 14, alignSelf: "center", }}>{news.n_c_categories}</Text>
        </TouchableOpacity >
        )
      })
     
      return (
        <View>
          <ScrollView
        horizontal={true} style={{backgroundColor:'#ffffff'}}
      >
        <TouchableOpacity onPress={()=>{this.category_update}} style={styles.border1}>
          <Text style={{ color: '#5d5d5d', fontSize: 14, alignSelf: "center", }}>All</Text>
        </TouchableOpacity>
          {news_cat}
            </ScrollView>
            </View>
      );
      }

  }
}


//component for the catch the news from the api
class Feeds extends Component
{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { counter: 0,liked:false,data:[],  isLoading: true};
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
  componentDidMount()
  {
    fetch(global.api_key+'news')
    .then((response) => response.json())
    .then((json) => {
      
      this.setState({ data: json });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }

  like_dislike_news = () =>
  {
      var like_btn = this.state.liked;

      if(like_btn)
      {
        this.setState({'liked':false})
      }
      else{
        this.setState({'liked':true})
      }
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
      let news = data.map((news,id) => {
        return(
               <View style={styles.card}>
                <View style={{ flexDirection:'row' }}>
                <Image 
                  style={{width:25,height:25}} 
                  source= {{uri: 'https://greenrabbit.in/hnn/public/assets/images/fev.jpg'}}
                />
    
              <Text h5 style={{marginLeft:10}}> HNN 24*7 </Text>
              </View>
              <View>
                <Text h4 style={{marginTop:10}} onPress={()=>{this.props.navigation.navigate('NewsContent',{
                  itemId: news.id })}}>{news.heading}</Text>
                <Text style={{marginTop:10}}>{news.short_description}</Text>
              </View>
            
              <Image 
                style={styles.FeedImage} 
                source= {{uri: global.uri+ news.news_img}}
              PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}
             />
            
            <View style={{flex:1,flexDirection:'row',marginTop:10}}>
            <Pressable onPress={this.like_dislike_news}>
            <Icon
              name={this.state.liked ? "heart" : "heart-outline"}
              size={28}
              type='ionicon'
              color={this.state.liked ? "red" : "black"}

              style={{flex:1,flexDirection:'row',marginRight:15,marginLeft:15}}
            />
        </Pressable>
        <Pressable onPress={()=>{this.props.navigation.navigate('NewsContent')}}>
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
    
              </Pressable>
            </View>
          </View>
        )
      })
     
      return (
        <ScrollView style={{backgroundColor:'#f2f2f2'}}>
          {news}
            </ScrollView>
      );
      }
    }
}

export default Home;

const styles = StyleSheet.create({
  Container:
  {
     flex: 1,
     // Set hex color code here.
     

  },
  border1: {
    color: "#5d5d5d",
    borderWidth: 1,
    borderColor: "#5d5d5d",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10


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
    marginTop:10
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

