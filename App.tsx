import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Quiz from "./src/components/Quiz";
import { questions } from "./src/questions";

export default function App() {
  return (
    <View style={styles.container}>
      <Quiz questions={questions} />
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
