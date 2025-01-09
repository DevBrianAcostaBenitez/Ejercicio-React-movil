import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';
import axios from 'axios';
import GenrePicker from '../components/GenrePicker';
import Movie from '../components/Movie';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const getGenres = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: '39fb917b977d0ca50a1f6b379831d671',
            language: 'es-ES',
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Error al obtener géneros:', error);
    }
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || genreIds.length === 0) {
      return 'Unknown';
    }
    return genreIds
      .map((id) => {
        const genre = genreList.find((genre) => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name)
      .join(', ');
  };

  const getRandomMovies = () => {
    const totalPages = 200;
    axios
      .get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '39fb917b977d0ca50a1f6b379831d671',
          page: Math.floor(Math.random() * totalPages) + 1,
          language: 'es-ES',
        },
      })
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results.slice(0, 5));
        }
      })
      .catch((error) => {
        console.error('Error al obtener películas:', error);
      });
  };

  const getMoviesByGenre = (genreId) => {
    const totalPages = 200;

    axios
      .get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '39fb917b977d0ca50a1f6b379831d671',
          with_genres: genreId,
          page: Math.floor(Math.random() * totalPages) + 1,
          language: 'es-ES',
        },
      })
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results.slice(0, 5));
        }
      })
      .catch((error) => {
        console.error('Error al obtener películas:', error);
      });
  };

  useEffect(() => {
    getGenres();
    getRandomMovies();
  }, []);

  useEffect(() => {
    if (selectedGenre !== null) {
      getMoviesByGenre(selectedGenre);
    } else {
      getRandomMovies();
    }
  }, [selectedGenre]);

  return (
    <SafeAreaView style={styles.container}>
      <GenrePicker
        genreList={genreList}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Movie
            id={item.id}
            image={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
            title={item.title}
            year={item.release_date ? item.release_date.split('-')[0] : 'Unknown'}
            genre={getGenreNames(item.genre_ids)}
            plot={item.overview}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343536',
  },
});
