import React from 'react'
import { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            name:null
        }
    }

    componentDidMount()
    {

    }

    segmentClicked = (index) => {
        this.setState({ activeIndex: index })
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View style={styles.post}>
                    <Text style={styles.posttext1}>
                        100 points
                  </Text>

                    <Text style={styles.posttext2}>
                        for starting your gamified
                  </Text>

                    <Text style={styles.posttext3}>
                        journey step up your profile
                  </Text>

                </View>
            )
        }


    }
    render() {
        return (
            <ImageBackground style={styles.Container}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../img/bas1.jpg')}
                            style={{
                                width: 75, height: 75, borderRadius: 37.5, marginTop: 20, marginLeft: 15
                            }} />
                    </View>


                    <View style={{ flex: 3 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, marginTop: 30, color: 'white' }}>0</Text>
                                <Text style={{ fontSize: 20, color: 'gray', }}>Points</Text>
                            </View>

                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, marginTop: 30, color: 'white' }}>0</Text>
                                <Text style={{ fontSize: 20, color: 'gray' }}>Level</Text>
                            </View>


                        </View></View>


                </View>
                <View>
                    <View style={{ marginTop: 25, marginLeft: 20,marginBottom:20 }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15 }}>Rajat Walia</Text>
                        {/* <Text style={{ color: 'white', fontSize: 15 }}>Love|Light|Truth</Text> */}
                    </View>

                    <View>

                    <Button 
                    onPress={()=>{this.props.navigation.navigate('EditProfile')}}
                    icon={ <Icon
                        name="create-outline"
                        size={15}
                        color="white"
                        />
                        }
                    iconLeft
                    title=" Edit Profile" buttonStyle={{backgroundColor:'#ff5b23'}}
                    />

                    </View>



                </View>
              




            </ImageBackground>

        )
    }
}
export default Profile;

const styles = StyleSheet.create({

    Container:
    {
        paddingTop:30,
        flex: 1,
        // Set hex color code here.
        backgroundColor: 'black',

    },
    button: {
        backgroundColor: 'black',
        height: 35,
        marginTop: 30,

        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 370,
        marginLeft: 55,


        borderWidth: 1,
        borderColor: 'gray',

    },

    text: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 17,


    },

    text3: {
        color: 'white',
        alignSelf: 'center',
        marginTop: 8
    },



    terms: {
        borderWidth: 2,
        borderColor: 'red',
        width: 90,
        height: 40,



    },



    /*styling for Post button data */
    post: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 200,
        width: 340,
        alignSelf: 'center',
        borderRadius: 25,
        marginTop: 30,
        backgroundColor: 'red'
    },

    posttext1: {
        marginTop: 70,
        fontSize: 25,
        alignSelf: 'center',
        color: 'white'
    },
    posttext2: {

        fontSize: 20,
        alignSelf: 'center',
        color: 'white'

    },
    posttext3: {

        fontSize: 25,
        alignSelf: 'center',
        color: 'white'
    },






})
