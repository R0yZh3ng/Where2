import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { router } from 'expo-router';
import { sharedStyles, colors } from '../../constants/styles';

const GAMES = [
  { title: 'coin', image: require('../../../../assets/images/coinFlip.png'), route: '/casino/coin'},
  { title: 'wheel', image: require('../../../../assets/images/wheel.png'), route: '/casino/wheel'},
  { title: 'finger', image: require('../../../../assets/images/fingerPicker.png'), route: '/casino/finger'},
  { title: 'number', image: require('../../../../assets/images/numberPicker.png'), route: '/casino/number'}



]

export default function Index({ title, onPress, backgroundImage }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={sharedStyles.container} edges={['top']}>
        <ScrollView style={sharedStyles.scrollView} contentContainerStyle={sharedStyles.scrollContent}>
          {GAMES.map((game) => (
            <Pressable 
              key={game.route}
              onPress = {() => router.push(game.route)}
              style={({ pressed }) => [
                sharedStyles.card,
                pressed && sharedStyles.cardPressed,
              ]}
            >
            <ImageBackground 
              source = {game.image}
              style = {sharedStyles.image}
              imagestyle = { sharedStyles.imageStyle }
            >
              <View style={sharedStyles.overlay}>
                <Text style={sharedStyles.title}>Coin Flip</Text>
              </View>
            </ImageBackground>
            </Pressable>
          ))}
                  </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


