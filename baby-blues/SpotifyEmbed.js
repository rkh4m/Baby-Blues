// SpotifyEmbed.js
import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SpotifyEmbed = ({ playlistUrl }) => {
  const embedHtml = `
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <iframe src="${playlistUrl}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: embedHtml }}
      style={{ width: Dimensions.get('window').width, height: 400 }}
    />
  );
};

export default SpotifyEmbed;