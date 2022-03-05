import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';


const Playlist = () => {
 
    return (
        <>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SongsPlay')}>
                <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
                    <Image
                        source={{ uri: "https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252__340.jpg" }}
                        style={{
                            width: "45%",
                            height: 100
                        }}
                    />

                    <View style={{
                        paddingLeft: 7,

                    }}>
                        <Text style={{
                            fontSize: 15,
                            width: Dimensions.get("screen").width / 2,
                            color: 'white'
                        }}
                            ellipsizeMode='tail'
                            numberOfLines={3}
                        >this is amazing playlis zfmnsbfsj snjgschj scnzgcjs dhdhdhfhfhf dgdgd

            </Text>
                        <Text style={{ color: 'white' }}>Hey people</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>

    )
}

export default Playlist;