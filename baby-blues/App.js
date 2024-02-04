import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import ReflectMoodScreen from './ReflectMoodScreen';
import RelaxScreen from './RelaxScreen';

const App = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F833FF', '#33FFF8', '#F8FF33', '#FF5733'];
  const [colorIndex, setColorIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('home');

  const updateBackgroundColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors[colorIndex] }]}>
      {currentScreen === 'home' && <HomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'reflectMood' && <ReflectMoodScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'relax' && <RelaxScreen setCurrentScreen={setCurrentScreen} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
