import React, { Component } from 'react';
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

  constructor(props){
    super(props);

    this.state={
      data:[],
      isLoading:true,
      news_category:0
    }
  }
  
  renderLeftComponent()
  {
    return(
      <Image 
      onPress={()=>{this.props.navigation.navigate("Profile")}}
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

  componentDidMount()
  {
    this.fetch_news();
  }


  fetch_news = ()=>{
    this.setState({ isLoading: true});
    console.warn(global.api_key+'news?n_c_id='+this.state.news_category);
    fetch(global.api_key+'news?n_c_id='+this.state.news_category, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: global.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        if(json.status)
        {
          this.setState({ data: json.data });
        }
          
         // console.warn(this.state.data);
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false,});
      });
  }

  activate_cat = (cat) =>
  {
    this.setState({news_category:cat});
    this.fetch_news();
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
            <Category cat_act={this.activate_cat}/>
            {(!this.state.isLoading)?

              (this.state.data.length>0)?
            <Feeds navigation={this.props.navigation} feed={this.state.data}/>
            :
            <View><Text style={{fontSize:'16',alignSelf:'center'}}>No News Found</Text></View>
            :
            <ActivityIndicator size="large" color="orange" />
            }
            
            
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
    this.state = { 
      cat_data:false,
      data:[],  
      isLoading: true,
      
    };
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
          <TouchableOpacity onPress={()=>{this.props.cat_act(news.id)}} style={styles.border1}>
          <Text style={{ color: '#5d5d5d', fontSize: 14, alignSelf: "center", }}>{news.n_c_categories}</Text>
        </TouchableOpacity >
        )
      })
     
      return (
        <View>
          <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true} style={{backgroundColor:'#ffffff'}}
      >
        <TouchableOpacity onPress={()=>{this.props.cat_act(0)}} style={styles.border1}>
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
    this.state = { counter: 0,
      liked:false,
      news_category:0
    };
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


  get_vendor_category=(cat_id)=>{
    this.setState({isloading:true,select_cat:cat_id});

    this.fetch_data(cat_id);
 
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
      let news = this.props.feed.map((news,id) => {
        return(
               <View style={styles.card}>
                <View style={{ flexDirection:'row' }}>
                <Image 
                  style={{width:25,height:25}} 
                  source= {{uri: 'https://healthyrabbit.in/hnn/public/assets/images/fev.jpg'}}
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


        <Pressable onPress={()=>{this.props.navigation.navigate('Comments',{itemId:news.id,description:news.short_description})}}>
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
        )});
                
    
     
      return (
        <ScrollView style={{backgroundColor:'#f2f2f2'}}>
          {news}
            </ScrollView>
      );
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

