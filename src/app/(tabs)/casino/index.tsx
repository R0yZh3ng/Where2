import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { router } from 'expo-router';

const GAMES = [
  { title: 'coin', image: require('../../../../assets/images/coinFlip.png'), route: '/casino/coin'},
  { title: 'wheel', image: require('../../../../assets/images/wheel.png'), route: '/casino/wheel'},
  { title: 'finger', image: require('../../../../assets/images/fingerPicker.png'), route: '/casino/finger'},
  { title: 'number', image: require('../../../../assets/images/numberPicker.png'), route: '/casino/number'}



]

export default function index({ title, onPress, backgroundImage }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView}>
          {GAMES.map((game) => (
            <Pressable 
              key={game.route}
              onPress = {() => router.push(game.route)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
            <ImageBackground 
              source = {game.image}
              style = {styles.image}
              imagestyle = {{ borderRadius: 16 }}
            >
              <Text style={styles.title}>Coin Flip</Text>
            </ImageBackground>
            </Pressable>
          ))}
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
    backgroundColor: '#25292e',
  },
  card: {
    height: 140,
    width: 350,
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
