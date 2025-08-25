import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { Check, Zap, TrendingUp, Brain } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SubscriptionScreen() {
  const { completeSubscription } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = () => {
    // In a real app, this would handle payment processing
    completeSubscription();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>We want you to try CalAI for free.</Text>
          <View style={styles.trialBadge}>
            <Text style={styles.trialText}>3 DAYS FREE</Text>
          </View>
        </View>

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'yearly' && styles.selectedPlan]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planTitle}>Yearly</Text>
                <Text style={styles.planPrice}>$59.99/year</Text>
              </View>
              {selectedPlan === 'yearly' && (
                <View style={styles.checkCircle}>
                  <Check size={16} color="#FFF" />
                </View>
              )}
            </View>
            <Text style={styles.planDescription}>Save 50% - Best Value!</Text>
            <View style={styles.savingBadge}>
              <Text style={styles.savingText}>SAVE $60</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.planCard, selectedPlan === 'monthly' && styles.selectedPlan]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planTitle}>Monthly</Text>
                <Text style={styles.planPrice}>$9.99/month</Text>
              </View>
              {selectedPlan === 'monthly' && (
                <View style={styles.checkCircle}>
                  <Check size={16} color="#FFF" />
                </View>
              )}
            </View>
            <Text style={styles.planDescription}>Flexible monthly billing</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you get:</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.featureIcon}
              >
                <Zap size={16} color="#FFF" />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Instant Food Recognition</Text>
                <Text style={styles.featureDescription}>
                  Take a photo and get nutrition info in seconds
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.featureIcon}
              >
                <TrendingUp size={16} color="#FFF" />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Progress Tracking</Text>
                <Text style={styles.featureDescription}>
                  Visual charts and insights to keep you motivated
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.featureIcon}
              >
                <Brain size={16} color="#FFF" />
              </LinearGradient>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI Meal Suggestions</Text>
                <Text style={styles.featureDescription}>
                  Personalized recommendations based on your goals
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.testimonial}>
          <Text style={styles.testimonialText}>
            "I lost 15 pounds in 2 months! The photo feature makes tracking so easy."
          </Text>
          <Text style={styles.testimonialAuthor}>- Sarah M.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubscribe}>
          <LinearGradient
            colors={['#FF6B6B', '#FFB366']}
            style={styles.subscribeButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.subscribeButtonText}>
              Start My 3-Day Free Trial
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Cancel anytime. Billed after trial ends.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  trialBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trialText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  plansContainer: {
    gap: 16,
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlan: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#FFB366',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  testimonial: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  testimonialText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  subscribeButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 12,
  },
});