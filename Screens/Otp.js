import React, { Component } from 'react';
import type {Node} from 'react';
import {
  View, 
   
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,TextInput,Button,ActivityIndicator
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
class Otp extends Component
{
  constructor(props)
    {
        super(props);

       this.state = {
        otpInput: '',
        inputText: '',isLoading: false
      }
    }

      updateOtpText = () => {
        // will automatically trigger handleOnTextChange callback passed
        this.input1.setValue(this.state.inputText);
      };

      mobile_verify = () =>
      {
          if(this.state.otpInput != null)
          {
            this.setState({ isLoading: true});
              var cc= this.props.route.params.contact_no;

              fetch(global.api_key+'otp-verification', {
                  method: 'POST',
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      contact:cc,
                      otp:this.state.otpInput
                           })
                  })
                  .then((response) => response.json())
                  .then((json) => {
                    console.warn(json);
                    if(json.msg=='ok')
                    {
                      if(json.user_type=='login')
                      {
                        try {
                          AsyncStorage.setItem('token',"Bearer "+json.token );
                          AsyncStorage.setItem('user',json.usr );
                          AsyncStorage.setItem('user_login',"yes" );
                        } catch (error) {
                         alert("nn")
                        }
                        
                      }
                      else{

                        try {
                          AsyncStorage.setItem('token',"Bearer "+json.token );
                          AsyncStorage.setItem('user',json.usr );
                        } catch (error) {
                         alert("nn")
                        }
                      
                        
                        this.props.navigation.navigate('FirstUserProfile');
                      }
                    }
                    else{
                      Toast.show("Invalid OTP, Try Again");
                    }
                    this.setState({isLoading:false});
                  })
                  .catch((error) => console.error(error))
                  .finally(() => {
                    this.setState({ isLoading: false });
                  });
          }
          else{
            alert("OTP requied");
          }
      }
    render()
    {
      
      // ()=>this.props.navigation.navigate('FirstUserProfile')
        return(
            <View style={styles.container}>
            <Text style={styles.instructions} h4>OTP Verification</Text>

            <Text>Enter your OTP code here</Text>
            <OTPTextView
              ref={(e) => (this.input1 = e)}
              containerStyle={styles.textInputContainer}
              handleTextChange={(text) => this.setState({otpInput: text})}
              inputCount={4}
              keyboardType="numeric"
            />
           
           {this.state.isLoading?
 <ActivityIndicator size="small" color="#222222" />
           :
           <TouchableOpacity  onPress={this.mobile_verify} style={{width:'80%'}}>
           <LinearGradient 
                    colors={['#ff5b23', '#ff5b23']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>OTP Verification</Text>
                </LinearGradient>
                </TouchableOpacity>
    }
          </View>
          )
    }
}

export default Otp;

const styles = StyleSheet.create({
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
    container: {
      paddingTop:100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 5,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'left',
      color: '#333333',
      marginBottom: 20,
    },
    textInputContainer: {
      marginBottom: 20,
    },
    roundedTextInput: {
      borderRadius: 10,
      borderWidth: 4,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      width: '60%',
    },
    textInput: {
      height: 40,
      width: '80%',
      borderColor: '#000',
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      letterSpacing: 5,
      marginBottom: 10,
      textAlign: 'center',
    },
    buttonStyle: {
      marginHorizontal: 20,
    },
  });