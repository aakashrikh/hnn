import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, FlatList,ActivityIndicator} from 'react-native';
import { Text,ListItem, Avatar,Image} from 'react-native-elements';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import Song from '../models/Song';

//component for find the list of podcast

class PodcastList extends Component
{
  constructor (props)
  {
    super(props);
  }
   render()
  {
    return (
      <View>
      <View style={{justifyContent: 'center',
      alignItems: 'center',paddingTop:20}}>
        <Image 
         style={styles.FeedImage} 
         source= {{uri: this.props.route.params.CatImg}}
         PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />}
        />
         <Text h4 style={{marginTop:10,marginBottom:10}}>{this.props.route.params.cat_name}</Text>
    </View>
       <Podcast_list podcat_id={this.props.route.params.itemId} navigation={this.props.navigation}/>
    </View>

    )
  }
}


class Podcast_list extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { cat_data:false,list:[],  isLoading: true };
  }
  
  componentDidMount()
  {

    fetch(global.api_key+'podcasts/'+this.props.podcat_id)
    .then((response) => response.json())
    .then((json) => {
      
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
      const pod_data = [];
      let podcasts = list.map((pd,id) => {
        pod_data.push(new Song(
          pd.id,
          '2',
          pd.podcast_name,
          pd.short_description,
          'https://res.cloudinary.com/dht1rd0lr/image/upload/v1600079503/soorma_fxyjnr.jpg',
          pd.podcast_link,
        )
       );

        return(
          <ListItem  onPress={()=>this.props.navigation.navigate('SongsPlay',{
            itemId: pd.id,son_data:pod_data})}
             >
          <Avatar  source={{uri: global.uri+pd.podcast_pic}} />

            <ListItem.Content> 
              <ListItem.Title >{pd.podcast_name}</ListItem.Title>
              <View style={styles.subtitleView}>
                <Text >{moment(pd.updated_at).fromNow()}</Text>
              </View>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
        )
      })
     
      return (
        <View>
          <Text h4 style={{marginTop:10,marginBottom:10,color:'#222'}}> Podcast List</Text>
          {podcasts }
          </View>
      );
      }

  }
}


export default PodcastList;

const styles = StyleSheet.create({
  
    welcome: {
      padding: height / 37,
    },
    header: {
      color: 'white',
      fontSize: height / 25,
      paddingBottom: height / 37,
      paddingTop: height / 50,
      paddingLeft: width / 25,
      fontWeight: 'bold',
    },
    subHeader: {
      fontSize: height / 41,
      color: 'gray',
      paddingBottom: height / 75,
      paddingLeft: width / 25,
      fontWeight: 'bold',
    },
    listOfGenres: {
      flex: 1,
      marginBottom: height / 37,
    },
  
    recomm: {
      padding: height / 75,
      
    },
    recommText: {
      color: 'gray',
      fontSize: height / 41,
      marginBottom: height / 50,
      fontWeight: 'bold',
    },
    FeedImage: {
      width:150,
      height:150,
      borderRadius:5,
      
    },
  });
  