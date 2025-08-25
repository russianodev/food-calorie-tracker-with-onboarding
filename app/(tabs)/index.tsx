import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/providers/UserProvider';
import { useFood } from '@/providers/FoodProvider';
import { Plus, Flame, Target, TrendingUp, Dumbbell } from 'lucide-react-native';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { userData, getRemainingCalories, getCalorieProgress } = useUser();
  const { todaysFoods } = useFood();

  const remainingCalories = getRemainingCalories();
  const progress = getCalorieProgress();

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const size = 200;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={{ width: size, height: size }}>
        <View style={styles.circularProgressContainer}>
          <View style={styles.circularProgressBackground} />
          <LinearGradient
            colors={['#FF6B6B', '#FFB366']}
            style={[
              styles.circularProgressFill,
              {
                transform: [
                  { rotate: `${(percentage / 100) * 360}deg` }
                ]
              }
            ]}
          />
          <View style={styles.circularProgressInner}>
            <Text style={styles.caloriesRemaining}>{remainingCalories}</Text>
            <Text style={styles.caloriesLabel}>Remaining</Text>
          </View>
        </View>
      </View>
    );
  };

  const MacroBar = ({ label, current, total, color }: any) => {
    const percentage = Math.min((current / total) * 100, 100);
    
    return (
      <View style={styles.macroBar}>
        <View style={styles.macroHeader}>
          <Text style={styles.macroLabel}>{label}</Text>
          <Text style={styles.macroValue}>{current}g / {total}g</Text>
        </View>
        <View style={styles.macroProgressBar}>
          <View 
            style={[
              styles.macroProgressFill, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
      </View>
    );
  };

  const FoodItem = ({ food }: { food: any }) => (
    <View style={styles.foodItem}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodAmount}>{food.amount}</Text>
      </View>
      <Text style={styles.foodCalories}>{food.calories} cal</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Today</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}</Text>
        </View>

        {Platform.OS === 'web' ? (
          <View style={styles.progressSection}>
            <CircularProgress percentage={progress} />
          </View>
        ) : (
          <Animated.View entering={FadeIn} style={styles.progressSection}>
            <CircularProgress percentage={progress} />
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Flame size={20} color="#FF6B6B" />
            <Text style={styles.statValue}>{userData.consumedCalories}</Text>
            <Text style={styles.statLabel}>Eaten</Text>
          </View>
          <View style={styles.statCard}>
            <Dumbbell size={20} color="#4CAF50" />
            <Text style={styles.statValue}>{userData.burnedCalories}</Text>
            <Text style={styles.statLabel}>Burned</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={20} color="#2196F3" />
            <Text style={styles.statValue}>{userData.dailyCalories}</Text>
            <Text style={styles.statLabel}>Goal</Text>
          </View>
        </View>

        <View style={styles.macrosSection}>
          <Text style={styles.sectionTitle}>Macros</Text>
          <MacroBar 
            label="Protein" 
            current={userData.consumedProtein} 
            total={userData.proteinGrams}
            color="#4CAF50"
          />
          <MacroBar 
            label="Carbs" 
            current={userData.consumedCarbs} 
            total={userData.carbsGrams}
            color="#2196F3"
          />
          <MacroBar 
            label="Fat" 
            current={userData.consumedFat} 
            total={userData.fatGrams}
            color="#FFC107"
          />
        </View>

        <View style={styles.foodSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Food</Text>
            <TouchableOpacity onPress={() => router.push('/food-capture')}>
              <Plus size={24} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          
          {todaysFoods.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No food logged yet</Text>
              <TouchableOpacity 
                style={styles.addFoodButton}
                onPress={() => router.push('/food-capture')}
              >
                <Text style={styles.addFoodButtonText}>Add your first meal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.foodList}>
              {todaysFoods.map((food) => (
                <FoodItem key={food.id} food={food} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  circularProgressContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressBackground: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: '#F0F0F0',
  },
  circularProgressFill: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: 'transparent',
    borderTopColor: '#FF6B6B',
    borderRightColor: '#FF6B6B',
  },
  circularProgressInner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesRemaining: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  caloriesLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  macrosSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  macroBar: {
    marginBottom: 16,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  macroLabel: {
    fontSize: 14,
    color: '#666',
  },
  macroValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  macroProgressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  macroProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  foodSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  foodList: {
    gap: 12,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  foodAmount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  addFoodButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  addFoodButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});