// components/Picker.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GenrePicker = ({ genreList, selectedGenre, setSelectedGenre }) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>Género</Text>
      <Picker
        selectedValue={selectedGenre}
        onValueChange={(itemValue) => setSelectedGenre(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos los generos" value={null} />
        {genreList.map((genre) => (
          <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    padding: 2,
    backgroundColor: '#444',
  },
  pickerLabel: {
    color: 'white',
    marginBottom: 3,
    fontSize: 16,
  },
  picker: {
    color: 'white',
    height: 50,
    width: '100%',
  },
});

export default GenrePicker;
