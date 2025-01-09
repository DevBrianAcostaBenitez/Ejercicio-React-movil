import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import MovieDetail from '../components/MovieDetail';
import moment from 'moment';
const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: '39fb917b977d0ca50a1f6b379831d671',
              language: 'es-ES',
            },
          }
        );

        const data = response.data;
        const Details = {
          title: data.title,
          overview: data.overview,
          posterPath: data.poster_path,
          genres: data.genres.map(genre => genre.name).join(', '), 
          date: moment(data.release_date).format('DD/MM/YYYY'),
          runtime: data.runtime,
          voteAverage: data.vote_average,
        };

        setMovieDetails(Details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando detalles...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <MovieDetail details={movieDetails} />
    </ScrollView>
  );
};

export default MovieDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343536',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
});


