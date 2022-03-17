import React, { Component } from 'react';
import {
    View,ImageBackground,
    StyleSheet,Pressable,FlatList,
    Image,Text,TouchableOpacity,ActivityIndicator, Dimensions,Linking
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const win = Dimensions.get('window');
const ratio = win.width/541; //541 is actual image width

//Global Style Import
const styles = require('./Style.js');

class CategoriesHome extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            isloading:false,
            parent_id:0
        }
    }
    componentDidMount(){
        this.get_all_category();
        
    }

    get_all_category=()=>
    {
        this.setState({isloading:true})
            fetch(global.user_api+'get_all_category?category_id=0', {
            method: 'GET',
            })
            .then((response) => response.json())
            .then((json) => {
                console.warn(json.data)
                this.setState({data:json.data })                
                return json;
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isloading: false });
                
            });
    }
    renderItem=({item})=>(
        <View>
       <View style={[style.card]}>
                    <View style={{flexDirection:"row",width:"50%"}}>
                       
                                <TouchableOpacity style={style.button}
                                onPress={()=>{Linking.openURL(item.app_link)}}
                                
                                // onPress={()=>this.props.navigation.navigate("ShopsList",{category_id:item.id,category_name:item.category_name})}
                                >
                                    <Image 
                                    source={{uri:item.link}}
                                    style={style.image} />
                                    <Text style={style.text} numberOfLines={2}>
                                        {item.category_name}
                                    </Text>
                                </TouchableOpacity>
                      
                    </View>
                </View>
               
    </View>
    )
    render(){
            return(
            
                    <View style={[styles.container,]}>
            {!this.state.isloading ?
       

            <FlatList
            numColumns={4}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            style={{marginTop:10}}
            />    :
            
            <SkeletonPlaceholder>
           <View style={{ flexDirection: "row", alignItems: "center",marginTop:5 }}>
             <View style={{ marginLeft: 5}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft:  2}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
           </View>

           <View style={{ flexDirection: "row", alignItems: "center",marginTop:2 }}>
             <View style={{ marginLeft: 5}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft:  2}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center",marginTop:2 }}>
             <View style={{ marginLeft: 5}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft:  2}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
           </View>
           <View style={{ flexDirection: "row", alignItems: "center",marginTop:2 }}>
             <View style={{ marginLeft: 5}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft:  2}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
           </View>

           <View style={{ flexDirection: "row", alignItems: "center",marginTop:2 }}>
             <View style={{ marginLeft: 5}}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             <View style={{ marginLeft: 2 }}>
               <View style={{ width:win.width/4.2, height: 80, borderRadius: 4 }} />
              
             </View>
             
           </View>
         </SkeletonPlaceholder>
    }
               </View>
                // <View>
                //     {!this.state.isloading ?
                //     <View>
                        
                //         <View style={[style.card,{marginTop:10}]}>
                //                 <View style={{flexDirection:"row",width:"100%"}}>
                //                     {this.state.data.slice(0,4).map((value) =>{
                //                         return(
                //                             <TouchableOpacity style={style.button}
                //                             onPress={()=>this.props.navigation.navigate("ShopsList",{category_id:value.id,category_name:value.category_name})}>
                //                                 <Image 
                //                                 source={{uri:value.link}}
                //                                 style={style.image} />
                //                                 <Text style={style.text}>
                //                                     {value.category_name}
                //                                 </Text>
                //                             </TouchableOpacity>
                //                         )
                //                     })}
                //                 </View>
                //             </View>
                //             <View style={style.card}>
                //                 <View style={{flexDirection:"row",width:"100%"}}>
                //                     {this.state.data.slice(4,8).map((value) =>{
                //                         return(
                //                             <TouchableOpacity style={style.button}
                //                             onPress={()=>this.props.navigation.navigate("ShopsList",{category_id:value.id,category_name:value.category_name})}>
                //                                 <Image 
                //                                 source={{uri:value.link}}
                //                                 style={style.image} />
                //                                 <Text style={style.text}>
                //                                     {value.category_name}
                //                                 </Text>
                //                             </TouchableOpacity>
                //                         )
                //                     })}
                //                 </View>
                //             </View>
                
                //             <View style={style.card}>
                //                 <View style={{flexDirection:"row",width:"100%"}}>
                //                     {this.state.data.slice(8,12).map((value) =>{
                //                         return(
                //                             <TouchableOpacity style={style.button}
                //                             onPress={()=>this.props.navigation.navigate("ShopsList",{category_id:value.id,category_name:value.category_name})}>
                //                                 <Image 
                //                                 source={{uri:value.link}}
                //                                 style={style.image} />
                //                                 <Text style={style.text}>
                //                                     {value.category_name}
                //                                 </Text>
                //                             </TouchableOpacity>
                //                         )
                //                     })}
                //                 </View>
                //             </View>

                //             <View style={style.card}>
                //                 <View style={{flexDirection:"row",width:"100%"}}>
                //                     {this.state.data.slice(12,15).map((value) =>{
                //                         return(
                //                             <TouchableOpacity style={style.button}
                //                             onPress={()=>this.props.navigation.navigate("ShopsList",{category_id:value.id,category_name:value.category_name})}>
                //                                 <Image 
                //                                 source={{uri:value.link}}
                //                                 style={style.image} />
                //                                 <Text style={style.text}>
                //                                     {value.category_name}
                //                                 </Text>
                //                             </TouchableOpacity>
                //                         )
                //                     })}
                //                 </View>
                //             </View>
                //     </View> 
                //     :
                //     <View style={{marginTop:20,backgroundColor:"#fff", shadowRadius: 50,height:40,width:40,
                //     shadowOffset: { width: 50, height: 50 },elevation:5,borderRadius:50,padding:5,alignSelf:"center"}}>
                //          <ActivityIndicator color="#326bf3" size="large" />
                //     </View>
                //     }
                // </View>
            )
    }
}

export default CategoriesHome;

const style=StyleSheet.create({
    card:{
        backgroundColor:"#fff",
        marginTop:0,
        // height:"100%"
    },
    image:{
        height:35,
        width:35,
        alignContent:"center",
        alignSelf:"center",
        alignItems:"center",
    },
    text:{
        fontFamily:"Roboto-Regular",
        fontSize:RFValue(10, 580),
        textAlign:"center",
        marginTop:5
    },
    button:{
        padding:10,
        height:85,
        width:Dimensions.get('window').width/4,
        borderWidth:0.2,
        borderColor:"#d3d3d3"
    }

})