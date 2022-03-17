import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,ActivityIndicator
} from 'react-native';;

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContextProvider.js';
import Toast from 'react-native-simple-toast';

class FirstUserProfile extends Component
{
    static contextType=AuthContext;
    constructor(props)
    {
        super(props);
       this.state = {
        name: '',
        email: '',
        api_token:'',
        user_id:'',
        isLoading: false
        ,
      }
    }

    update_profile = () =>{
        let validation=/^[a-zA-Z" "]+$/;
        let isValid = validation.test(this.state.name)
          {
              this.setState({msg:""});
              if(this.state.name == "" && this.state.email == "")
              {
                  Toast.show("All fields are required !");
              }
              else if(!isValid){
                  Toast.show("Enter a valid name !");
              }
              else{
                  this.setState({isLoading:true});  
                  var name=this.state.name;
                  var email=this.state.email;
  
                  fetch(global.api_key+"update_profile_name", { 
                       method: 'POST',
                         headers: {    
                             Accept: 'application/json',  
                               'Content-Type': 'application/json',
                               'Authorization': global.token  
                              }, 
                               body: JSON.stringify({   
                                  email: email, 
                                  name: name,
                                    })}).then((response) => response.json())
                                       .then((json) => {
                                           console.warn(json)
                                           
                                            Toast.show("Profile successfully created!")
                                            global.use_type='done';
                                            AsyncStorage.getItem('@auth_login', (err, result) => {
                                                if (JSON.parse(result) != null) {
                                                  const data={"token":JSON.parse(result).token,"user_id":JSON.parse(result).user_id,"use_type":'done'};
                                                  AsyncStorage.setItem('@auth_login',JSON.stringify(data));
                                                  this.context.login('done');
                                                } 
                                            });
                                
                                           
                                          return json;    
                                      }).catch((error) => {  
                                              console.error(error);   
                                           }).finally(() => {
                                              this.setState({isLoading:false})
                                           });
              }
          }
      }

    // update_profile = () =>
    // {
        
    //      let validation=/^[a-zA-Z" "]+$/;
    //      let isValid = validation.test(this.state.name) 
    //     if(this.state.name != "")
    //     {
    //         this.setState({ isLoading: true });
    //         fetch(global.api_key+'update_profile_name', {
    //             method: 'POST',
    //             headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             Authorization: global.api_token
    //             },
    //             body: JSON.stringify({
    //                 name:this.state.name,
    //                 email:this.state.email,
    //                 user_token:global.user_id
    //                      })
    //             }).then((response) => response.json())
    //             .then((json) => {
    //               if(json.msg=='ok')
    //               {
    //                 try {
    //                     AsyncStorage.setItem('user_login',"yes" );
    //                   } catch (error) {
    //                    alert("nn")
    //                   }
    //               }
    //               else{
    //                 console.warn(json);
    //               }
    //             })
    //             .catch((error) => console.error(error))
    //             .finally(() => {
    //               this.setState({ isLoading: false });
    //             });
    //     }
    //     else{
    //         Toast.show('All fields are required!');
    //     }
    // }
    render()
    {
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor='#ff5b23' barStyle="light-content"/>
          <View style={styles.header}>
              <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View 
              animation="fadeInUpBig"
              style={[styles.footer, {
                  backgroundColor:'#000000'
              }]}
          >
              <Text  style={{color:'#eee',marginBottom:'5%'}}>Enter your Full name</Text>
              <View style={styles.action}>
                  <Ionicons 
                      name="person-outline"
                      color='#eeeeee'
                      size={20}
                  />
                  <TextInput 
                  onChangeText={(e) => {this.setState({name:e})}}
                      placeholder="Enter Your Full name"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: '#eeeeee'
                      }]}
                      autoCapitalize="none"
                     
                  />
             </View>
              <Text style={{color:'#eee',marginTop:'10%',marginBottom:'5%'}}>Enter your Email</Text>
              <View style={styles.action}>
                  
                  <Ionicons 
                      name="mail-outline"
                      color='#eeeeee'
                      size={20}
                  />
                  <TextInput 
                  onChangeText={(e) => {this.setState({email:e})}}
                      placeholder="Enter Your Email"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: '#eeeeee'
                      }]}
                      autoCapitalize="none"
                     
                  />
                  
              </View>

              <View style={styles.button}>
                {this.state.isLoading ?
                    <ActivityIndicator size="small" color="orange" />
                :

                <TouchableOpacity
                    style={styles.signIn}
                    onPress={this.update_profile}
                >
                <LinearGradient
                    colors={['#ff5b23', '#ff5b23']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Complete Profile</Text>
                </LinearGradient>
                </TouchableOpacity>
    }
                
            </View>
        </Animatable.View>
        </View>
          )
    }
}

export default FirstUserProfile;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#ff5b23'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });