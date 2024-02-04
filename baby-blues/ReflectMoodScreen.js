import React from 'react';
import { View, Button, Text, StyleSheet, Linking } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { WebView } from 'react-native-webview';

const ReflectMoodScreen = ({ setCurrentScreen }) => {
  // Add a Spotify playlist to the ReflectMoodScreen
  const spotifyPlaylistEmbedUrl = `https://open.spotify.com/embed/playlist/42c9Dz92PuFD6LGrTNKvg4?utm_source=generator`;

  return (
    <View style={styles.screenContainer}>
      <Text>Reflect my mood</Text>
      <WebView
        style={styles.webView}
        source={{ 
          html: `
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              <iframe src="${spotifyPlaylistEmbedUrl}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> 
            </body>
            </html>
          `
         }}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
      <Text style={styles.chartTitle}>Mood Over Time</Text>
      <LineChart
        data={{
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [{
            data: [20, 45, 28, 80, 99, 43]
          }]
        }}
        width={300} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="pts"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Button title="Back to Home" onPress={() => setCurrentScreen('home')} />
    </View>
  );
};

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        width: '100%',
        borderWidth: 170, // For debugging
        borderColor: 'red', // For debugging
      },       
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default ReflectMoodScreen;