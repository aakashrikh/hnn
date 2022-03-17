import React, { Component } from 'react';
import {
  View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast';

class SignIn extends Component
{
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
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../img/logosmall.png')}
            style={styles.logo}
            />
        </View>
        <Animatable.View 
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
            </View>
        </Animatable.View>
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
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
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
      width:130,
      height:100
  },
  title: {
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold'
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
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
