import React, { Component } from 'react';
import { ActivityIndicator, Linking, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import {
    View,TextInput,
    StyleSheet,Pressable,
    Image,Text,Dimensions,FlatList
} from 'react-native';
import {Icon,Header} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';


//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            isloading:false,
            defaultSearch:false,
            searchField:'',
            news:[],
            search:'',
            no_search:false,
            data:[]
        }
    }

       //for header left component
  renderLeftComponent()
  {
    return(

      <View style={{width:win.width,backgroundColor:"#000"}}>
       <Text onPress={()=>this.props.navigation.goBack()}>
            <Icon name="arrow-back-outline" type="ionicon" color="#fff"/>
       </Text>
      </View>

    )
  }

     //for header center component
     renderCenterComponent()
     {
       return(
   
         <View style={{backgroundColor:"#000",alignItems:"center"}}>
          <Text style={[styles.h4,{fontSize:16.3,alignSelf:"center",color:"#fff"}]}>
              Search
          </Text>
         </View>
   
       )
     }

     componentDidMount(){
        this.focusListener=this.props.navigation.addListener('focus',() =>
        {
            this.fetch_data();
        });
     }



     //function to search product and vendor
     searchField=(search)=>{
        if(search==""){
     }
     else{
        this.setState({no_search:false})  
        this.setState({isloading:true});
        fetch("https://hnn24x7.com/wp-json/wp/v2/search?q=27", { 
           method: 'GET',
             headers: {    
                 Accept: 'application/json',  
                   'Content-Type': 'application/json',
                   'Authorization':global.token
                  }, }).then((response) => response.json())
                           .then((json) => {
                               console.warn("gjkg",json);
                               if(json.status)
                               {
                                  Toast.show("yfuyfu")
                               }
                               else{
                                // var obj=json.data;
                                this.setState({news:json});
                                console.warn("ghghg",this.state.news)

                                // console.warn(obj);
                               }
                              return json;    
                          }).catch((error) => {  
                                  console.error(error);   
                               });
                            this.setState({isloading:false});
     }
    }

    fetch_data=()=>{
        this.setState({isloading:true});
        fetch("https://hnn24x7.com/wp-json/wp/v2/search?q=27", { 
           method: 'GET',
             headers: {    
                 Accept: 'application/json',  
                   'Content-Type': 'application/json',
                   'Authorization':global.token
                  }, 
                   }).then((response) => response.json())
                           .then((json) => {
                            
                               if(!json.status)
                               {
                                //   Toast.show("ytuyfutfu")
                               }
                               else{
                                // var obj=json.data
                                this.setState({news:json});
                                console.warn("ghghegsyaeyg",this.state.news)
                                
                               }
                              return json;    
                          }).catch((error) => {  
                                  console.error(error);   
                               });
                            this.setState({isloading:false})
    }


    renderItem =({item}) => (
        <View style={{marginBottom:5 ,width:Dimensions.get('window').width}}>
            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('NewsContentSearch',{
                item: item })}}>
        <View style={{flexDirection:"row",padding:10}}>
            <View style={{flexDirection:"column",marginLeft:15,justifyContent:"center",width:Dimensions.get('window').width/1.1,paddingBottom:15,
            borderBottomColor:"#E0E0E0",borderBottomWidth:1}}>
                <Text style={[styles.h4,{marginTop:-7,color:"#fff"}]}>{item.title}</Text>
                <Text style={[styles.h6,{color:"grey",}]}>{item.description}</Text>
            </View>
        </View>
        </TouchableOpacity>
        </View>
    )

    render(){
        return(
            <View style={style.container}>

                <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={this.renderCenterComponent()}
                // rightComponent={this.renderRightComponent()}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                colors: ['black', 'black'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 }
                
                }}
                
            
            />
        
                
            {/* view for search bar */}
            <View style={{backgroundColor:"#000",height:100}} >
            <View style={{height:50,flexDirection:"row" ,backgroundColor:"#000",borderRadius:10,marginTop:10,
                shadowColor: 'grey',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.2,shadowRadius: 3,elevation:5,width:Dimensions.get('window').width/1.05,alignSelf:"center"}} >
            <View style={[style.search,{flexDirection:"row" ,backgroundColor:"#000",}]} >
                <Text style={{margin:10}}>
                    <Icon name="search" type="ionicon" color="#fff" 
                    // onPress={(e)=>this.searchField(e)}
                     size={25}/>
                </Text>
                <TextInput style={ {
                    width: '90%', height: 50, alignSelf: 'center',backgroundColor:"black",
                    fontFamily:Platform.OS =="android" ? 'Montserrat-Medium' : null, fontSize: 14,color:'#fff'
                    }}
                    autoFocus={true}
                    placeholder="Start typing to search..."
                    placeholderTextColor='#fff'
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(e) => this.searchField(e)}
                    returnKeyType="done"
                />
            </View>
            </View>
            
            </View>

        
        {!this.state.no_search ?
                <View>
              
                {!this.state.isloading?

                
                
                     
                     <View style={{marginTop:Platform.OS == "android" ? 10 : -10}}>
                          <FlatList
                        data={this.state.news}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        /> 
                         </View>
                        :
                        
                
                
                <View>
                    <ActivityIndicator />
                </View>
                }
                </View>:
                <View style={{ marginTop: 10,justifyContent:"center" }}>
                            
                <Image source={require('../img/images/nodata.webp')} style={{alignSelf:"center",width:300,height:300}}/>
                <Text style={{textAlign:'center',color:"#fff"}}>No Data Found</Text>
            </View>
         }
        
        </View>
        )
    }
}

export default Search;




const style = StyleSheet.create({
    search:{
        elevation:0,
        borderWidth:1,
        height:45,
        fontSize:15,
        borderColor:"transparent",
         borderRadius:10,
         alignSelf:"center",
         width:"95%",
         left:10
        },
        image:{
            width:45,
            height:45,
            marginTop:-5,
            borderWidth:2,
            borderColor:"#E0E0E0",
            borderRadius:50
        },
        container:{
            backgroundColor:"black",
            flex:1
        }

})