import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedBackground = ({ initialColors, nextColors, children }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity for nextColors gradient

  useEffect(() => {
    // Start the animation on component mount and loop it
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={initialColors}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: fadeAnim, // Animate the opacity of the overlay gradient
          },
        ]}
      >
        <LinearGradient
          colors={nextColors}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedBackground;