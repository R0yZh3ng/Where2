import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function Casino({ title, onPress, backgroundImage }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView}>
          <Pressable 
            onPress = {onPress}
            style = {({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <ImageBackground source = {backgroundImage} style= {styles.image} imageStyle = {{ borderRadius: 16 }}>
              <Text style={styles.title}>title</Text>
            </ImageBackground>
          </Pressable>

          <Pressable 
            onPress = {onPress}
            style = {({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <ImageBackground source = {backgroundImage} style= {styles.image} imageStyle = {{ borderRadius: 16 }}>
              <Text style={styles.title}>title</Text>
            </ImageBackground>
          </Pressable>
          
          <Pressable 
            onPress = {onPress}
            style = {({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <ImageBackground source = {backgroundImage} style= {styles.image} imageStyle = {{ borderRadius: 16 }}>
              <Text style={styles.title}>title</Text>
            </ImageBackground>
          </Pressable>
          
          <Pressable 
            onPress = {onPress}
            style = {({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <ImageBackground source = {backgroundImage} style= {styles.image} imageStyle = {{ borderRadius: 16 }}>
              <Text style={styles.title}>title</Text>
            </ImageBackground>
          </Pressable>


        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#fff",
    fontSize: 800,
  },
  scrollView: {
    backgroundColor: 'blue'
  },
  card: {
    height: 140,
    width: 400,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
