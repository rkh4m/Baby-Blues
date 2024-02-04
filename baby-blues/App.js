import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ResponseType, useAuthRequest } from "expo-auth-session";
import HomeScreen from './HomeScreen';
import ReflectMoodScreen from './ReflectMoodScreen';
import RelaxScreen from './RelaxScreen';
import { Audio } from 'expo-av';

const App = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F833FF', '#33FFF8', '#F8FF33', '#FF5733'];
  const [colorIndex, setColorIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('home');

  const updateBackgroundColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [uri, setUri] = useState("");
  const [sound, setSound] = useState();
  const [jobId, setJobId] = useState("");

  const discovery = {
    authorizationEndpoint: 
    "https://accounts.spotify.com/authorize",
    tokenEndpoint: 
    "https://accounts.spotify.com/api/token",
  };
  const spotify_id = "6d152d9352c44a838f16f58b3428867f";
  const spotify_secret = "aa2e059bdc7f416baa098f4fb9957455";
  const username = "21rjjh2snnpahcustamm4lyei";
  const [emotion, setEmotion] = useState(null);
  const spotify_scope = "playlist-modify-public playlist-modify-private";
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = useAuthRequest({
      responseType: ResponseType.Token,
      clientId: spotify_id,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: "exp://172.29.35.99:8081",
    },
    discovery
  );

  const [moodPlaylist, setMoodPlaylist] = useState([]);

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
      console.log(access_token);
    } else {
      console.log("auth failed");
      console.log(response);
    }
  }, [response]);

  const getPlaylistBasedOnEmotion = async (emotion) => {
    console.log("Fetching playlist based on emotion")
    const url = `https://api.spotify.com/v1/search?q=${emotion.name}+playlist&type=playlist&market=US`;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      const fetchedPlaylists = json.playlists.items;
      setMoodPlaylist(json.playlists.items);
      fetchedPlaylists.forEach(element => {
        console.log(element.name + "\t" + element.href);
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function startRecording() {
    console.log('start recording..');
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);
    return uri;
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: uri});
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const uploadAndAnalyzeAudio = async (uri) => {  
    console.log("Uploading and analyzing audio")
    const formData = new FormData();
  
    formData.append('json', JSON.stringify({
      models: {
        prosody: {
          granularity: "utterance",
          window: {
            length: 4,
            step: 1
          },
        }
      }
    }));
    console.log("here")
    // Assuming `uri` is the local file path or a URL to the audio file
    formData.append('file', {
      uri: uri,
      type: 'audio/wav', // Set the correct content type for your file
      name: 'output.wav',
    });
  
    const url = 'https://api.hume.ai/v0/batch/jobs';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        "X-Hume-Api-Key": '8ytAuyeAWXRBgxrZ6f092E0C42osiBUmuVEYLn3QxbNecbJO'
      },
      body: formData,
    };
    console.log("after")
    try {
      console.log("fetcing" + uri)
      const response = await fetch(url, options);
      console.log("after fetcing")
      const json = await response.json();
      setJobId(json.job_id);
      console.log(json);
      return json.job_id;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAudioAnalysis = async (jobId) => {
    console.log("Fetching audio analysis")
    const url = `https://api.hume.ai/v0/batch/jobs/${jobId}/predictions`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json; charset=utf-8',
        'X-Hume-Api-Key': '8ytAuyeAWXRBgxrZ6f092E0C42osiBUmuVEYLn3QxbNecbJO'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(json[0].results.predictions[0].models.prosody.grouped_predictions[0].predictions[0].emotions);
        const allEmotions = json[0].results.predictions[0].models.prosody.grouped_predictions[0].predictions[0].emotions;
        const filterNames = new Set(["Anger", "Anxiety", "Joy", "Tiredness", "Love", "Sadness"]);
        const filteredEmotions = allEmotions.reduce((acc, emotion) => {
          if (filterNames.has(emotion.name)) { acc[emotion.name] = emotion.score; }
          return acc;
        }, {});

        let highestScoreEmotion = { name: "", score: 0 };
        Object.keys(filteredEmotions).forEach(emotionName => {
          if (filteredEmotions[emotionName] > highestScoreEmotion.score) {
            highestScoreEmotion.name = emotionName;
            highestScoreEmotion.score = filteredEmotions[emotionName];
          }
        });

        console.log("Emotion with the highest score:", highestScoreEmotion);
        setEmotion(highestScoreEmotion);
        return highestScoreEmotion;
      })
      .catch(err => console.error('error:' + err));
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  

  const speechEmotionAnalysis = async (text) => {
    const tempUri = await stopRecording();
    const tempJobId = await uploadAndAnalyzeAudio(tempUri);
    await delay(2000);
    const tempEmotion = await fetchAudioAnalysis(tempJobId);
    const tempPlaylist = await getPlaylistBasedOnEmotion(tempEmotion);
    setMoodPlaylist(tempPlaylist);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors[colorIndex] }]}>
      {currentScreen === 'home' && <HomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'reflectMood' && <ReflectMoodScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'relax' && <RelaxScreen setCurrentScreen={setCurrentScreen} />}
      <Button title="spotify auth" onPress={() => promptAsync()}/>
      <Button
        title={recording ? 'Stop Recording & Analyze' : 'Start Recording'}
        onPress={recording ? speechEmotionAnalysis : startRecording}
      />
      {/* <Button title="fetch playlist" onPress={getPlaylistBasedOnEmotion}/>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Upload and Analyze" onPress={() => uploadAndAnalyzeAudio(uri)} />
      <Button title="Fetch Analysis" onPress={() => fetchAudioAnalysis(jobId)} /> */}

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
