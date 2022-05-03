import React, { Component } from 'react';
import {
  View,Animated,StyleSheet,Text
} from 'react-native';
import {Header,Icon} from "react-native-elements";
import Toast from "react-native-simple-toast";
class LikeDislike extends React.Component {
constructor(props)
{
    super(props);
    this.state={
        status:false,
        like_count:this.props.like_count
    }
}

componentDidMount()
{
    if(this.props.islike != null)
    {
        this.setState({status:true});
    }
}

likeDislike= (id) =>
{
    if(this.state.status)
    {
        this.setState({status:false,like_count:this.state.like_count-1})
        var type="yes"
    }
    else
    {
        this.setState({status:true,like_count:this.state.like_count+1})
        var type="no"
    }

    fetch(global.user_api+'user_feed_like',{
        method:"POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization':global.token 
        },
        body:JSON.stringify({
          feed_id:id,
          type:type
        })
      })
      .then((response)=>response.json())
      .then((json)=>{
        // console.log(json)

        if(!json.status){

            if(this.state.status)
    {
        this.setState({status:false,like_count:this.state.like_count-1})

    }
    else
    {
        this.setState({status:true,like_count:this.state.like_count+1})

    }

          Toast.show(json.msg)
        }
        else
        {

              // Toast.show(json.msg)

          }

      });

}
  render() {

    return (
      <View >
       <Icon type="ionicon" name={this.state.status ? "heart" : "heart-outline"}
                  color={this.state.status ? "red" : "black"}
                  onPress={() => this.likeDislike(this.props.feed_id)} size={25}/> 

     {(this.state.like_count>0)?
        <Text style={{marginLeft:5,fontSize:10}}>

            {this.state.like_count} Likes

            </Text>
            :
            <></>

     }

      </View>
    );
  }
}


export default LikeDislike; 