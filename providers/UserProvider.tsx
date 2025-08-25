import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  consumedCalories: number;
  consumedProtein: number;
  consumedCarbs: number;
  consumedFat: number;
  burnedCalories: number;
}

export const [UserProvider, useUser] = createContextHook(() => {
  const [userData, setUserData] = useState<UserData>({
    dailyCalories: 2000,
    proteinGrams: 150,
    carbsGrams: 200,
    fatGrams: 67,
    consumedCalories: 0,
    consumedProtein: 0,
    consumedCarbs: 0,
    consumedFat: 0,
    burnedCalories: 0
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const stored = await AsyncStorage.getItem('userData');
      if (stored) {
        const data = JSON.parse(stored);
        setUserData(prev => ({
          ...prev,
          dailyCalories: data.dailyCalories || 2000,
          proteinGrams: data.proteinGrams || 150,
          carbsGrams: data.carbsGrams || 200,
          fatGrams: data.fatGrams || 67
        }));
      }
      
      // Load today's consumption
      const today = new Date().toDateString();
      const todayData = await AsyncStorage.getItem(`consumption_${today}`);
      if (todayData) {
        const consumption = JSON.parse(todayData);
        setUserData(prev => ({ ...prev, ...consumption }));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updateConsumption = async (calories: number, protein: number, carbs: number, fat: number) => {
    const newData = {
      ...userData,
      consumedCalories: userData.consumedCalories + calories,
      consumedProtein: userData.consumedProtein + protein,
      consumedCarbs: userData.consumedCarbs + carbs,
      consumedFat: userData.consumedFat + fat
    };
    
    setUserData(newData);
    
    // Save today's consumption
    const today = new Date().toDateString();
    await AsyncStorage.setItem(`consumption_${today}`, JSON.stringify({
      consumedCalories: newData.consumedCalories,
      consumedProtein: newData.consumedProtein,
      consumedCarbs: newData.consumedCarbs,
      consumedFat: newData.consumedFat,
      burnedCalories: newData.burnedCalories
    }));
  };

  const updateBurnedCalories = async (calories: number) => {
    const newData = {
      ...userData,
      burnedCalories: userData.burnedCalories + calories
    };
    
    setUserData(newData);
    
    const today = new Date().toDateString();
    await AsyncStorage.setItem(`consumption_${today}`, JSON.stringify({
      consumedCalories: newData.consumedCalories,
      consumedProtein: newData.consumedProtein,
      consumedCarbs: newData.consumedCarbs,
      consumedFat: newData.consumedFat,
      burnedCalories: newData.burnedCalories
    }));
  };

  const getRemainingCalories = () => {
    return userData.dailyCalories - userData.consumedCalories + userData.burnedCalories;
  };

  const getCalorieProgress = () => {
    return Math.min((userData.consumedCalories / userData.dailyCalories) * 100, 100);
  };

  return {
    userData,
    updateConsumption,
    updateBurnedCalories,
    getRemainingCalories,
    getCalorieProgress
  };
});