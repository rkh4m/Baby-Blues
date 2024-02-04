// RelaxScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const RelaxScreen = ({ setCurrentScreen }) => {
  const spotifyPlaylistEmbedUrl = `https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator`;

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
      <Button title="Back to Home" onPress={() => setCurrentScreen('home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    width: '100%',
    borderWidth: 150, // For debugging
    borderColor: 'red', // For debugging
  },    
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RelaxScreen;