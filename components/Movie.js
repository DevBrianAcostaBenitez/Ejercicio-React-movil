import React from 'react';
import { View, StyleSheet, Text, Pressable, ImageBackground } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Movie = (props) => {
  const navigation = useNavigation();

  const goToDetails = () => {
    navigation.navigate('MovieDetailScreen', {
      movieId: props.id,
    });
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={goToDetails}>
        <View style={styles.aspectContainer}>
          <ImageBackground
            source={{ uri: props.image }}
            style={styles.image}
            imageStyle={{ borderRadius: 40 }}
          />
        </View>
      </Pressable>

      <Pressable style={styles.container} onPress={goToDetails}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{props.title}</Text>

          <Text style={styles.plot} numberOfLines={3}>
            {props.plot}
          </Text>

          <View style={styles.data}>
            <Text>{props.genre}</Text>
            <Text style={styles.date}>
              {moment(props.year).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: '#d4d4d4',
    marginTop: 20,
  },
  aspectContainer: {
    width: '100%',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    margin: 15,
  },
  plot: {
    fontSize: 18,
    fontWeight: '400',
    margin: 15,
  },
  data: {
    marginLeft: 15,
    marginBottom: 15,
  },
  date: {
    fontWeight: 'bold',
    color: '#e63946',
    fontSize: 14,
  },
});
