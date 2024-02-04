// RelaxScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RelaxScreen = ({ setCurrentScreen }) => (
  <View style={styles.screenContainer}>
    <Text>Help me relax</Text>
    <Button title="Back to Home" onPress={() => {setCurrentScreen('home')}} />
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RelaxScreen;