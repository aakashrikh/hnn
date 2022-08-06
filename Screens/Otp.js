import React, { Component } from 'react';
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
import {AuthContext} from '../AuthContextProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class Otp extends Component
{
  static contextType = AuthContext;
  constructor(props)
    {
        super(props);

       this.state = {
        otpInput: '',
        contact_no:'',
        isLoading: false
      }
    }

      updateOtpText = () => {
        // will automatically trigger handleOnTextChange callback passed
        this.input1.setValue(this.state.inputText);
      };

      otp_verify = () =>
      {
        if(this.state.otpInput == ''){
          Toast.show("OTP is requried")
        }
        else{
          this.setState({ isLoading: true});
        var cc= this.props.route.params.contact_no;

        fetch(global.api_key+"otp-verification", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contact:cc,
                otp:this.state.otpInput,
                     })
            })
            .then((response) => response.json())
            .then((json) => {
              console.warn(json);
              if(json.msg=='ok')
              {
                global.user=json.usr;
                global.token="Bearer "+json.token;

                if(json.user_type=='login')
                {
                  
                  const data={"token":"Bearer "+json.token,"user_id":json.usr,"user_type":'login',"use_type":'done'};
                  AsyncStorage.setItem('@auth_login',JSON.stringify(data));
                  this.context.login("done");
                }
                else{
                 
                  const data={"token":"Bearer "+json.token,"user_id":json.usr,"user_type":'login',"use_type":'steps'};
                  AsyncStorage.setItem('@auth_login',JSON.stringify(data));
                  
                  this.context.login("steps");
                }
                
              }
              else{
                Toast.show(json.error);
              }
            })
            .catch((error) => console.error(error))
            .finally(() => {
              this.setState({ isLoading: false });
            });

        }

          // if(this.state.otpInput != null)
          // {
          //   this.setState({ isLoading: true});
          //     var cc= this.props.route.params.contact_no;

          //     fetch(global.api_key+'otp-verification', {
          //         method: 'POST',
          //         headers: {
          //         Accept: 'application/json',
          //         'Content-Type': 'application/json'
          //         },
          //         body: JSON.stringify({
          //             contact:cc,
          //             otp:this.state.otpInput
          //                  })
          //         })
          //         .then((response) => response.json())
          //         .then((json) => {
          //           console.warn(json);
          //           if(json.msg=='ok')
          //           {
          //             if(json.user_type=='login')
          //             {
          //               try {
          //                 AsyncStorage.setItem('token',"Bearer "+json.token );
          //                 AsyncStorage.setItem('user',json.usr );
          //                 AsyncStorage.setItem('user_login',"yes" );
          //               } catch (error) {
          //                alert("nn")
          //               }
                        
          //             }
          //             else{

          //               try {
          //                 AsyncStorage.setItem('token',"Bearer "+json.token );
          //                 AsyncStorage.setItem('user',json.usr );
          //               } catch (error) {
          //                alert("nn")
          //               }
                      
                        
          //               this.props.navigation.navigate('FirstUserProfile');
          //             }
          //           }
          //           else{
          //             Toast.show("Invalid OTP, Try Again");
          //           }
          //           this.setState({isLoading:false});
          //         })
          //         .catch((error) => console.error(error))
          //         .finally(() => {
          //           this.setState({ isLoading: false });
          //         });
          // }
          // else{
          //   alert("OTP requied");
          // }
      }
    render()
    {
      
      // ()=>this.props.navigation.navigate('FirstUserProfile')
        return(
          <View style={styles.container}>
            
            {/* custom header */}
               <View style={{  }}>
                  <TouchableOpacity style={{ marginTop:30,marginLeft:20 }} onPress={() => this.props.navigation.goBack()}>
                      <MaterialIcons name="arrow-back" color="#fff" size={25} />
                  </TouchableOpacity>
            </View>


            <View style={{alignItems: 'center',}}>
            <Text style={styles.instructions} h4>OTP Verification</Text>

                <Text style={{fontSize:14,fontWeight:"bold",color:"#fff"}}>Enter your OTP code here</Text>
                <OTPTextView
                  ref={(e) => (this.input1 = e)}
                  containerStyle={styles.textInputContainer}
                  handleTextChange={(text) => this.setState({otpInput: text})}
                  inputCount={4}
                  keyboardType="numeric"
                  tintColor="#FF481F"
                  offTintColor="#fff"
                />

                {this.state.isLoading?
                <ActivityIndicator size="large" color="#FF900C" />
                :
                <TouchableOpacity  onPress={()=>this.otp_verify()} style={{width:'80%',marginTop:30}}>
                <LinearGradient 
                        colors={['#FF900C', '#FF481F']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>OTP Verification</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                }
            </View>
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
      flex:1,
      // alignItems: 'center',
      backgroundColor: '#000',
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
      color: '#fff',
      marginBottom: 20,
      marginTop:20
    },
    textInputContainer: {
      marginBottom: 20,
      color:"#fff"
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
      borderColor: '#fff',
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