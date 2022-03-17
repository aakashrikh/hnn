import React, { Component } from 'react';
import {
    View,
    StyleSheet,ActivityIndicator,
    Image,Text,Dimensions, ScrollView, TouchableOpacity,Modal, FlatList, Pressable
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



const win = Dimensions.get('window');
const ratio = win.width/541; //541 is actual image width

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
        vendor_id:0,
        report:'',
        actionType:'all',
        feed_content:[],
        user_type:'',
        modalVisible: false,
        value:"It's Spam",
        load_more:true,
        isFetching: false,
      };

      this.viewabilityConfig = {
        minimumViewTime: 500,
        viewAreaCoveragePercentThreshold: 40,
    };

    //for feeds view
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)

    }
    

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    componentDidMount(){
     this.fetch_feeds();
     this.focusListener=this.props.navigation.addListener('focus',() =>
     {this.fetch_feeds();})

    }

    fetch_feeds=()=>{
      fetch(global.user_api+"get_user_feeds", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':global.token 
        },
        body: JSON.stringify({
            page:0,
            vendor_id:0,
            action_type:"all"
            // token:token,
        })})
        .then((response) => response.json())
        .then((json) => {
          if(json.data.length>0){
            console.warn(json.data)
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
                  // this.setState({ data: joined })
                  // this.setState({user_type:json.data.user_type})
                  // this.setState({feed_content:json.data[0].feed_content})
                  this.setState({data:json.data})
                  
          }
          
          
        })
        .catch((error) => {  
              console.error(error);   
            }).finally(() => {
              this.setState({isLoading:false,load_more:false,isFetching:false})
            })
    }

    //function for fetching feeds
    fetch_feeds1()
    {
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
              vendor_id:0,
              action_type:"all"
              // token:token,
          })})
          .then((response) => response.json())
          .then((json) => {
            if(json.data.length>0){
              console.warn(json.data)
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
                
                    
            }
            
            
          })
          .catch((error) => {  
                console.error(error);   
              }).finally(() => {
                this.setState({isLoading:false,load_more:false})
              })
    }


    //to refresh feeds on swipe down
    onRefresh() {
      this.setState({isFetching: true,},() => {this.fetch_feeds();});
  }

    //to load more feeds
    load_more = ()=>
    {
        var data_size=this.state.data.length;

        if(data_size>9)
        {
            this.fetch_feeds1()
        }
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


        
        //function to open bottom sheet
        bottomSheet =(id)=>{
          this.setState({id:id})
          this.RBSheet.open(id)
        }

        //function to close bottom sheets
        closeBottmSheets=()=>{
          this.RBSheet.close();
            this.RBSheet1.close()
        }

        //function api call for feed views
        handleViewableItemsChanged(items)
        {
          if(items.length>0)
          {
            console.warn(items[0].item.id);
            
            fetch(global.user_api+'update_feed_view',{
              method:"POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':global.token 
              },
              body:JSON.stringify({
                feed_id:items[0].item.id
              })
            })
            .then((response)=>response.json())
              .then((json)=>{
               if(json.status){

               }else{

               }
      
              })
          }
          
        }
        
        //function for flatlist feeds items
        renderItem=({item})=>(
          <View>
                {/* this is the card component for post */}
                <View style={style.card}>
                  {/* Card Header */}
                  <View style={style.cardHeader}>

                  {
                  // for user
                      (item.user_type == "user") ?
                         <View  style={style.cardHeader}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile",{id:item.vendor_id,name:item.user_name})}>
                          <View style={{flexDirection:"row"}}>
                            {/* logo */}
                            {item.user_profile_pic == null ?
                            <Image
                            source={require('../img/dummyuser.jpg')}
                            //  source={require("../img/logo/mp.png")} 
                             style={style.profileImage}/>
                            :
                            <Image
                            source={{uri:global.image_url+item.user_profile_pic}}
                            //  source={require("../img/logo/mp.png")} 
                            style={style.profileImage}/>
                            }
                         
                          {/* name and time */}
                          <View style={{flexDirection:"column",paddingLeft:10,paddingTop:2}}>

                          <Text style={style.name}>{item.user_name}</Text>
                          
                            <Text style={style.postTime}>
                            {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
                              {/* {item.created_at.length>0
                              ?
                              `${item.created_at.substring(0, 22)}`
                              
                              :
                              `${item.created_at}`
                            } */}
                              </Text>
                          </View>
                          </View>
                          
                          </TouchableOpacity>
                          <View style={{position:"absolute",right:5,top:10}}>
                          <Text 
                                onPress={() => this.bottomSheet(item.id)}>
              
                                  <Icon name="ellipsis-vertical" type="ionicon" size={20}/>
                                </Text>
                            </View>
                         </View>
                          :
                          
                          // for vendor
                          (item.user_type == "vendor") ?
                           <View style={style.cardHeader}>
                              <TouchableOpacity onPress={()=>this.props.navigation.navigate("ShopOffers",{id:item.vendor_id})}>
                            <View style={{flexDirection:"row"}}>
                              {/* logo */}
                            <Image
                            source={{uri:global.image_url+item.vendor_profile_pic}}
                            //  source={require("../img/logo/mp.png")}
                             style={style.profileImage}/>
                            {/* name and time */}
                            <View style={{flexDirection:"column",paddingLeft:10,paddingTop:2}}>
          
                              
                              
                                <Text style={style.name}>{item.shop_name}</Text>
                              
                              <Text style={style.postTime}>
                                {moment.utc(item.created_at).local().startOf('seconds').fromNow()}
                              </Text>
                            </View>
                            </View>
                            </TouchableOpacity>

                            {/* follow button */}
                              <View style={{flexDirection:"row"}}>
                              
                              {/* follow and unfollow button */}
                              {/* <View>
                              { !follow[feeds.id] ?
                              <TouchableOpacity style={[style.followButton,{borderColor:"transparent",alignItems:"center",backgroundColor:"#326bf3"}]}
                              onPress={()=>this.follow(feeds.id)}>            
                                    <Text style={style.followButtonText}>FOLLOW 
                                    <Icon name="add-outline" color="#fff" type="ionicon"  style={{top:6.2,left:1}} size={22}/>
                                    </Text>
                              </TouchableOpacity> 
                              :
                              <TouchableOpacity style={[style.followButton,{backgroundColor:"#000"}]} 
                              onPress={()=>this.follow(feeds.id)}>            
                                    <Text style={[style.followButtonText,{color:"#fff",top:-1,left:-1}]}>UNFOLLOW</Text>
                                    </TouchableOpacity>
                                    }
                              </View>
                               */}
                              <View style={{position:"absolute",right:5,top:10}}>
                              <Text 
                                onPress={() => this.bottomSheet(item.id)}>
              
                                  <Icon name="ellipsis-vertical" type="ionicon" size={22}/>
                                </Text>
                          
                                </View>
                                </View>
                           </View>
                            :
                            <View></View>
                        }
                  
                  <View>
                  
                  </View>
                </View>
  
                 {/* Bottom Sheet for vendor Post options */}
  
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
                                      onPress={()=>this.myShare(item.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+item.id)}
                                      >
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
                                       
  
                                          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => {this.RBSheet1.open()}}>
                                          <View style={{backgroundColor:"#f5f5f5",
                                          height:35,width:35,justifyContent:"center",borderRadius:50}} >
                                          <Icon type="ionicon" size={19} name="trash-bin"/>
                                          </View>
                                          <Text style={[styles.h4,{alignSelf:"center",marginLeft:20}]}
                                          >Report</Text>
                                          </TouchableOpacity>

                                          {/* Bottom sheet for report section */}
                                          <RBSheet
                                           ref={ref=>{this.RBSheet1 = ref;}}
                                           // animationType="slide"
                                           closeOnDragDown={false}
                                           closeOnPressMask={false}
                                           height={360}
                                           customStyles={{
                                               container: {
                                                   borderTopRightRadius: 20,
                                                   borderTopLeftRadius: 20,
                                                 },
                                           draggableIcon: {
                                               backgroundColor: ""
                                           }
                                           }}>

                                      <View>
                                      {/* new container search view */}
                                          <View style={{paddingLeft:20}}>
                                            <TouchableOpacity onPress={()=>this.closeBottmSheets()}>
                                              <Text style={{alignSelf:"flex-end",right:15,top:10}}>
                                                <Icon name="close-circle-outline" type="ionicon" size={30}/>
                                              </Text>
                                            </TouchableOpacity>
                                            <View>
                                              <RadioForm
                                              buttonStyle={{padding:10,marginTop:10}}
                                              buttonSize={10}
                                              radio_props={radio_props} 
                                              initial={0}
                                              buttonColor={'#2196f3'}
                                              animation={true}
                                              onPress={(value) => {this.setState({value:value})}}
                                              />
                                            </View>

                                            <TouchableOpacity  
                                                onPress={()=>this.reportFeed(this.state.id)}
                                                >
                                                <LinearGradient 
                                                    colors={['#377ae3', '#0345b7']}
                                                    style={style.buttonStyles}>

                                                    <Text style={[styles.textSignIn, {fontSize:RFValue(14,580),alignSelf:"center", color:'#fff'}]}>
                                                    Submit</Text>
                                                
                                                </LinearGradient>
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                            
                                          </RBSheet>
                                        
                                      </View>
                                  </View>
          
         
             
                          </View>
                          </RBSheet>
  
  
                          

                {/* Image */}
                <View>
                
                {item.feed_content.map(feed =>{
                  return(
                  <Image 
                  source={{uri:global.image_url+feed.content_src}} 
                  // source={require("../img/post.jpg")}
                  style={style.postImage}
                  PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}/>
                  )
                })
              }

              {
              (item.user_type == 'vendor')?
              <Pressable onPress={()=>{this.props.navigation.navigate("ShopOffers",{id:item.tag_id,shop_name:item.shop_name})}}
              style={style.shopTag}>
                <Icon name="storefront"  size={15} />
                <Text style={{fontSize:12,fontFamily:"Raleway-Bold"}}> View Shop</Text>
              </Pressable>
:<></>
              }
                  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    {/* like */}
                    <View style={{flexDirection:"row",marginTop:5,left:8}}>
                    
                 <Text style={{marginTop:1}}>
                 <Icon type="ionicon" name={this.state.object[item.id] ? "heart" : "heart-outline"}
                  color={this.state.object[item.id] ? "red" : "black"}
                  onPress={() => this.like(item.id)} size={25}/>
                 </Text>
                  

                  {/* comment */}
                  <Text style={{margin:5,marginTop:2, left:5}}>
                   <Icon type="ionicon" onPress={()=>this.props.navigation.navigate("Comments",{description:item.feed_description,
                   time:item.created_at,title:item.feed_title,id:item.id,pic:item.user_profile_pic,pic:item.vendor_profile_pic})}
                    name="chatbubble-outline"  size={22}/>
                  </Text>
                    
                    {/* share */}
                    <Text style={{margin:5,marginTop:2, left:5}}>
                  <Icon type="ionicon" name="share-social-outline" size={22}
                  onPress={()=>this.myShare(item.feed_description,'Checkout Our Latest Update',global.shareLink+'/feedView/'+item.id)}/>
                  </Text>
                  </View>
  
                  {/* save */}
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

  
                    {/* feed description */}
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

                  <Text style={{padding:10,left:5, top:-10,fontSize:RFValue(10,580), fontFamily:"Roboto-Regular"}}
                  numberOfLines={3}>{item.feed_description}
                  </Text>
                </View>
      
                {/* <View>
                  <Icon type="ionicon" name="heart" />
                </View> */}
              </View>
          </View>
        )
        
    render(){
  
      // const { data, modalVisible,object,follow,save,feed_content} = this.state;
            
       return(
        <View>
          {(!this.state.isLoading) ?
          [
                (this.state.data.length>0) ?
                <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                onEndReached={()=>{this.load_more()}}
                onEndReachedThreshold={0.5}
                viewabilityConfig={this.viewabilityConfig}
                onViewableItemsChanged={this.handleViewableItemsChanged}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                />
                :
                <View>
                 <Image source={require('../img/NP.png')} style={{height:280,width:Dimensions.get('window').width,
                      top:120}}/>
                      <Text style={{alignSelf:"center",top:150,
                    fontFamily:"Raleway-SemiBold",fontSize:RFValue(14,580),color:"grey"}}>No Feeds Found</Text>
                </View>
          ]
                :
                
                <View>
                
            </View>
                }

                {this.state.load_more?
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
                       :
                     <View></View>
                }
        </View>
       )
     
       
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
      height:300
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
      height:"56%",
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
      width:"55%",
      alignSelf:"center",
      marginTop:35,
      marginRight:5,
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
    buttonClose:{
      alignSelf:"flex-end",
      position:"absolute",
      right:5,
      paddingTop:10
    },
    shopTag:{
      width:100,
      shadowOffset:{width:50,height:50},
      height:30,
      elevation:20,
      shadowColor:"#d3d3d3",
      shadowRadius:50,
      backgroundColor:"#fff",
      marginTop:-50,
      marginLeft:10,
      borderRadius:30,
      marginBottom:20,
      flexDirection:"row",
      alignItems:"center",
      paddingLeft:10
    }
})