import React from 'react'
import { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../AuthContextProvider';
import LinearGradient from 'react-native-linear-gradient';
class Profile extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            name: null,
            points: 0,
            level: 0,
            contact: "",
            email: ""
        }
    }

    componentDidMount() {
        this.get_profile_data();
    }

    segmentClicked = (index) => {
        this.setState({ activeIndex: index })
    }

    get_profile_data = () => {

        fetch(global.api_key + "get_user_profile", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': global.token
            }
        }).then((response) => response.json())
            .then((json) => {
                console.warn(json)
                if (!json.status) {
                    // Toast.show(json.msg)
                }
                else {
                    this.setState({ data: json.data })
                    this.setState({ name: json.data.name })
                    this.setState({ points: json.data.points })
                    this.setState({ level: json.data.level })
                    this.setState({ email: json.data.email })
                    this.setState({ contact: json.data.contact })
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
            <>
                {global.token == null ?
                    <ImageBackground style={styles.Container}>


                        
                        <View style={{ marginTop: 300, padding: 20 }}>
                            <Button
                                onPress={() => { this.context.logout() }}
                                icon={<Icon
                                    name="log-in-outline"
                                    size={15}
                                    color="white"
                                    type="ionicon"
                                />
                                }
                                iconLeft
                                title="Login Now" buttonStyle={{ backgroundColor: '#ff5b23' }}
                            />
                        </View>





                    </ImageBackground>
                    :
                    <ImageBackground style={styles.Container}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Image source={require('../img/bas1.jpg')}
                                    style={{
                                        width: 120, height: 120, borderRadius: 100, marginTop: 50, alignSelf: "center"
                                    }} />
                            </View>


                            {/* <View style={{ flex: 3 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, marginTop: 30, color: 'white' }}>{this.state.points}</Text>
                                <Text style={{ fontSize: 18, color: 'gray', }}>Points</Text>
                            </View>

                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, marginTop: 30, color: 'white' }}>{this.state.level}</Text>
                                <Text style={{ fontSize: 18, color: 'gray' }}>Level</Text>
                            </View>


                        </View></View> */}


                        </View>
                        <View>
                            <View style={{ marginTop: 25, marginBottom: 20 }} >
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, alignSelf: "center" }}>{this.state.name}</Text>
                                <Text style={{ color: 'white', fontSize: 16, alignSelf: "center" }}>{this.state.email}</Text>
                            </View>

                            <View style={{ marginTop: 100, padding: 20 }}>

                                {/* <TouchableOpacity 
                    onPress={()=>{this.props.navigation.navigate('EditProfile')}}
                    icon={ <Icon
                        name="create-outline"
                        size={15}
                        color="white"
                        />
                        }
                    iconLeft
                    style={{marginTop:100}}
                    title=" Edit Profile" buttonStyle={{backgroundColor:'#ff5b23'}}
                    /> */}

                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('EditProfile') }} style={styles.button1} >
                                    <View style={{ alignSelf: "center", flexDirection: "row", justifyContent: "center" }}>
                                        <Icon name="create-outline" type="ionicon" color='#FF900C' size={25} />
                                        <Text style={{ color: "#FF900C", fontSize: 16, marginTop: 3, marginLeft: 15 }}>Edit Profile</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ marginTop: 5, padding: 20 }}>


                                <TouchableOpacity onPress={() => { this.context.logout() }}
                                    style={styles.button1}>
                                    <View style={{ alignSelf: "center", flexDirection: "row", justifyContent: "center" }}>
                                        <Icon name="log-out-outline" type="ionicon" color='#FF900C' size={25} />
                                        <Text style={{ color: "#FF900C", fontSize: 16, marginTop: 3, marginLeft: 15 }}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>





                    </ImageBackground>
                }
            </>
        )
    }
}
export default Profile;

const styles = StyleSheet.create({

    Container:
    {
        paddingTop: 30,
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
    button1: {
        flexDirection: "row",
        width: Dimensions.get('window').width / 1.5,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#FF481F"
    }






})
