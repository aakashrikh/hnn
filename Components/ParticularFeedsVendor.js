import React, { Component } from 'react';
import {
    View,
    StyleSheet,ActivityIndicator,
    Image,Text,Dimensions, ScrollView, TouchableOpacity,Modal
} from 'react-native';
import {Header,Icon} from "react-native-elements";
import Share from 'react-native-share';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-simple-toast";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
//Global Style Import
const styles = require('../Components/Style.js');

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
class Post extends Component{

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
        type:"",
        vendor_id:this.props.vendor_id,
        report:'',
        actionType:'all',
        feed_content:[],
        user_type:'',
        modalVisible: false,
        value:"It's Spam"
      };
    }
  
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    componentDidMount(){
     
     this.fetch_feeds();
     this.focusListener=this.props.navigation.addListener('focus',() =>
     {
      this.fetch_feeds();
     });

    }

    //function for fetching feeds
    fetch_feeds()
    {
      this.setState({isLoading:true,page:page++});

        var page=this.state.page;
        fetch(global.user_api+"get_user_feeds", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body: JSON.stringify({
              page:this.state.page,
              vendor_id:this.state.vendor_id,
              action_type:"vendor"
              // token:token,
          })})
          .then((response) => response.json())
          .then((json) => {
            if(json.data.length >0){
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
            this.setState({data:json.data});
            this.setState({user_type:json.data.user_type})
            this.setState({feed_content:json.data[0].feed_content})
        }
          })
          .catch((error) => {  
                console.error(error);   
              }).finally(() => {
                this.setState({isLoading:false})
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
        // console.warn(feed_id);
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

       //function to report a post
       reportFeed(id){
        fetch(global.user_api+'feed_report_user',{
          method:"POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
          },
          body:JSON.stringify({
            feed_id:id,
            report:this.state.value
          })
        })
        .then((response)=>response.json())
        .then((json)=>{
          console.log(json)
          if(!json.status){
            Toast.show(json.msg);
            // console.warn(json)
          }
          else
          {
            // Toast.show(json.msg)
            Toast.show("Reported Successfully!")
          
          }   

        })
        this.RBSheet.close();

      }


        

        bottomSheet =(id)=>{
          this.setState({id:id})
          this.RBSheet.open(id)
        }

        
    render(){
  
      const { data, modalVisible,object,follow,save,feed_content} = this.state;
      if(this.state.isLoading)
      {
        return(
          <View>
          <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', alignItems: 'center',marginLeft:25}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <View style={{width: 120, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30,marginLeft:25}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
            />
            <View
              style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
            />
          </View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', alignItems: 'center',marginLeft:25}}>
            <View style={{width: 60, height: 60, borderRadius: 50}} />
            <View style={{marginLeft: 20}}>
              <View style={{width: 120, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30,marginLeft:25}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
            />
            <View
              style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
            />
          </View>
        </SkeletonPlaceholder>
        
        </View>
        )
      }
     else{
      let feeds= data.map((feeds,id)=>{
            return (
                <View>
              {/* this is the card component for post */}
              <View style={style.card}>
                {/* Card Header */}
                <View style={style.cardHeader}>
                          
                           
                            <View style={{flexDirection:"row"}}>
                              {/* logo */}
                              {
                                    feeds.vendor_profile_pic == null ?
                                    <Image source={require('../img/dummyuser.jpg')}
                                    style={style.profileImage} /> 
                                    :
                                    <Image source={{uri:global.image_url+feeds.vendor_profile_pic}}
                                    style={style.profileImage}/>
                                }
                            
                            {/* name and time */}
                            <View style={{flexDirection:"column",paddingLeft:10,paddingTop:-5}}>
          
                              
                              
                                <Text style={styles.h4}>{feeds.shop_name}</Text>
                              
                              <Text style={style.postTime}>{moment.utc(feeds.created_at).local().startOf('seconds').fromNow()}</Text>
                            </View>
                            </View>
                         
                   
                  
                  {/* Menu button */}
                  <View style={{position:"absolute",right:5,top:10}}>
                  
                    <Text onPress={() => this.bottomSheet(feeds.id)}>
  
                      <Icon name="ellipsis-vertical" type="ionicon" size={20}/>
                    </Text>
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
                                      onPress={()=>this.myShare(feeds.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+feeds.id)}>
                                          <View style={{backgroundColor:"#f5f5f5",
                                          height:35,width:35,justifyContent:"center",borderRadius:50}}>
                                          <Icon type="ionicon" size={19} name="share-social"/>
                                          </View>
                                          <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}>
                                          Share</Text>
                                          </TouchableOpacity>
                                      </View>
  
                                      
                                      {/* to report */}
                                      <View style={{flexDirection:"row",padding:10}}>
                                       
  
                                          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.setModalVisible(true)}>
                                          <View style={{backgroundColor:"#f5f5f5",
                                          height:35,width:35,justifyContent:"center",borderRadius:50}} >
                                          <Icon type="ionicon" size={19} name="trash-bin"/>
                                          </View>
                                          <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}
                                          >Report</Text>
                                          </TouchableOpacity>

                                          {/* report pop up */}
                                        <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalVisible}
                                        >
                                          <View style={style.centeredView}>
                                          <View style={style.modalView}>
                                              {/* close and submit button view */}
                                              <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:5}}>
                                              <View>

                                              </View>
                                              <TouchableOpacity
                                              style={[styles.buttonClose,{alignSelf:"flex-end"}]}
                                              onPress={() => this.setModalVisible(!modalVisible)}>
                                              <Icon type="ionicon" name="close-circle-outline" size={25}/>
                                              </TouchableOpacity>
                                            </View>
                                            
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                            <View>
                                                <RadioForm

                                                  radio_props={radio_props} 
                                                  
                                                  initial={0}
                                                  buttonColor={'#2196f3'}
                                                  animation={true}
                                                  onPress={(value) => {this.setState({value:value})}}
                                                />
                                              </View>
                                            </ScrollView>
                                            
                                            <TouchableOpacity  
                                                onPress={()=>this.reportFeed(this.state.id)}
                                                style={style.buttonStyles}>
                                                <LinearGradient 
                                                    colors={['#377ae3', '#0345b7']}
                                                    style={styles.signIn}>

                                                    <Text style={[styles.textSignIn, {color:'#fff'}]}>
                                                    Submit</Text>
                                                
                                                </LinearGradient>
                                            </TouchableOpacity>
                                                            
                                          </View>
                                          </View>
                                        </Modal>
                                      </View>
                                  </View>
          
         
             
                          </View>
                          </RBSheet>
  
  
                {/* Image */}
                <View>
                
                {feeds.feed_content.map(feed =>{
                  return(
                  <Image 
                  source={{uri:global.image_url+feed.content_src}} 
                  // source={require("../img/post.jpg")}
                  style={style.postImage}
                  PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}/>
                  )
                })
              }

                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row"}}>
                    <Text 
                   style={{margin:5, marginLeft:10}}>
                  <Icon type="ionicon" name={object[feeds.id] ? "heart" : "heart-outline"}
                  color={object[feeds.id] ? "red" : "black"}
                  onPress={() => this.like(feeds.id)} size={25}/>

                  </Text>
    
                  <Text style={{margin:5}}>
                   <Icon type="ionicon" onPress={()=>this.props.navigation.navigate("Comments",{description:feeds.feed_description,
                   time:feeds.created_at,title:feeds.feed_title,id:feeds.id,})}
                    name="chatbubble-outline"  size={22}/>
                  </Text>
    
                  <Text style={{margin:5}} >
                  <Icon type="ionicon" name="share-social-outline" size={22}
                  onPress={()=>this.myShare(feeds.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+feeds.id)}/>
                  </Text>
                  </View>
  
                  <View>
                    {!save[feeds.id] ?
                    <TouchableOpacity>
                    <Text  style={{margin:5,justifyContent:"flex-end"}}>
                    <Icon type="ionicon"  name= "bookmark-outline" 
                    color="black" 
                    onPress={() => this.save(feeds.id)}
                    size={22} />
                    </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity>
                  <Text  style={{margin:5,justifyContent:"flex-end"}}>
                  <Icon type="ionicon"  name= "bookmark" 
                  color="black" 
                  onPress={() => this.save(feeds.id)}
                  size={22} />
                  </Text>
                </TouchableOpacity>}
                  </View>
  
                  </View>

                  <View>
                 
                  { (this.state.like[feeds.id]>0)?
                  <>
                  <Text style={{margin:2, marginLeft:13}}>{this.state.like[feeds.id]} likes</Text>
                  </>
                  :
                  <></>
                  }
                  </View>

                  <Text style={{padding:10,left:5, top:-5,fontSize:RFValue(10,580), fontFamily:"Roboto-Regular"}}
                  numberOfLines={3}>{feeds.feed_description}
                  </Text>
                </View>
      
                {/* <View>
                  <Icon type="ionicon" name="heart" />
                </View> */}
              </View>
          </View>
            )
          }
            
          
          )
        
         
        
       
       return(
        <ScrollView style={{backgroundColor:'#f2f2f2'}}>
          {feeds}
        </ScrollView>
       )
     }
       
    }
  }
  
export default Post;  





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
      // marginTop: 50,
    },
    modalView: {
      margin: 20,
      width:"90%",
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
      width:"100%",
      alignSelf:"center",
      height:"30%",
      borderRadius:5,
      justifyContent:"center"
    },
    text:{
        fontFamily:"Raleway-SemiBold",
        // fontSize:20,
        fontSize:RFValue(14.5, 580),
        margin:5
    },
})