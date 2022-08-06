import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,Dimensions,ActivityIndicator,
  ScrollView,Share,Pressable,TouchableOpacity,FlatList 
} from 'react-native';

import { Image,Chip,Tab ,Text,Icon,Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { WebView } from 'react-native-webview';
const win = Dimensions.get('window');
const ratio = win.width/541; //541 is actual image width
import HTMLView from 'react-native-htmlview';
import LikeDislike  from '../Components/LikeDislike.js';
import moment from'moment';
class Home extends Component
{

  constructor(props){
    super(props);

    this.state={
      data:[],
      isLoading:true,
      news_category:0,
      page:1,
      load_more:false
    }
  }
  
  renderLeftComponent()
  {
    return(
      <TouchableOpacity onPress={()=>this.drawer()}>
        <Icon name="menu" color="#fff" size={25}/>
      </TouchableOpacity>
    )
  }

  renderCenterComponent()
  {
    return(
      <Image 
                  style={{width:80,height:30}} 
                  source= {require('../img/logo.png')}
                />
    )
  }

  renderRightComponent(){
    return(
      <TouchableOpacity>
        <Icon name="search" color="#fff" size={25}/>
      </TouchableOpacity>
    )
  }

  componentDidMount()
  {
    this.fetch_news(0,1);
  }

   fetch_news = (cat,page)=>{
  
    if(cat == 0)
    {
      var urr='https://hnn24x7.com/wp-json/wp/v2/posts?page='+page;
    }
    else
    {
      var urr='https://hnn24x7.com/wp-json/wp/v2/posts?categories='+cat+'&&page='+page;
    }
  
   // console.log('https://hnn24x7.com/wp-json/wp/v2/posts?categories='+this.state.news_category+'&&page='+page);
    fetch(urr, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: global.token,
      },
    })
      .then(response => response.json())
      .then(json => {
        
           this.setState({ data: [...this.state.data,...json] });
      
         // console.warn(this.state.data);
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false,load_more:false});
      });
  }

  // fetch_news = ()=>{
  //   var page=1;
  //   this.setState({ isLoading: true});
  //   fetch(global.api_key+'news?page='+page+'&&n_c_id='+this.state.news_category, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: global.token,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       if(json.status)
  //       {
  //          this.setState({ data: json.data.data });
  //       }
          
  //        // console.warn(this.state.data);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => {
  //       this.setState({ isLoading: false,});
  //     });
  // }

  activate_cat = (cat) =>
  {
    this.setState({news_category:cat,page:1,isLoading:true,data:[]});
    this.fetch_news(cat,1);
  }
  

  load_more = ()=>
    {
       
        var data_size=this.state.data.length;
        var page=this.state.page+1;
        if((data_size) >9)
        {
            this.setState({page:page,load_more:true});
            this.fetch_news(this.state.news_category,page);
        }
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
  
    renderItem= ({item,id}) => 
    (
      <View style={styles.card}>
                <View style={{ flexDirection:'row',width:'100%' }}>
                  <View style={{ flexDirection:'row',width:35 }}>
                <Image 
                  style={{width:30,height:30}} 
                  source= {require('../assets/logo.png')}
                />
                </View>
              <View style={{flexDirection:'column',width:'80%'}}>
              <Text h5 style={{marginLeft:10,fontWeight:'500',color:"#fff"}}> HNN 24*7 </Text>
              <Text style={{marginLeft:10,color:"#fff"}}>{moment(item.modified_gmt).fromNow()}</Text>
              </View>

              <View style={{alignSelf:'flex-end'}}>
              <Pressable onPress={()=>this.onShare(item.title.rendered,item.link,item.excerpt.rendered)} >
              <Icon
              name='share-social-outline'
              type='ionicon' 
              color='#fff' style={{marginRight:15}} /> 
            </Pressable>
              </View>
              </View>
              <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('NewsContent',{
                  item: item })}}>
                <Text style={{marginTop:10,fontSize:20,fontWeight:"bold",color:"#fff"}}>{item.title.rendered}</Text>
{/* <HTMLView
        value={item.excerpt.rendered}
        stylesheet={styles}
      /> */}

      <Text style={{color:"#fff",marginTop:10,textAlign:"justify"}}>
      {item.excerpt.rendered}
      </Text>
  
              </TouchableOpacity>
            
              <Image onPress={()=>{this.props.navigation.navigate('NewsContent',{
                  item: item })}}
                style={styles.FeedImage} 
                source= {{uri: item.yoast_head_json.twitter_image}}
              PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}
             />
            
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
          </View>
    )

    render()
    {
      // this.props.navigation.openDrawer();
        return(
          <View style={{flex:1,backgroundColor:"#0D0C0A"}}>
            
            <Header
              statusBarProps={{ barStyle: 'light-content' }}
              leftComponent={this.renderLeftComponent()}
              centerComponent={this.renderCenterComponent()}
              rightComponent={this.renderRightComponent()}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['black', 'black'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                
              }}
            />
            <Category cat_act={this.activate_cat} active_cat={this.state.news_category}/>
            {(!this.state.isLoading)?

              (this.state.data.length>0)?
              <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                            style={{flex:1}}
                            onEndReached={()=>{this.load_more()}}
                            onEndReachedThreshold={0.5}
                            />
            //  <Feeds navigation={this.props.navigation} feed={this.state.data}/>
            :
            <View><Text style={{fontSize:16,alignSelf:'center'}}>No News Found</Text></View>
            :
            <ActivityIndicator size="large" color="orange" />
            }

            {(this.state.load_more)?
            <ActivityIndicator size="large" color="orange" />
            :
            <></>

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
    fetch('https://hnn24x7.com/wp-json/wp/v2/categories')
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
        if(this.props.active_cat==news.id)
          {
            return(
              <TouchableOpacity  onPress={()=>{this.props.cat_act(news.id)}} style={styles.border1}>
              <Text style={{ color: '#000', fontSize: 14, alignSelf: "center", }}>{news.name}</Text>
            </TouchableOpacity >
            )
          }
          else
          {
            return(
              <TouchableOpacity onPress={()=>{this.props.cat_act(news.id)}} style={styles.border2}>
              <Text style={{ color: '#fff', fontSize: 14, alignSelf: "center", }}>{news.name}</Text>
            </TouchableOpacity >
            )
          }
        
      })
     
      return (
        <View>
          <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true} style={{backgroundColor:'#000'}}
      >
        {(this.props.active_cat==0)?
        <TouchableOpacity onPress={()=>{this.props.cat_act(0)}} style={styles.border1}>
        <Text style={{ color: '#000', fontSize: 14, alignSelf: "center", }}>All</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={()=>{this.props.cat_act(0)}} style={styles.border2}>
        <Text style={{ color: '#5d5d5d', fontSize: 14, alignSelf: "center", }}>All</Text>
      </TouchableOpacity>
      }
        


          {news_cat}
            </ScrollView>
            </View>
      );
      }

  }
}



export default Home;

const styles = StyleSheet.create({
    a: {
      fontWeight: '100',
      color: '#222', // make links coloured pink
    },
 
  Container:
  {
     flex: 1,
     // Set hex color code here.
     

  },
  border1: {
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor:'#FF900C'

  },
  border2: {
    color: "#5d5d5d",
    borderWidth: 1,
    borderColor: "#fff",
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
    backgroundColor:'#000',
    padding:10,
    borderRadius:10
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
  },
  p:{
    color:"#fff"
  }

});

