import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const MovieDetail = ({ details }) => {
  return (
    <View>
      <View style={styles.aspectContainer}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w300${details.posterPath}` }}
          style={styles.image}
          imageStyle={{ borderRadius: 40 }}
        />
      </View>
      <View style={styles.container}>
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{details.title}</Text>

          <Text style={styles.plot}>{details.overview}</Text>

          <View style={styles.data}>
            <Text style={styles.genres}>{details.genres}</Text>
            <Text style={styles.date}>{details.date}</Text>
            <Text>Duración: {details.runtime} minutos</Text>
            <Text>Rating: {details.voteAverage}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieDetail;

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
  genres: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
