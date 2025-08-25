import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Camera, X, Check, Edit2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFood } from '@/providers/FoodProvider';
import { useUser } from '@/providers/UserProvider';

export default function FoodCaptureScreen() {
  const { analyzeFood, addFood, isAnalyzing } = useFood();
  const { updateConsumption } = useUser();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [foodData, setFoodData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageUri(result.assets[0].uri);
      const analyzed = await analyzeFood(result.assets[0].base64);
      setFoodData(analyzed);
      setEditedData(analyzed);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageUri(result.assets[0].uri);
      const analyzed = await analyzeFood(result.assets[0].base64);
      setFoodData(analyzed);
      setEditedData(analyzed);
    }
  };

  const handleSave = async () => {
    if (editedData) {
      await addFood(editedData);
      await updateConsumption(
        editedData.calories,
        editedData.protein,
        editedData.carbs,
        editedData.fat
      );
      router.back();
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <X size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Food</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!imageUri ? (
          <View style={styles.captureSection}>
            <Text style={styles.title}>Capture Your Food</Text>
            <Text style={styles.subtitle}>
              Take a photo or choose from gallery to analyze nutrition instantly
            </Text>
            
            <TouchableOpacity onPress={takePhoto}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.captureButton}
              >
                <Camera size={32} color="#FFF" />
                <Text style={styles.captureButtonText}>Take Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultSection}>
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.foodImage} />
            )}
            
            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.analyzingText}>Analyzing your food...</Text>
              </View>
            ) : foodData ? (
              <View style={styles.nutritionContainer}>
                <View style={styles.nutritionHeader}>
                  <Text style={styles.foodName}>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInput}
                        value={editedData.name}
                        onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                      />
                    ) : (
                      editedData.name
                    )}
                  </Text>
                  <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Edit2 size={20} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.servingSize}>{editedData.amount}</Text>
                
                <View style={styles.nutritionGrid}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInputSmall}
                        value={editedData.calories.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => setEditedData({ ...editedData, calories: parseInt(text) || 0 })}
                      />
                    ) : (
                      <Text style={styles.nutritionValue}>{editedData.calories}</Text>
                    )}
                  </View>
                  
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInputSmall}
                        value={editedData.protein.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => setEditedData({ ...editedData, protein: parseInt(text) || 0 })}
                      />
                    ) : (
                      <Text style={styles.nutritionValue}>{editedData.protein}g</Text>
                    )}
                  </View>
                  
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInputSmall}
                        value={editedData.carbs.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => setEditedData({ ...editedData, carbs: parseInt(text) || 0 })}
                      />
                    ) : (
                      <Text style={styles.nutritionValue}>{editedData.carbs}g</Text>
                    )}
                  </View>
                  
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                    {isEditing ? (
                      <TextInput
                        style={styles.editInputSmall}
                        value={editedData.fat.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => setEditedData({ ...editedData, fat: parseInt(text) || 0 })}
                      />
                    ) : (
                      <Text style={styles.nutritionValue}>{editedData.fat}g</Text>
                    )}
                  </View>
                </View>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.retakeButton} onPress={() => {
                    setImageUri(null);
                    setFoodData(null);
                    setEditedData(null);
                  }}>
                    <Text style={styles.retakeButtonText}>Retake Photo</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={handleSave}>
                    <LinearGradient
                      colors={['#FF6B6B', '#FFB366']}
                      style={styles.saveButton}
                    >
                      <Check size={20} color="#FFF" />
                      <Text style={styles.saveButtonText}>Add to Diary</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollContent: {
    flexGrow: 1,
  },
  captureSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  captureButton: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  galleryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  galleryButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  resultSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  foodImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  analyzingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  nutritionContainer: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
  },
  nutritionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  servingSize: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 30,
  },
  nutritionItem: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B6B',
    paddingVertical: 4,
  },
  editInputSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B6B',
    paddingVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    alignItems: 'center',
  },
  retakeButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});