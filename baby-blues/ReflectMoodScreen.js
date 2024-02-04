import React from "react";
import { View, Button, Text, StyleSheet, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import SpotifyEmbedded from "./SpotifyEmbedded";

const ReflectMoodScreen = ({ setCurrentScreen, currEmotion, moodPlaylist }) => {
  // Add a Spotify playlist to the ReflectMoodScreen
  const spotifyPlaylistEmbedUrl = `https://open.spotify.com/embed/playlist/${
    moodPlaylist[0] ? moodPlaylist[0].id : "0ZoGuZSXMa4Kd1eCZmoZdr"
  }?utm_source=generator`;

  const emotionNouns = {
    Anger: "Frustrated",
    Anxiety: "Anxious",
    Joy: "Happy",
    Tiredness: "Tired",
    Love: "Loved",
    Sadness: "Sad",
    default: "Happy",
  };

  const emotionColors = {
    Anger: "#E72222",
    Anxiety: "#f28c07",
    Joy: "#e0b359",
    Tiredness: "#70947b",
    Love: "#ff819f",
    Sadness: "#9bb3db",
    default: "#ededed",
  };

  console.log("currEmotion", currEmotion);
  // console.log("moodPlaylist", moodPlaylist[0].id);
  const backgroundColor = emotionColors[currEmotion] || "#ededed";

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
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
          <Text style={styles.headerText}>Feeling a Bit {emotionNouns[currEmotion]}...</Text>
        </View>
        <SpotifyEmbedded
          spotifyPlaylistEmbedUrl={spotifyPlaylistEmbedUrl}
          backgroundColor={backgroundColor}
          spotifyEmbedHeight={420}
        />
        <Text style={styles.chartTitle}>Mood Over Time</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={300} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="pts"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            paddingHorizontal: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    width: "100%",
    borderWidth: 170, // For debugging
    borderColor: "red", // For debugging
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
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

export default ReflectMoodScreen;
