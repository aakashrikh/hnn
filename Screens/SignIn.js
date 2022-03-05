import React, { Component } from 'react';
import type {Node} from 'react';
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

        this.state={contact_no:null,isLoading: false}
    }

    mobile_verify = () =>
    {
        if(this.state.contact_no != '')
        {
            this.setState({isLoading:true});
            var contact_no=this.state.contact_no;
            fetch(global.api_key+'mobile-verification', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact:contact_no
                         })
                }).then((response) => response.json())
                .then((json) => {
                    console.log(json);
                  if(json.msg=='ok')
                  {
                    this.props.navigation.navigate('Otp',{contact_no:contact_no});
                  }
                  else
                  {
                    Toast.show(json.msg);
                  }
                  this.setState({isLoading:false});
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
            source={{uri: 'https://hnn24x7.com/wp-content/uploads/2020/10/HNN-logo-300x146.png'}}
            style={styles.logo}
            resizeMode="stretch"
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
            <Input placeholder='Contact Number' onChangeText={(e) => {this.setState({contact_no:e})}}  placeholderTextColor="#eee"  leftIcon={
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
      width: height_logo,
      height:110
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
