import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

let TouchableCmp = TouchableOpacity;

if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}

const Recomm = (props) => {
  return (
    <View>
    <View styles={styles.recommList}>
      <TouchableCmp onPress={props.onSelect}>
        <View style={styles.main}>
        
            <Image
              source={{uri: props.artwork}}
              style={{height: 150, width: 150,alignSelf:'center',margin:5}}
            />
        
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.artist}>{props.artist}</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recommList: {
    width: height / 4.68,
    padding: height / 37.5,
    marginLeft: height / 15,
    backgroundColor:'red'
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: height / 5.3,
    width: height / 5,
    overflow: 'hidden',
    marginRight: height / 37.5,
    marginBottom: 5,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: height / 37.5,
  },
  title: {
    color: '#222',
    fontSize: 18,
    fontWeight:'bold',
    alignSelf:'center'
  },
  artist: {
    color: 'gray',
    alignSelf:'center'
  },
});

export default Recomm;
