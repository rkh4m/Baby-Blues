import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ setCurrentScreen }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.title}>Feeling Angry?</Text>
    <View style={styles.buttonContainer}>
      <View style={styles.buttonWrapper}>
        <Button title="Reflect my mood" onPress={() => {setCurrentScreen('reflectMood')} } />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Help me relax" onPress={() => {setCurrentScreen('relax')} } />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%', // Adjust the width as needed
  },
  buttonWrapper: {
    marginHorizontal: 10, // Creates a gap between buttons
  },
});

export default HomeScreen;

