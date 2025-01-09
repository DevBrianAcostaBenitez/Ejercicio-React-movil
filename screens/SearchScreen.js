import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Movie from '../components/Movie';
import GenrePicker from '../components/GenrePicker';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [genreList, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();

  const getGenreNames = genreIds => {
    if (!genreIds || genreIds.length === 0) {
      return 'Unknown';
    }
    return genreIds
      .map(id => {
        const genre = genreList.find(genre => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(name => name)
      .join(', ');
  };

  const getMovies = useCallback(() => {
    const params = {
      api_key: '39fb917b977d0ca50a1f6b379831d671',
      language: 'es-ES',
      with_genres: selectedGenre || undefined,
      page: 1,
    };

    axios
      .get('https://api.themoviedb.org/3/discover/movie', {params})
      .then(response => {
        let results = response.data.results || [];
        if (searchText.trim()) {
          results = results.filter(movie =>
            movie.title.toLowerCase().includes(searchText.trim().toLowerCase()),
          );
        }
        setMovies(results.slice(0, 5));
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchText, selectedGenre]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: '39fb917b977d0ca50a1f6b379831d671',
          language: 'es-ES',
        },
      })
      .then(response => {
        setGenres(response.data.genres);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getMovies();
  }, [searchText, selectedGenre, getMovies]);

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSubmit={getMovies}
        />
        <GenrePicker
          genreList={genreList}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </View>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <Movie
            id={item.id}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            title={item.title}
            genre={getGenreNames(item.genre_ids)}
            year={
              item.release_date ? item.release_date.split('-')[0] : 'Unknown'
            }
            plot={item.overview}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343536',
  },
  filtersContainer: {
    backgroundColor: '#444',
  },
});
