import {View,TextInput,StyleSheet,TouchableOpacity,Text} from 'react-native';
import React from 'react';

const SearchBar = (props)=>{
    return(
        <View style={styles.container}>
            <TextInput
                placeholder='Buscar'
                style={styles.input}
                value={props.searchText}
                onChangeText={(text)=>props.setSearchText(text)}
                onSubmitEditing={props.onSubmit}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container:{
        margin: 5,
        marginTop: 20,
        backgroundColor: '#444',
    },
    input:{
        backgroundColor: '#d4d4d4',
        padding: 10,
        borderRadius: 10,
        color: '#000',
        borderWidth: 1,
    },
});
