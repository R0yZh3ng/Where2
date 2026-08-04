import { Stack } from "expo-router";

export default function CasinoLayout() {
  return (
    <Stack screenOptions= {{ headerShown: false }}>
      <Stack.Screen name = "index" options = {{ headerShown: false}}/>
      <Stack.Screen name = "coin" options= {{ headerShown: false }}/>
      <Stack.Screen name = "wheel" options = {{ headerShown: false }}/>
      <Stack.Screen name = "finger" options = {{ headerShown: false }}/>
      <Stack.Screen name = "number" options = {{ headerShown: false }}/>
    </Stack>
  );
}
