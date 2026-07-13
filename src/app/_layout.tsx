import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Literata_600SemiBold,
  Literata_600SemiBold_Italic,
} from "@expo-google-fonts/literata";
import {
  BeVietnamPro_400Regular,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
} from "@expo-google-fonts/be-vietnam-pro";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Literata_600SemiBold,
    Literata_600SemiBold_Italic,
    BeVietnamPro_400Regular,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fbf9f8" },
        }}
      />
    </SafeAreaProvider>
  );
}
