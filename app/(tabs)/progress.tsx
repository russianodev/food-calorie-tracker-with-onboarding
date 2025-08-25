import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  // Mock data for demonstration
  const weekData = [
    { day: 'Mon', calories: 1850, goal: 2000 },
    { day: 'Tue', calories: 2100, goal: 2000 },
    { day: 'Wed', calories: 1950, goal: 2000 },
    { day: 'Thu', calories: 2000, goal: 2000 },
    { day: 'Fri', calories: 1900, goal: 2000 },
    { day: 'Sat', calories: 2200, goal: 2000 },
    { day: 'Sun', calories: 1800, goal: 2000 },
  ];

  const BarChart = () => {
    const maxHeight = 150;
    const maxCalories = Math.max(...weekData.map(d => Math.max(d.calories, d.goal)));

    return (
      <View style={styles.chartContainer}>
        {weekData.map((data, index) => {
          const barHeight = (data.calories / maxCalories) * maxHeight;
          const goalHeight = (data.goal / maxCalories) * maxHeight;
          const isOverGoal = data.calories > data.goal;

          return (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barWrapper}>
                <View style={[styles.goalLine, { bottom: goalHeight }]} />
                <LinearGradient
                  colors={isOverGoal ? ['#FF6B6B', '#FF8E8E'] : ['#4CAF50', '#66BB6A']}
                  style={[styles.bar, { height: barHeight }]}
                />
              </View>
              <Text style={styles.barLabel}>{data.day}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Track your journey to success</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#FF6B6B', '#FFB366']}
              style={styles.statIcon}
            >
              <TrendingUp size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#4CAF50', '#66BB6A']}
              style={styles.statIcon}
            >
              <Target size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Goal Success</Text>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#2196F3', '#42A5F5']}
              style={styles.statIcon}
            >
              <Calendar size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>Days Logged</Text>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#FFC107', '#FFD54F']}
              style={styles.statIcon}
            >
              <Award size={24} color="#FFF" />
            </LinearGradient>
            <Text style={styles.statValue}>5 kg</Text>
            <Text style={styles.statLabel}>Lost</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <BarChart />
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Under goal</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Over goal</Text>
            </View>
          </View>
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Great Progress!</Text>
            <Text style={styles.insightText}>
              You've stayed within your calorie goal 6 out of 7 days this week. Keep it up!
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Protein Intake</Text>
            <Text style={styles.insightText}>
              Your average protein intake is 92% of your daily goal. Try adding more lean proteins.
            </Text>
          </View>
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingVertical: 20,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: 30,
    height: 150,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  goalLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#333',
    opacity: 0.3,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  insightsSection: {
    paddingHorizontal: 20,
  },
  insightCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});