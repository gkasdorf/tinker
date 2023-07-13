import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ReactMarkdown from "react-markdown";
import {FlashList} from "@shopify/flash-list";

export default function App() {
  const text = `
  # Header
  ## Header two
  
  Some text
  
  *italic*
  
  **bold**
  `

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text><ReactMarkdown children={text} components={{p: Text, h1: Hone, h2: Htwo, strong: Htwo, em: Htwo}} /></Text>
      <StatusBar style="auto" />
    </View>
  );
}

function Hone({children}) {
  return (
    <Text style={{fontSize: 30}}>
      {children}
    </Text>
  );
}

function Htwo({children}) {
  return (
    <Text style={{fontSize: 20}}>
      {children}
    </Text>
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
