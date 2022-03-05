import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';


const EditProfileScreen = () => {
    const refRBSheet = useRef();




    return (
        <View style={{backgroundColor:'black',flex:1,paddingTop:30,paddingLeft:10,paddingRight:10}}>
            <Text  style={{color:'#eee',marginBottom:'5%'}}>Enter your Full name</Text>
              <View style={styles.action}>
                  <Ionicons 
                      name="person-outline"
                      color='#eeeeee'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Your Full name"
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
                      placeholder="Your Email"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: '#eeeeee'
                      }]}
                      autoCapitalize="none"
                     
                  />
                  
                  
                
              </View>

              <Text style={{color:'#eee',marginTop:'10%',marginBottom:'5%'}}>Enter your Contact</Text>
              <View style={styles.action}>
                  
                  <Ionicons 
                      name="mail-outline"
                      color='#eeeeee'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Your Contact"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: '#eeeeee'
                      }]}
                      autoCapitalize="none"
                     
                  />
                  
                  
                
              </View>

              <Text style={{color:'#eee',marginTop:'10%',marginBottom:'5%'}}>About You</Text>
              <View style={styles.action}>
                  
                  <Ionicons 
                      name="person-outline"
                      color='#eeeeee'
                      size={20}
                  />
                  <TextInput 
                      placeholder="Describe Yourself"
                      placeholderTextColor="#666666"
                      style={[styles.textInput, {
                          color: '#eeeeee'
                      }]}
                      autoCapitalize="none"
                     
                  />
                  
                  
                
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>this.props.navigation.navigate('Home')}
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

                
            </View>
        </View>
    );

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
export default EditProfileScreen;