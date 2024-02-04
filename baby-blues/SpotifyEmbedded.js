import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const SpotifyEmbedded = ({
  setCurrentScreen,
  spotifyPlaylistEmbedUrl,
  backgroundColor,
  spotifyEmbedHeight
}) => {
  const spotifyEmbedWidth = Dimensions.get("window").width - 15;
  // const spotifyEmbedHeight = 500;

  const webViewWidth = spotifyEmbedWidth + 2;
  const webViewHeight = spotifyEmbedHeight + 2;

  return (
    <WebView
      originWhitelist={["*"]}
      style={{
        flex: 1,
        backgroundColor: `${backgroundColor}`,
        width: webViewWidth,
        height: webViewHeight,
        alignSelf: "center", // Center the WebView if it's smaller than the screen width
      }}
      source={{
        html: `
          <html>
          <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body, html {
              display: flex;
              height: 400px;
              background-color: ${backgroundColor}; /* Sets the background color */
              margin: 0;
            }
            iframe {
              border: 0;
              width: ${spotifyEmbedWidth}px;
              height: ${spotifyEmbedHeight}px;
              overflow: hidden;
            }
          </style>
          </head>
          <body>
          <iframe src="${spotifyPlaylistEmbedUrl}" width="${spotifyEmbedWidth}" height="${spotifyEmbedHeight}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> 
          </body>
          </html>
          `,
      }}
      allowsFullscreenVideo={true}
      mediaPlaybackRequiresUserAction={false}
    />
  );
};
// const styles = StyleSheet.create({
//   webView: {
//     flex: 1,
//     backgroundColor: "red",
//     width: webViewWidth,
//     height: webViewHeight,
//     alignSelf: "center", // Center the WebView if it's smaller than the screen width
//   },
// });

export default SpotifyEmbedded;
