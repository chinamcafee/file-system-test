import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useEffect } from 'react';

export default function App() {

  const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    console.log(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    'http://techslides.com/demos/sample-videos/small.mp4',
    FileSystem.cacheDirectory + 'small.mp4',
    {},
    callback
  );

  const load = async () => {
    console.log("start download ========");
    await downloadResumable.downloadAsync();
    console.log("end download ========");
  }

  useEffect(()=> {
    load();
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
