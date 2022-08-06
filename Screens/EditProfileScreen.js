import React, { Component, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground,ActivityIndicator , TextInput, Button, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';


class  EditProfileScreen extends Component {

    constructor (props)
    {
        super(props);
        this.state={
            name:'',
            email:'',
            contact:'',
            about_us:'',
            isloading:false
        }
    }

    componentDidMount ()
    {
        this.get_profile_data();
    }

    get_profile_data = () =>{

        fetch(global.api_key+"get_user_profile", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':global.token 
            }
            }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
               if(!json.status){
                  // Toast.show(json.msg)
               }
                else
                {
                    this.setState({data:json.data})
                    this.setState({name:json.data.name})
                    this.setState({contact:json.data.contact})
                    this.setState({email:json.data.email})
                    this.setState({about:json.data.about})
                    // if(json.data.dob==null){
                    // this.setState({chosenDate:this.state.chosenDate})
                    // }
                    // else{
                    //     this.setState({chosenDate:json.data.dob})
                    // }
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
              this.setState({ isLoading: false });
            });
    }


    detailsUpdate = () =>
    {
       
       
        let validation=/^[a-zA-Z" "]+$/;
        let isValid = validation.test(this.state.name)
        {
            if(this.state.name == "")
            {
                Toast.show("User Name Field is required !");
            }
            else if(this.state.about == "")
            {
                Toast.show("About Field is required !");
            }
            else if(!isValid){
                Toast.show("Enter a valid name !");
            }
            else{
                this.setState({isloading:true});
                var email=this.state.email;
                var name=this.state.name;
                var about=this.state.about;;
                fetch(global.api_key+"update_profile", { 
                    method: 'POST',
                    headers: {    
                        Accept: 'application/json',  
                            'Content-Type': 'application/json',
                            'Authorization':global.token 
                            }, 
                            body: JSON.stringify({  
                                name:name, 
                                email: email, 
                                about:about,
                                })}).then((response) => response.json())
                                    .then((json) => {
                                     
                                        if(!json.status)
                                        {
                                            Toast.show(json.msg);
                                            Toast.show("Profile Could not be Updated.");
                                        }
                                        else{
                                            Toast.show("Profile Updated!");
                                            this.props.navigation.navigate("Profile")
                                        }

                                        
                                        return json;    
                                    }).catch((error) => {  
                                          
                                        }).finally(() => {
                                            this.setState({isloading:false})
                                        });
            }
        }
    }

    render()
    {
    return (
        <View style={{backgroundColor:'#000',flex:1,}}>
            <SafeAreaView style={{backgroundColor:'#000',flex:1,}}>

                {/* custom header */}
            <View style={[styles.header, { flexDirection: "row", justifyContent: "space-between" }]}>
               <View style={{ flexDirection: "row", left: 5, justifyContent: "center" }}>
                  <TouchableOpacity style={{ marginTop: 6 }} onPress={() => this.props.navigation.goBack()}>
                      <Icon name="chevron-back-outline" color="#fff" size={25} type="ionicon" />
                  </TouchableOpacity>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={styles.headerText}>Edit Profile</Text>
                  </View>
              </View>
            </View>


            <ScrollView>
                
            <Text  style={{color:'#fff',fontWeight:"bold",marginBottom:'5%',marginTop:20,marginLeft:20}}>Enter your Full name</Text>
              <View style={styles.action}>
                  <Icon 
                      name="person-outline"
                      color='#fff'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Your Full name"
                      placeholderTextColor="#FF900C"
                      style={[styles.textInput, {
                          color: '#FF900C'
                      }]}
                      autoCapitalize="none"
                     value={this.state.name}

                     onChangeText={(text) => {this.setState({name:text})}}
                  />
             </View>
              <Text style={{color:'#fff',fontWeight:"bold",marginTop:'10%',marginBottom:'5%',marginLeft:20}}>Enter your Email</Text>
              <View style={styles.action}>
                  
                  <Icon 
                      name="mail-outline"
                      color='#fff'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Your Email"
                      placeholderTextColor="#FF900C"
                      style={[styles.textInput, {
                          color: '#FF900C'
                      }]}
                    
                      autoCapitalize="none"
                      value={this.state.email}
                      onChangeText={(text) => {this.setState({email:text})}}
                  />
                  
                  
                
              </View>

              <Text style={{color:'#fff',fontWeight:"bold",marginTop:'10%',marginBottom:'5%',marginLeft:20}}>Enter your Contact</Text>
              <View style={styles.action}>
                  
                  <Icon 
                      name="call-outline"
                      color='#fff'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Your Contact"
                      placeholderTextColor="#FF900C"
                      style={[styles.textInput, {
                          color: '#FF900C'
                      }]}
                      autoCapitalize="none"
                      value={this.state.contact}
                  />
                  
                  
                
              </View>

              <Text style={{color:'#fff',fontWeight:"bold",marginTop:'10%',marginBottom:'5%',marginLeft:20}}>About You</Text>
              <View style={styles.action}>
                  
                  <Icon 
                      name="person-outline"
                      color='#fff'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Describe Yourself"
                      placeholderTextColor="#FF900C"
                      style={[styles.textInput, {
                          color: '#FF900C'
                      }]}
                      autoCapitalize="none"
                      value={this.state.about}

                      onChangeText={(text) => {this.setState({about:text})}}
                  />
                  
                  
                
              </View>
              {!this.state.isloading ?
              <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>this.detailsUpdate()}
                >
                <LinearGradient
                    colors={['#FF900C', '#FF481F']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Update Profile</Text>
                </LinearGradient>
                </TouchableOpacity>

                
            </View>:
            <View style={{height:100}}>
            <ActivityIndicator size="large" color="#326bf3"
            style={{top:35}}/>
        </View>
    }
            </ScrollView>
            </SafeAreaView>

            
        </View>
    );
                }

};

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
        paddingBottom: 5,
        width:Dimensions.get('window').width/1.1,
        marginLeft:20
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        width:Dimensions.get('window').width/1.5,
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
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    header: {
        backgroundColor: "#000",
        flexDirection: "row",
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop:25
      },
      headerText:{
        color:"#fff",
        alignSelf:"center",
        fontSize:18,
        left:10,
        fontWeight:"bold",
        marginTop:Platform.OS == "ios" ? 7 : 3,
      }
  });
export default EditProfileScreen;