import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Component } from 'react';


class Card  extends Component {
    constructor(props)
    {
      super(props);
      this.state = { cat_data:false,list:[],  isLoading: true };
    }
    

    componentDidMount()
    {
      
      fetch(global.api_key+'news_videos')
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        this.setState({ list: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
    }

    
    render()
  {
    const { isLoading,list } = this.state;
    if(isLoading)
    {
      return(
        <View>
          <ActivityIndicator/> 
        </View>
      )
    }
    else{
      let Video = list.map((pd,id) => {
        return(
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('VideoContent',{
                video_url:pd.video_link })}}>
           
            <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
            
                <Image
                    source={{ uri: global.uri+pd.video_pic }}
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
                    >{pd.video_name}

        </Text>
                    <Text style={{ color: 'white' }}>{pd.n_c_categories}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )
      })
      return (
        <View>
        
          {Video}
          </View>
      );
      
      }

  }
    
}

export default Card;