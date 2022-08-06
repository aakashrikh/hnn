import React, { Component } from 'react';
import {
  View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,ActivityIndicator, ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../AuthContextProvider';

class SignIn extends Component
{
    static contextType = AuthContext;
    constructor(props)
    {
        super(props);
        this.state={
            contact_no:"",
            isLoading: false
        }
    }

    mobile_verify = () =>
    {
        var contact_no=this.state.contact_no;
        var phoneNumber = this.state.contact_no;
        let rjx= /^[0]?[6789]\d{9}$/;
        let isValid = rjx.test(phoneNumber)
        if(!isValid)
        {
            Toast.show('Enter valid mobile number!');
              
        }
        else{
            this.setState({isLoading:true});
            fetch(global.api_key+"mobile-verification", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact:contact_no,
                })
                }).then((response) => response.json())
                .then((json) => {
                    console.warn(json)
                    if(json.msg=='ok')
                    {
                        Toast.show('OTP sent successfully!');
                        this.props.navigation.navigate('Otp',{
                            contact_no:this.state.contact_no
                        });
                    }
                    else
                    {
                       Toast.show(json.error);
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => {
                  this.setState({ isLoading: false });
                });
            }
    }

 
    render()
    {
        return(
          <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <ScrollView>
                    <TouchableOpacity style={{justifyContent:"center",alignSelf:"flex-end",
                        marginRight:20,marginTop:20,borderRadius:5,borderWidth:1,borderColor:"#FF900C",padding:5,width:60,}}
                        onPress={()=>this.context.login("done")}>
                        <Text style={{color:"#FF900C",fontWeight:"700",fontSize:12,alignSelf:"center"}}>Skip</Text>
                    </TouchableOpacity>  
                <View style={styles.header}>
                    <Animatable.Image 
                        animation="bounceIn"
                        duraton="1500"
                    source={require('../img/logo.png')}
                    style={styles.logo}
                    />
                </View>

        
                <View style={{marginTop:80}}>
                    <Text style={[styles.title, {
                        color: '#eeeeee'
                    }]}>Stay connected with everyone!</Text>
                    <Input
                        placeholder='Enter your mobile number'
                        onChangeText={(e) => {this.setState({contact_no:e})}}  
                        placeholderTextColor="#E64939"  
                        keyboardType='number-pad'
                        maxLength={10}
                        leftIcon={
                            <MaterialIcons
                            name='phone'
                            size={24}
                            color='#E64939'
                            />
                        }
                        inputContainerStyle={styles.input}
                        inputStyle={{color:"#E64939"}}
                    />

                    {this.state.isLoading ?
                    <ActivityIndicator size="large" color="#FF900C" />
                    :
                    <TouchableOpacity onPress={this.mobile_verify}>
                        <LinearGradient
                            colors={['#FF900C', '#FF481F']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    }


                      
                </View>
            </ScrollView>

        {/* <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#ff5b23'
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: '#eeeeee'
            }]}>Stay connected with everyone!</Text>
            <View style={styles.button}>
            <Input
            placeholder='Enter your mobile number'
            onChangeText={(e) => {this.setState({contact_no:e})}}  
            placeholderTextColor="#eee"  
            keyboardType='number-pad'
            maxLength={10}
            leftIcon={
            <MaterialIcons
              name='phone'
              size={24}
              color='#eee'
              placeholderTextColor="#eee"
              style={{borderColor:'red'}}
            />
        }
/>
            {this.state.isLoading ?
            <ActivityIndicator size="small" color="#222222" />
            :
            <TouchableOpacity onPress={this.mobile_verify}>
                <LinearGradient
                    colors={['#333333', '#000000']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
             }

            <TouchableOpacity style={{justifyContent:"center",marginRight:25,marginTop:30}}
            onPress={()=>this.context.login("done")}>
                 <Text style={{color:"#fff",fontWeight:"bold",fontSize:16,textDecorationLine:"underline"}}>Skip for now</Text>
             </TouchableOpacity>    
            </View>
        </Animatable.View> */}
      </View>
          )
    }
}

export default SignIn;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000000'
  },
  header: {
    //   flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:150
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width:160,
      height:60
  },
  title: {
      color: '#05375a',
      fontSize: 18,
      fontWeight: '700',
      alignSelf:"center"
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
        width: Dimensions.get('window').width/1.5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignSelf:"center",
        marginTop:30
  },
  textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:16
  },
  input: { 
        alignSelf:"center",
        borderWidth:1,
        borderColor:'#E64939',
        borderRadius:10,
        paddingLeft:25,
        color: "#E64939", 
        fontSize: 15,
        width:Dimensions.get('window').width/1.15,
        marginTop:20
    }
});
