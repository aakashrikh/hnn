import React, { Component } from 'react';
import {
    View,
    StyleSheet,ActivityIndicator,
    Image,Text,Dimensions, ScrollView, TouchableOpacity,Modal,FlatList, Touchable
} from 'react-native';
import {Header,Icon} from "react-native-elements";
import Share from 'react-native-share';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-simple-toast";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import moment from 'moment';

//Global Style Import
const styles = require('./Style.js');

var radio_props = [
  {label: "It's Spam", value: "It's Spam"},
  {label: "Nudity or sexual activity", value: "Nudity or sexual activity" },
  {label: "Hate speech or symbols", value: "Hate speech or symbols" },
  {label: "False Information", value: "False Information" },
  {label: "Sale of illegal and regulated goods", value: "Sale of illegal and regulated goods" },
  {label: "Suicide or self injury", value: "Suicide or self injury"},
  {label: "Violence or dangerous organisations", value: "Violence or dangerous organisations" },
  {label: "Something else", value: "Something else" },
];

//this is the component for Post 
class UserPost extends Component{

    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
        data:[],
        object:{},
        save:{},  
        like:{},
        isLoading: true,
        follow:{},
        token:'',
        page:0,
        feed_id:'',
        id:'',
        type:"",
        report:'',
        user_id:global.user,
        modalVisible: false,
        value:"It's Spam",
        no_post:true,
        load_more:true
        
      };
    }
  
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    componentDidMount(){
      this.fetch_feeds();
      // this.focusListener=this.props.navigation.addListener('focus',() =>
      // {
      //   this.fetch_feeds();
      // });

    }

    //function for fetching feeds
    fetch_feeds()
    {
      // var page=this.state.page+1;
      // this.setState({page:page,load_more:true});
        fetch(global.user_api+"get_user_feeds", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body: JSON.stringify({
              page:0,
              vendor_id:this.state.user_id,
              action_type:'user'
              // token:token,
          })})
          .then((response) => response.json())
          .then((json) => {
            if(json.data.length>=0){
              json.data.map((value,key)=>{
                const object = this.state.object;
                const save = this.state.save;
                const like = this.state.like;
                like[value.id]=value.feed_like_count;
                if(value.feed_like==null)
                {
                    object[value.id] =false;
                }
                else{
                    object[value.id] =true;
                }

                
                if(value.feed_save==null)
                {
                    save[value.id] =false;
                }
                else{
                    save[value.id] =true;
                }
              
                this.setState({ object });
                this.setState({save});
                this.setState({like});
            })                                    
            // var obj=json.data;
            // var joined = this.state.data.concat(obj);
            this.setState({ data: json.data })
            this.setState({user_type:json.data.user_type})
            if(json.data.length>0){
            this.setState({feed_content:json.data[0].feed_content})
            }
            this.setState({no_post:false});
          }
              
            return json;    
          })
          .catch((error) => {  
                console.error(error);   
              }).finally(() => {
                this.setState({isLoading:false,load_more:false})
              })            
    }


    fetch_feeds1(){
      var page=this.state.page+1;
      this.setState({page:page,load_more:true});
        fetch(global.user_api+"get_user_feeds", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body: JSON.stringify({
              page:page,
              vendor_id:this.state.user_id,
              action_type:'user'
              // token:token,
          })})
          .then((response) => response.json())
          .then((json) => {
            if(json.data.length>0){
              json.data.map((value,key)=>{
                const object = this.state.object;
                const save = this.state.save;
                const like = this.state.like;
                like[value.id]=value.feed_like_count;
                if(value.feed_like==null)
                {
                    object[value.id] =false;
                }
                else{
                    object[value.id] =true;
                }

                
                if(value.feed_save==null)
                {
                    save[value.id] =false;
                }
                else{
                    save[value.id] =true;
                }
              
                this.setState({ object });
                this.setState({save});
                this.setState({like});
            })                                    
            var obj=json.data;
            var joined = this.state.data.concat(obj);
            this.setState({ data: joined })
            this.setState({user_type:json.data.user_type})
            this.setState({feed_content:json.data[0].feed_content})
            this.setState({no_post:false});
          }
              
            return json;    
          })
          .catch((error) => {  
                console.error(error);   
              }).finally(() => {
                this.setState({isLoading:false,load_more:false})
              })          

    }
    
    //function for share
    myShare = async (title,content,url)=>{
      const shareOptions={
          title:title,
          message:content,
          url:url,
      }
      try{
          const ShareResponse = await Share.open(shareOptions);
  
      }catch(error){
          console.log("Error=>",error)
      }
  }
  
    //function for feed like and unlike
    like = (id) =>
      {
        // console.log(feed_id);
        const object = this.state.object;
        const like = this.state.like;
        if(this.state.object[id] == true )
        {
          object[id] = false;
          like[id]=like[id]-1;
          var type="no"
        }
        else
          {
            object[id] = true;
            like[id]=like[id]+1;
            var type="yes"
          }
        this.setState({ like });
        this.setState({ object });

        fetch(global.user_api+'user_feed_like',{
          method:"POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body:JSON.stringify({
            feed_id:id,
            type:type
          })
        })
        .then((response)=>response.json())
        .then((json)=>{
          // console.log(json)
          
          if(!json.status){
            Toast.show(json.msg)
          }
          else
          {
                // Toast.show(json.msg)
                
            }

        })
      }


        //function to save a post
        save = (id) =>
      {
        console.warn(id);
        const save = this.state.save;
        if(this.state.save[id] == true )
        {
          save[id] = false;
          var type="unsave"
        }
        else
          {
            save[id] = true;
            var type="save"
          }
        this.setState({ save });

        fetch(global.user_api+'user_feed_save',{
          method:"POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body:JSON.stringify({
            feed_id:id,
            type:type
          })
        })
        .then((response)=>response.json())
        .then((json)=>{
          // console.log(json)
          
          if(!json.status){
            Toast.show(json.msg)
          }
          else
          {
                // Toast.show(json.msg)
                
            }

        })
      }

      load_more = ()=>
      {
          var data_size=this.state.data.length;
  
          if(data_size>9)
          {
              this.fetch_feeds1()
          }
      }


        // to delete feed
        feedDelete =(id)=>{
          fetch(global.user_api+'delete_feed',{
            method:"POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization':global.token 
            },
            body:JSON.stringify({
              feed_id:id,
              vendor_id:this.state.user_id
            })
          })
          .then((response)=>response.json())
          .then((json)=>{
            // console.log(json)
            if(!json.status){
              Toast.show(json.msg)
            }
            else
            {
              Toast.show(json.msg)
            }   
            this.RBSheet.close();
            this.fetch_feeds();
          })
         
        }

        bottomSheet =(id)=>{
          this.setState({id:id})
          this.RBSheet.open(id)
        }

        renderItem=({item})=>(
          <View>
          {/* this is the card component for post */}
          <View style={style.card}>
            {/* Card Header */}
            <View style={style.cardHeader}>
              <TouchableOpacity >
              <View style={{flexDirection:"row"}}>
                {/* logo */}
              <Image source={{uri:global.image_url+item.user_profile_pic}} style={style.profileImage}/>
              {/* name and time */}
              <View style={{flexDirection:"column",paddingLeft:10,paddingTop:2}}>
                <Text style={style.name}>{item.user_name}</Text>
                <Text style={style.postTime}>
                {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
                </Text>
              </View>
              </View>
              </TouchableOpacity>
              {/* follow button */}
              <View style={{flexDirection:"row"}}>
              
  
              <View style={{position:"absolute",right:5,top:10}}>
                <Text 
                onPress={() => this.bottomSheet(item.id)}>

                  <Icon name="ellipsis-vertical" type="ionicon" size={20}/>
                </Text>
                </View>
                </View>
            </View>

             {/* Bottom Sheet for Post options */}

             <RBSheet
                          ref={ref=>{this.RBSheet = ref;}}
                          // animationType="slide"
                          closeOnDragDown={true}
                          closeOnPressMask={true}
                          height={150}
                          customStyles={{
                              container: {
                                  borderTopRightRadius: 20,
                                  borderTopLeftRadius: 20,
                                },
                          draggableIcon: {
                              backgroundColor: ""
                          }
                          }}
                      >
                          {/* bottom sheet elements */}
                      <View >
                          {/* new container search view */}
                              <View>
                                  {/* to share */}
                                  <View style={{flexDirection:"row",padding:10}}>
                                  <TouchableOpacity style={{flexDirection:"row"}} 
                                  onPress={()=>this.myShare(item.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+item.id)}>
                                      <View style={{backgroundColor:"#f5f5f5",
                                      height:35,width:35,justifyContent:"center",borderRadius:50}}>
                                      <Icon type="ionicon"size={19} name="share-social"/>
                                      </View>
                                      <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>
                                      Share</Text>
                                      </TouchableOpacity>
                                  </View>

                                  {/* to unfollow */}
                                  <View style={{flexDirection:"row",padding:10}} >
                                      
                                      <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> this.feedDelete(this.state.id)}>
                                      <View style={{backgroundColor:"#f5f5f5",
                                      height:35,width:35,justifyContent:"center",borderRadius:50}}>
                                        <Icon type="ionicon" size={19} name="trash-outline"/>
                                      </View>
                                      <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>
                                        Delete</Text>
                                      </TouchableOpacity>
                                     
                                    </View>


                             
                              </View>
      
     
         
                      </View>
                      </RBSheet>


            {/* Image */}
            <View>
             
             {item.feed_content.map((feed) => {
               return(
                <Image 
                source={{uri:"https://api.marketpluss.com/"+feed.content_src}} 
                // source={require("../img/post.jpg")}
                // resizeMode="contain"
                style={style.postImage}
                PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}/>
               )
             })}
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                <Text 
               style={{margin:3, marginLeft:10}}>
              <Icon type="ionicon" name={this.state.object[item.id] ? "heart" : "heart-outline"}
              color={this.state.object[item.id] ? "red" : "black"}
              onPress={() => this.like(item.id)} size={25}/>
              </Text>

              <Text style={{margin:5}}>
               <Icon type="ionicon" onPress={()=>this.props.navigation.navigate("Comments",{description:item.feed_description,
               time:item.created_at,title:item.feed_title,id:item.id})}
                name="chatbubble-outline"  size={22}/>
              </Text>

              <Text style={{margin:5}} >
              <Icon type="ionicon" name="share-social-outline" size={22}
              onPress={()=>this.myShare(item.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+item.id)}/>
              </Text>
              </View>

              <View>
                {!this.state.save[item.id] ?
                <TouchableOpacity>
                <Text  style={{margin:5,justifyContent:"flex-end"}}>
                <Icon type="ionicon"  name= "bookmark-outline" 
                color="black" 
                onPress={() => this.save(item.id)}
                size={22} />
                </Text>
              </TouchableOpacity>
              :
              <TouchableOpacity>
              <Text  style={{margin:5,justifyContent:"flex-end"}}>
              <Icon type="ionicon"  name= "bookmark" 
              color="black" 
              onPress={() => this.save(item.id)}
              size={22} />
              </Text>
            </TouchableOpacity>}
              </View>

              </View>

              <View>
                 
                  { (this.state.like[item.id]>0)?
                  <>
                  <Text style={{margin:2, marginLeft:13}}>{this.state.like[item.id]} likes</Text>
                  </>
                  :
                  <></>
                  }
                  </View>
              <Text style={{padding:10,left:5, top:-5,fontSize:RFValue(10,580), fontFamily:"Roboto-Regular"}}
              numberOfLines={3}>{item.feed_description}</Text>
            </View>
  
            {/* <View>
              <Icon type="ionicon" name="heart" />
            </View> */}
          </View>
      </View>
        )
        
    render(){
     
          return(
            <View>
              {!this.state.isLoading ?
                    (this.state.data != "") ?
                    <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    onEndReached={()=>{this.load_more()}}
                    onEndReachedThreshold={0.5}
                    />
                    :
                    <View>
                      <View>
                      <Image source={require('../img/NP.png')} style={{height:280,width:Dimensions.get('window').width,
                      top:120}}/>
                      <Text style={{alignSelf:"center",top:150,
                      fontFamily:"Raleway-SemiBold",fontSize:RFValue(14,580),color:"grey"}}>No Feeds Found</Text>
                      </View>

                      <View style={{alignSelf:"center",marginTop:250}}>
                      <TouchableOpacity style={style.button}  onPress={()=>{this.props.navigation.navigate("CreatePost")}}>
                      <Icon name="add-circle-outline" type="ionicon" color="#fff" size={25}/> 
                      <Text style={style.buttonText}>Add Feed</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                    :
                    
                    <View>
                    
                </View>
                    }
    
                    {this.state.load_more?
                          <View style={{alignItems:"center", 
                          backgroundColor:"#fff", shadowRadius: 50,height:40,width:40,
                          shadowOffset: { width: 50, height: 50 },elevation:5,borderRadius:50,padding:5,alignSelf:"center"}}>
                          <ActivityIndicator animating={true} size="large" color="#326bf3" />
                        </View>:
                         <View></View>
                    }
    
              {/* <FlatList
               data={this.state.data}
               renderItem={this.renderItem}
               keyExtractor={item => item.id}
               onEndReached={()=>{this.fetch_feeds()}}
               onEndReachedThreshold={0.5}
              /> */}
    
            </View>
           )}
     
       
    
  }
  
export default UserPost;  





//internal stylesheet 
const style=StyleSheet.create({
    
    card:{
      backgroundColor:"#fff",
      marginBottom:10,
     
    },
    cardHeader:{
      flexDirection:"row",
      padding:3,
      justifyContent:"space-between",
      width:"100%",
      // backgroundColor:"red"
    },
    profileImage:{
        height:35,
        width:35,
        borderRadius:25
    },
    name:{
      fontFamily:"Raleway-SemiBold",
      // fontSize:15,
      fontSize:RFValue(10, 580),
    },
    postTime:{
      fontFamily:"Roboto-Regular",
      color:"grey",
      fontSize:RFValue(8, 580),
    },
    postImage:{
      width:Dimensions.get("window").width,
      height:240
      // height:"100%"

    },followButton:{
      borderRadius:25,
      borderColor:"#000",
      borderWidth:1,
      alignItems:"center",
      alignContent:"center",
      justifyContent:"center",
      // padding:5,
      height:28,  
      width:90,
      top:5,
      // left:5
    },
    followButtonText:{
      fontFamily:"Roboto-SemiBold",
      // fontSize:13,
      fontSize:RFValue(9, 580),
      // alignSelf:"center",
      textAlign:"center",
      top:-5.8,
      left:3,
      color:"#fff",
    },
    
    unFollowButtonText:{
      color:"#000",
      fontFamily:"Roboto-SemiBold",
      // fontSize:13,
      fontSize:RFValue(9, 580),
      // alignSelf:"center",
      textAlign:"center",
      top:0,
      // left:3
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
    modalView: {
      margin: 20,
      width:"80%",
      height:"70%",
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {width: 0,height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    text1:{
      alignSelf:"center",
      margin:10,
      fontSize:RFValue(12,580),
      fontFamily:"Raleway-SemiBold",
      textAlign:"center",
      marginLeft:120
    },  
    buttonStyles:{
      width:"50%",
      alignSelf:"center",
      marginTop:35,
      marginRight:5,
    },
    text:{
        fontFamily:"Raleway-SemiBold",
        // fontSize:20,
        fontSize:RFValue(14.5, 580),
        margin:5
    },
    button:{
      backgroundColor:"#326bf3",
      width:"35%",
      padding:10,
      borderRadius:50,
      textAlign:"center",
      flexDirection:"row",
      justifyContent:"space-evenly"
    },
    buttonText:{
      color:"#fff",
      fontFamily:"Raleway-Bold",
      top:2
    }
})