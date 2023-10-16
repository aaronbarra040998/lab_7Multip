import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';
import axios from 'axios';

class App extends Component {
  state = {
    pokemonList: [],
  };

  componentDidMount() {
    const numberOfPokemon = 10;

    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ pokemonList: response.data.results });
        } else {
          console.error('Error en la solicitud:', response.status);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }

  renderPokemonCard = ({ item }) => (
    <Card style={styles.card}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
        style={styles.pokemonImage}
      />
      <Title style={styles.pokemonName}>{item.name}</Title>
    </Card>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pokémon</Text>
        <FlatList
          data={this.state.pokemonList}
          keyExtractor={item => item.name}
          renderItem={this.renderPokemonCard}
        />
      </View>
    );
  }
}

const imageSize = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    alignItems: 'center', // Centro los elementos en el contenedor
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
    width: imageSize,
    backgroundColor: '#ffffff',
    borderRadius: 8, // Bordes ligeramente redondeados
    elevation: 3,
  },
  pokemonImage: {
    width: imageSize,
    height: imageSize,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
