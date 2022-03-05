import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,ActivityIndicator
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import Song from '../models/Song';
import Controller from '../Components/Controller';
import MySlider from '../Components/MySlider';

const {width, height} = Dimensions.get('window');

const SongsPlayScreen = (props) => {
// console.warn(props.route.params.son_data);
let arr=[{}];
   arr = props.route.params.son_data;
  const sId = '1';
  const gId = '2';
  
  const displayedSongs = arr.filter((song) => song.genre.indexOf(gId) >= 0);

  const scrollX = useRef(new Animated.Value(0)).current; //to prevent from re rendering
  const [songIndex, setSongIndex] = useState(0);
  const slider = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);


  useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log(value);
      const index = Math.round(value / width);
     // setSongIndex(index); //set the next song in queue
      console.log(index);
    });

    TrackPlayer.setupPlayer().then(async () => {
      console.log('Player ready');
      await TrackPlayer.add(displayedSongs);
     TrackPlayer.skip(sId); //to start from the selected song
     setIsPlayerReady(true);
     TrackPlayer.play();
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (isPlayerReady) {
      TrackPlayer.skip(displayedSongs[songIndex].id);
    }
  }, [songIndex]); //whenever scroll value changes hence songIndex changes then the songTrack will also skip to that id

  const goNext = () => {
    
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const goPrevious = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };
  const renderSongItem = ({item, index}) => {
    return (
      <View style={styles.imgContainer}>
        <Image
          source={{uri: item.artwork}}
          style={{height: height / 2.3, width: height / 2.3}}
        />
      </View>
    );
  };

  return (
  
    <View style={{backgroundColor: 'black', flex: 1}}>
      <SafeAreaView>
        <View style={styles.icon}>
          <Ionicons
            name="arrow-back"
            size={height / 30}
            color={'#eee'}
            onPress={() => props.navigation.goBack()}
          />
         
        </View>
        <View style={{justifyContent: 'center',
      alignItems: 'center',paddingTop:20}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={displayedSongs}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          initialScrollIndex={parseInt(sId)} //to start from a specific song in the specific genre
          ref={slider}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
        />
    </View>
      </SafeAreaView>
      <View style={styles.songinfoCont}>
        <Text style={styles.title} numberOfLines={1}>
          {displayedSongs[songIndex].title}
        </Text>
        <Text style={styles.artist}>{displayedSongs[songIndex].artist}</Text>
      </View>
      <MySlider />
      <Controller goNext={goNext} goPrev={goPrevious} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: height / 37.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgContainer: {
    width: width,
    alignItems: 'center',
  },
  songinfoCont: {
    padding: height / 37.5,
    alignItems: 'center',
    marginBottom: height / 150,
  },
  FeedImage:
  {
    width:250,
    height:250
  },
  title: {
    fontSize: height / 34,
    color: 'white',
    paddingBottom: height / 150,
  },
  artist: {
    fontSize: height / 41.6,
    color: 'gray',
  },
});

export default SongsPlayScreen;
