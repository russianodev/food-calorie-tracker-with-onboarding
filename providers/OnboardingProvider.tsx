import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface OnboardingData {
  gender?: 'male' | 'female' | 'other';
  workoutFrequency?: string;
  discoverySource?: string;
  previousTracking?: boolean;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  goal?: 'lose' | 'maintain' | 'gain';
  targetWeight?: number;
  weightChangeSpeed?: number;
  barriers?: string[];
  dietPreference?: string;
  accomplishments?: string[];
  workoutCalories?: boolean;
  rolloverCalories?: boolean;
  referralCode?: string;
  dailyCalories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatGrams?: number;
}

export const [OnboardingProvider, useOnboarding] = createContextHook(() => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboardingComplete');
      const subscribed = await AsyncStorage.getItem('isSubscribed');
      
      if (completed === 'true') {
        setIsOnboardingComplete(true);
      }
      if (subscribed === 'true') {
        setIsSubscribed(true);
      }
      
      // Navigate based on status
      if (completed !== 'true') {
        router.replace('/onboarding');
      } else if (subscribed !== 'true') {
        router.replace('/subscription');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 25) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    // Calculate recommended calories and macros based on user data
    const { weight, height, dateOfBirth, gender, goal, workoutFrequency } = onboardingData;
    
    // Basic BMR calculation (Mifflin-St Jeor Equation)
    const age = dateOfBirth ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear() : 25;
    const weightKg = weight || 70;
    const heightCm = height || 170;
    
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    
    // Activity factor
    let activityFactor = 1.2;
    if (workoutFrequency === '3-6') activityFactor = 1.55;
    if (workoutFrequency === '6+') activityFactor = 1.725;
    
    let dailyCalories = Math.round(bmr * activityFactor);
    
    // Adjust for goal
    if (goal === 'lose') dailyCalories -= 500;
    if (goal === 'gain') dailyCalories += 500;
    
    // Calculate macros (40% carbs, 30% protein, 30% fat)
    const proteinGrams = Math.round((dailyCalories * 0.3) / 4);
    const carbsGrams = Math.round((dailyCalories * 0.4) / 4);
    const fatGrams = Math.round((dailyCalories * 0.3) / 9);
    
    const finalData = {
      ...onboardingData,
      dailyCalories,
      proteinGrams,
      carbsGrams,
      fatGrams
    };
    
    setOnboardingData(finalData);
    await AsyncStorage.setItem('onboardingComplete', 'true');
    await AsyncStorage.setItem('userData', JSON.stringify(finalData));
    setIsOnboardingComplete(true);
    router.replace('/subscription');
  };

  const completeSubscription = async () => {
    await AsyncStorage.setItem('isSubscribed', 'true');
    setIsSubscribed(true);
    router.replace('/(tabs)');
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('onboardingComplete');
    await AsyncStorage.removeItem('isSubscribed');
    await AsyncStorage.removeItem('userData');
    setCurrentStep(1);
    setOnboardingData({});
    setIsOnboardingComplete(false);
    setIsSubscribed(false);
    router.replace('/onboarding');
  };

  return {
    currentStep,
    onboardingData,
    isOnboardingComplete,
    isSubscribed,
    isLoading,
    updateOnboardingData,
    nextStep,
    completeSubscription,
    resetOnboarding
  };
});