import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const LoginScreen = () => {
  const handleLogin = () => {
    // Logic for logging in to Spotify
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('/path/to/baby-blues-logo.png')} // Update with the correct path to the logo
          style={styles.logo}
        />
        <Text style={styles.title}>Baby Blues</Text>
      </View>
      <Button
        icon="spotify"
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        color="#1DB954" // Spotify color
      >
        Login with Spotify
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust size accordingly
    height: 100, // Adjust size accordingly
    marginRight: 10, // Gives some space between the logo and the title
  },
  title: {
    fontSize: 24,
    fontFamily: 'YourUniqueFont', // Make sure to load your custom font first
  },
  button: {
    marginTop: 20,
  },
});

export default LoginScreen;