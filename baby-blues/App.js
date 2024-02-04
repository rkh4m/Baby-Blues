import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
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
  const [uri, setUri] = useState(String);
  const [sound, setSound] = useState();
  const [jobId, setJobId] = useState();

  async function startRecording() {
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
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: uri});
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const uploadAndAnalyzeAudio = async (audioUri) => {  
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
  
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setJobId(json.job_id);
      console.log(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAudioAnalysis = async (jobId) => {
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
      })
      .catch(err => console.error('error:' + err));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors[colorIndex] }]}>
      {currentScreen === 'home' && <HomeScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'reflectMood' && <ReflectMoodScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'relax' && <RelaxScreen setCurrentScreen={setCurrentScreen} />}
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Upload and Analyze" onPress={() => uploadAndAnalyzeAudio(uri)} />
      <Button title="Fetch Analysis" onPress={() => fetchAudioAnalysis(jobId)} />
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
