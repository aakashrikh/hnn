import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, FlatList,ActivityIndicator} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Text,ListItem, Avatar} from 'react-native-elements';
import Recomm from '../Components/Recomm';
import Song from '../models/Song';
const {width, height} = Dimensions.get('window');

class Podcast extends Component {
constructor (props)
{
    super();
}

  render()
  {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View  style={{backgroundColor: '#ec3005'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text onPress={()=>{this.props.navigation.navigate('hf')}} style={styles.header}>Podcast</Text>
        </View>
     
        <Pod_cat  navigation={this.props.navigation}/>
        <View style={{padding:10,backgroundColor:'#fff',borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <Podcast_list navigation={this.props.navigation} />
        </View>
     </View>   
    </ScrollView>
  );
  }
};

//component for find the list of podcast category
class Pod_cat extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { cat_data:false,list:[],  isLoading: true };
  }
  
   
  componentDidMount()
  {
    fetch(global.api_key+'podcast_cat')
    .then((response) => response.json())
    .then((json) => {
      
      this.setState({ list: json });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }


 renderSongItem = ({item,index}) => {
  return (
    <View style={{backgroundColor:'#fff',borderRadius:10,margin:5,shadowColor:'#ececec',elevation:5}}>
      <Recomm
        artwork={global.uri+item.p_c_image}
        title={item.p_c_name} 
        onSelect={()=> this.props.navigation.navigate('PodcastList', {
          itemId: item.id,CatImg: global.uri+item.p_c_image , cat_name: item.p_c_name})}
      />
      </View>
    );
  };

  render()
  {
    

    return (
      <View style={styles.recomm}>
      <FlatList
        horizontal
        data={this.state.list}
        renderItem={this.renderSongItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>

    )
  }
}

//component for find the list of podcast

class Podcast_list extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { cat_data:false,list:[],  isLoading: true };
  }
  
  componentDidMount()
  {
    fetch(global.api_key+'podcasts')
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
         <ActivityIndicator size="large" color="orange" />
        </View>
      )
    }
    else{
      var x=0;
      const pod_data = [];

      let podcasts = list.map((pd,id) => {
       pod_data.push(new Song(
          pd.id,
          '2',
          pd.podcast_name,
          pd.short_description,
          'https://res.cloudinary.com/dht1rd0lr/image/upload/v1600079503/soorma_fxyjnr.jpg',
          'https://pagalnew.com/mp3-songs/indipop-mp3-songs/teri-ada-kaushik-guddu-128-kbps-sound.mp3',
        )
       );

        return(
          <ListItem containerStyle={{backgroundColor:'#ffffff',color:'#222222',borderBottomWidth:1,borderBottomColor:'#ececec'}} onPress={()=>this.props.navigation.navigate('SongsPlay',{
            itemId: pd.id,son_data:pod_data})} >

          <Avatar  source={{uri: global.uri+pd.podcast_pic}} />
            <ListItem.Content> 
              <ListItem.Title style={{color:'#222222'}}>{pd.podcast_name}</ListItem.Title>
              <View style={styles.subtitleView}>
                <Text style={{color:'#222222'}}>{pd.short_description}</Text>
              </View>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem>
        )
        
        x=x+1;
      });
     
      return (
        <View>
          <Text h4 style={{marginTop:10,marginBottom:10,color:'#222222'}}>Latest Podcast</Text>
          {podcasts}
          </View>
      );
      }

  }
}


const styles = StyleSheet.create({
  
  welcome: {
    padding: height / 37,
  },
  header: {
    color: '#ffffff',
    fontSize: height / 25,
    paddingBottom: height / 37,
    paddingTop: height / 20,
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
    backgroundColor:'#ec3005'
    
  },
  recommText: {
    color: 'gray',
    fontSize: height / 41,
    marginBottom: height / 50,
    fontWeight: 'bold',
  },
});

export default Podcast;
