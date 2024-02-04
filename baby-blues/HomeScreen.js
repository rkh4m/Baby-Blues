import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ setCurrentScreen, currEmotion }) => {
  const emotionNouns = {
    Anger: "Frustrated",
    Anxiety: "Anxious",
    Joy: "Happy",
    Tiredness: "Tired",
    Love: "Loved",
    Sadness: "Sad",
    default: "",
  };
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <Text style={styles.title}>
          We Detect You're Feeling {emotionNouns[currEmotion]}...
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="Reflect my mood"
              onPress={() => {
                setCurrentScreen("reflectMood");
              }}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="Help me relax"
              onPress={() => {
                setCurrentScreen("relax");
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 100, // Adjust size accordingly
    height: 100, // Adjust size accordingly
    marginRight: 10, // Gives some space between the logo and the title
  },
  appTitle: {
    fontSize: 30,
    fontFamily: "Quicksand", // Make sure to load your custom font first
  },
  title: {
    fontSize: 24,
    // fontFamily: "Handlee", // Make sure to load your custom font first
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%", // Adjust the width as needed
  },
  buttonWrapper: {
    marginHorizontal: 10, // Creates a gap between buttons
  },
});

export default HomeScreen;
