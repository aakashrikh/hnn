import React, { Component } from 'react';
import {
    Text,View,SafeAreaView,
    Image,ImageBackground,
    Dimensions,StyleSheet
} from 'react-native';

//Global Style Import
const styles = require('../Components/Style.js');

const win = Dimensions.get('window');

class Splash extends Component {
    
    constructor(props){
        super(props);
    }

    

    render() {
        return (
            <SafeAreaView style={[style.container,{backgroundColor:"#000"}]}>
                <View style={[style.container,{alignItems:"center",justifyContent:"center"}]}>
                

                    {/* logo image */}
                    <Image source={require('../img/logo.png')} style={style.logo}/>
        
            </View>
            </SafeAreaView>
        )
    }
}

export default Splash;


//internal styling
const style=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff'
      },
    logo:{
        height:50,
        width:Dimensions.get('window').width/2,
        alignSelf:"center",
        justifyContent:"flex-end",
        top:600,
        
    },
    text:{
        alignSelf:"center",
        top:450,
        fontFamily:"Roboto-SemiBold",
        alignContent:"flex-end"
    },
    image:{
        height:"100%",
        width:"100%",
    }
})
