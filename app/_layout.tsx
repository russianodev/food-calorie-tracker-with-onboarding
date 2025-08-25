import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OnboardingProvider } from "@/providers/OnboardingProvider";
import { UserProvider } from "@/providers/UserProvider";
import { FoodProvider } from "@/providers/FoodProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="subscription" options={{ headerShown: false }} />
      <Stack.Screen name="food-capture" options={{ 
        presentation: "modal",
        headerShown: false 
      }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OnboardingProvider>
          <UserProvider>
            <FoodProvider>
              <RootLayoutNav />
            </FoodProvider>
          </UserProvider>
        </OnboardingProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}