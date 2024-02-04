// RelaxScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import SpotifyEmbedded from "./SpotifyEmbedded";

const RelaxScreen = ({ setCurrentScreen, currEmotion, moodPlaylist }) => {
  const spotifyPlaylistEmbedUrl = `https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator`;

  console.log("currEmotion", currEmotion);
  // console.log("moodPlaylist", moodPlaylist);
  const backgroundColor = "#42f5e0";

  return (
    <SafeAreaView style={{
      flex: 1,
      width: "100%",
      borderColor: `${backgroundColor}`,
    }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: "100%",
          backgroundColor: `${backgroundColor}`,
        }}
      >
        <View style={styles.buttonContainer}>
          <Button title="Home" onPress={() => setCurrentScreen("home")} />
        </View>
        <Text style={styles.headerText}>Want to relax?</Text>
      </View>
      <SpotifyEmbedded
        spotifyPlaylistEmbedUrl={spotifyPlaylistEmbedUrl}
        backgroundColor={backgroundColor}
        spotifyEmbedHeight={600}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    width: "100%",
    borderWidth: 250, // For debugging
    borderColor: "red", // For debugging
  },
  screenContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute", // Position the button absolutely to ensure it sticks to the left
    left: 10, // Adjust the left margin as needed
  },
  headerText: {
    color: "#007AFF", // Match the button's color
    fontSize: 18, // Adjust the font size as needed
  },
});

export default RelaxScreen;
