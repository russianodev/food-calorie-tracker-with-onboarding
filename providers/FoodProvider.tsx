import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: string;
  timestamp: string;
  imageUrl?: string;
}

export const [FoodProvider, useFood] = createContextHook(() => {
  const [todaysFoods, setTodaysFoods] = useState<FoodItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadTodaysFoods();
  }, []);

  const loadTodaysFoods = async () => {
    try {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(`foods_${today}`);
      if (stored) {
        setTodaysFoods(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading foods:', error);
    }
  };

  const addFood = async (food: Omit<FoodItem, 'id' | 'timestamp'>) => {
    const newFood: FoodItem = {
      ...food,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedFoods = [...todaysFoods, newFood];
    setTodaysFoods(updatedFoods);
    
    const today = new Date().toDateString();
    await AsyncStorage.setItem(`foods_${today}`, JSON.stringify(updatedFoods));
    
    return newFood;
  };

  const analyzeFood = async (imageBase64: string): Promise<FoodItem> => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a nutrition expert. Analyze the food in the image and provide nutritional information. Return ONLY a JSON object with this exact format: {"name": "food name", "calories": number, "protein": number in grams, "carbs": number in grams, "fat": number in grams, "amount": "serving size"}. Be accurate with the estimates based on typical serving sizes.'
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Analyze this food and provide nutritional information:' },
                { type: 'image', image: imageBase64 }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      const nutritionData = JSON.parse(data.completion);
      
      return {
        id: Date.now().toString(),
        name: nutritionData.name,
        calories: nutritionData.calories,
        protein: nutritionData.protein,
        carbs: nutritionData.carbs,
        fat: nutritionData.fat,
        amount: nutritionData.amount,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing food:', error);
      // Return default values if analysis fails
      return {
        id: Date.now().toString(),
        name: 'Unknown Food',
        calories: 200,
        protein: 10,
        carbs: 25,
        fat: 8,
        amount: '1 serving',
        timestamp: new Date().toISOString()
      };
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFood = async (foodId: string) => {
    const updatedFoods = todaysFoods.filter(f => f.id !== foodId);
    setTodaysFoods(updatedFoods);
    
    const today = new Date().toDateString();
    await AsyncStorage.setItem(`foods_${today}`, JSON.stringify(updatedFoods));
  };

  return {
    todaysFoods,
    isAnalyzing,
    addFood,
    analyzeFood,
    removeFood
  };
});