import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useOnboarding } from '@/providers/OnboardingProvider';
import { 
  Play, 
  User, 
  Activity, 
  Instagram, 
  Facebook, 
  Youtube,
  Search,
  Tv,
  Check,
  Star,
  ChevronRight,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Heart,
  Brain,
  Shield
} from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { 
    currentStep, 
    onboardingData, 
    updateOnboardingData, 
    nextStep 
  } = useOnboarding();
  
  const [localInput, setLocalInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (currentStep === 24) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => nextStep(), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const handleContinue = () => {
    // Save data based on current step
    switch (currentStep) {
      case 2:
        if (localInput) updateOnboardingData({ gender: localInput as any });
        break;
      case 3:
        if (localInput) updateOnboardingData({ workoutFrequency: localInput });
        break;
      case 4:
        if (localInput) updateOnboardingData({ discoverySource: localInput });
        break;
      case 5:
        updateOnboardingData({ previousTracking: localInput === 'yes' });
        break;
      case 7:
        // Height and weight handled separately
        break;
      case 8:
        if (localInput) updateOnboardingData({ dateOfBirth: localInput });
        break;
      case 9:
        if (localInput) updateOnboardingData({ goal: localInput as any });
        break;
      case 10:
        if (localInput) updateOnboardingData({ targetWeight: parseFloat(localInput) });
        break;
      case 12:
        if (localInput) updateOnboardingData({ weightChangeSpeed: parseFloat(localInput) });
        break;
      case 14:
        if (selectedOptions.length > 0) updateOnboardingData({ barriers: selectedOptions });
        break;
      case 15:
        if (localInput) updateOnboardingData({ dietPreference: localInput });
        break;
      case 16:
        if (selectedOptions.length > 0) updateOnboardingData({ accomplishments: selectedOptions });
        break;
      case 19:
        updateOnboardingData({ workoutCalories: localInput === 'yes' });
        break;
      case 20:
        updateOnboardingData({ rolloverCalories: localInput === 'yes' });
        break;
      case 22:
        if (localInput) updateOnboardingData({ referralCode: localInput });
        break;
    }
    
    if (currentStep === 23) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        nextStep();
      }, 2000);
    } else {
      nextStep();
    }
    
    // Reset local state
    setLocalInput('');
    setSelectedOptions([]);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.centerContent}>
            <View style={styles.videoPlaceholder}>
              <Play size={48} color="#FFF" />
            </View>
            <Text style={styles.title}>Calorie tracking made easy</Text>
            <Text style={styles.subtitle}>
              Take a photo, get instant nutrition info, and reach your goals faster
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
        
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Choose your Gender</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'male' && styles.selectedOption]}
                onPress={() => setLocalInput('male')}
              >
                <User size={32} color={localInput === 'male' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'female' && styles.selectedOption]}
                onPress={() => setLocalInput('female')}
              >
                <User size={32} color={localInput === 'female' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'other' && styles.selectedOption]}
                onPress={() => setLocalInput('other')}
              >
                <User size={32} color={localInput === 'other' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>How often do you do per week?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === '0-2' && styles.selectedOption]}
                onPress={() => setLocalInput('0-2')}
              >
                <Activity size={32} color={localInput === '0-2' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>0-2 times</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === '3-6' && styles.selectedOption]}
                onPress={() => setLocalInput('3-6')}
              >
                <Activity size={32} color={localInput === '3-6' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>3-6 times</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === '6+' && styles.selectedOption]}
                onPress={() => setLocalInput('6+')}
              >
                <Activity size={32} color={localInput === '6+' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>6+ times</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Where did you hear about us?</Text>
            <View style={styles.optionsGrid}>
              {[
                { id: 'instagram', icon: Instagram, label: 'Instagram' },
                { id: 'facebook', icon: Facebook, label: 'Facebook' },
                { id: 'tiktok', icon: Activity, label: 'TikTok' },
                { id: 'youtube', icon: Youtube, label: 'YouTube' },
                { id: 'google', icon: Search, label: 'Google' },
                { id: 'tv', icon: Tv, label: 'TV' }
              ].map(source => (
                <TouchableOpacity
                  key={source.id}
                  style={[styles.gridOption, localInput === source.id && styles.selectedOption]}
                  onPress={() => setLocalInput(source.id)}
                >
                  <source.icon size={24} color={localInput === source.id ? '#FF6B6B' : '#666'} />
                  <Text style={styles.gridOptionText}>{source.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Have you tried other calorie tracking apps?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'yes' && styles.selectedOption]}
                onPress={() => setLocalInput('yes')}
              >
                <Check size={32} color={localInput === 'yes' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'no' && styles.selectedOption]}
                onPress={() => setLocalInput('no')}
              >
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 6:
        return (
          <View style={styles.centerContent}>
            <LinearGradient
              colors={['#FF6B6B', '#FFB366']}
              style={styles.iconCircle}
            >
              <Target size={48} color="#FFF" />
            </LinearGradient>
            <Text style={styles.title}>Cal AI creates long-term results</Text>
            <Text style={styles.subtitle}>
              Our smart AI analyzes your food instantly and helps you build sustainable habits
            </Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Check size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>Instant food recognition</Text>
              </View>
              <View style={styles.benefitItem}>
                <Check size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>Personalized meal plans</Text>
              </View>
              <View style={styles.benefitItem}>
                <Check size={20} color="#4CAF50" />
                <Text style={styles.benefitText}>Track progress effortlessly</Text>
              </View>
            </View>
          </View>
        );
        
      case 7:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Height & weight</Text>
            <View style={styles.inputGroup}>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="170"
                  keyboardType="numeric"
                  value={onboardingData.height?.toString() || ''}
                  onChangeText={(text) => updateOnboardingData({ height: parseInt(text) || 0 })}
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="70"
                  keyboardType="numeric"
                  value={onboardingData.weight?.toString() || ''}
                  onChangeText={(text) => updateOnboardingData({ weight: parseInt(text) || 0 })}
                />
              </View>
            </View>
          </View>
        );
        
      case 8:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>When were you born?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="DD/MM/YYYY"
              value={localInput}
              onChangeText={setLocalInput}
            />
          </View>
        );
        
      case 9:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What is your goal?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'lose' && styles.selectedOption]}
                onPress={() => setLocalInput('lose')}
              >
                <TrendingUp size={32} color={localInput === 'lose' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Lose weight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'maintain' && styles.selectedOption]}
                onPress={() => setLocalInput('maintain')}
              >
                <Target size={32} color={localInput === 'maintain' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Maintain weight</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'gain' && styles.selectedOption]}
                onPress={() => setLocalInput('gain')}
              >
                <TrendingUp size={32} color={localInput === 'gain' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Gain weight</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 10:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What is your desired weight?</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderValue}>
                {localInput || onboardingData.weight || 70} kg
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter weight"
                keyboardType="numeric"
                value={localInput}
                onChangeText={setLocalInput}
              />
            </View>
          </View>
        );
        
      case 11:
        return (
          <View style={styles.centerContent}>
            <Check size={48} color="#4CAF50" />
            <Text style={styles.title}>
              {onboardingData.goal === 'lose' ? 'Losing' : onboardingData.goal === 'gain' ? 'Gaining' : 'Maintaining'}{' '}
              {Math.abs((onboardingData.targetWeight || 70) - (onboardingData.weight || 70))} kg is a realistic goal!
            </Text>
            <Text style={styles.subtitle}>
              We'll help you achieve this safely and sustainably
            </Text>
          </View>
        );
        
      case 12:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>How fast do you want to reach your goal?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === '0.5' && styles.selectedOption]}
                onPress={() => setLocalInput('0.5')}
              >
                <Text style={styles.optionMainText}>0.5 kg</Text>
                <Text style={styles.optionSubText}>per week</Text>
                <Text style={styles.recommendedBadge}>Recommended</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === '1' && styles.selectedOption]}
                onPress={() => setLocalInput('1')}
              >
                <Text style={styles.optionMainText}>1 kg</Text>
                <Text style={styles.optionSubText}>per week</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 13:
        return (
          <View style={styles.centerContent}>
            <Text style={styles.title}>Don't battle as much with Cal AI vs on your own</Text>
            <View style={styles.comparisonContainer}>
              <View style={styles.comparisonColumn}>
                <Text style={styles.comparisonTitle}>With Cal AI</Text>
                <View style={styles.comparisonItem}>
                  <Check size={16} color="#4CAF50" />
                  <Text style={styles.comparisonText}>Instant food tracking</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Check size={16} color="#4CAF50" />
                  <Text style={styles.comparisonText}>Personalized guidance</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Check size={16} color="#4CAF50" />
                  <Text style={styles.comparisonText}>Stay motivated</Text>
                </View>
              </View>
              <View style={styles.comparisonColumn}>
                <Text style={styles.comparisonTitle}>On Your Own</Text>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonX}>✗</Text>
                  <Text style={styles.comparisonText}>Manual logging</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonX}>✗</Text>
                  <Text style={styles.comparisonText}>Guesswork</Text>
                </View>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonX}>✗</Text>
                  <Text style={styles.comparisonText}>Easy to quit</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 14:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What's stopping you from reaching your goals?</Text>
            <View style={styles.optionsGrid}>
              {[
                'Lack of consistency',
                'No support',
                'Too busy',
                'Don\'t know what to eat',
                'Emotional eating',
                'Social events'
              ].map(barrier => (
                <TouchableOpacity
                  key={barrier}
                  style={[
                    styles.gridOption,
                    selectedOptions.includes(barrier) && styles.selectedOption
                  ]}
                  onPress={() => {
                    if (selectedOptions.includes(barrier)) {
                      setSelectedOptions(selectedOptions.filter(b => b !== barrier));
                    } else {
                      setSelectedOptions([...selectedOptions, barrier]);
                    }
                  }}
                >
                  <Text style={styles.gridOptionText}>{barrier}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      case 15:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Do you follow a specific diet?</Text>
            <View style={styles.optionsContainer}>
              {['Classic', 'Vegetarian', 'Vegan', 'Keto', 'Paleo'].map(diet => (
                <TouchableOpacity
                  key={diet}
                  style={[styles.optionCard, localInput === diet && styles.selectedOption]}
                  onPress={() => setLocalInput(diet)}
                >
                  <Text style={styles.optionText}>{diet}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      case 16:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What would you like to accomplish?</Text>
            <View style={styles.optionsGrid}>
              {[
                'Feel better',
                'Boost energy',
                'Improve health',
                'Look great',
                'Build confidence',
                'Live longer'
              ].map(goal => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.gridOption,
                    selectedOptions.includes(goal) && styles.selectedOption
                  ]}
                  onPress={() => {
                    if (selectedOptions.includes(goal)) {
                      setSelectedOptions(selectedOptions.filter(g => g !== goal));
                    } else {
                      setSelectedOptions([...selectedOptions, goal]);
                    }
                  }}
                >
                  <Text style={styles.gridOptionText}>{goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
        
      case 17:
        return (
          <View style={styles.centerContent}>
            <LinearGradient
              colors={['#FF6B6B', '#FFB366']}
              style={styles.iconCircle}
            >
              <Zap size={48} color="#FFF" />
            </LinearGradient>
            <Text style={styles.title}>You have great potential to reach your goal!</Text>
            <Text style={styles.subtitle}>
              Based on your answers, we're confident you can achieve amazing results with Cal AI
            </Text>
          </View>
        );
        
      case 18:
        return (
          <View style={styles.centerContent}>
            <Shield size={48} color="#4CAF50" />
            <Text style={styles.title}>Thank you for trusting us!</Text>
            <Text style={styles.subtitle}>
              Your data is safe and secure. We use it only to personalize your experience.
            </Text>
            <View style={styles.privacyNote}>
              <Text style={styles.privacyText}>
                We take your privacy seriously and never share your personal information.
              </Text>
            </View>
          </View>
        );
        
      case 19:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add calories burned back to your daily goal?</Text>
            <Text style={styles.stepSubtitle}>
              This allows you to eat more on days you exercise
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'yes' && styles.selectedOption]}
                onPress={() => setLocalInput('yes')}
              >
                <Check size={32} color={localInput === 'yes' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'no' && styles.selectedOption]}
                onPress={() => setLocalInput('no')}
              >
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 20:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Rollover extra calories to the next day?</Text>
            <Text style={styles.stepSubtitle}>
              If you eat less today, you can eat more tomorrow
            </Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'yes' && styles.selectedOption]}
                onPress={() => setLocalInput('yes')}
              >
                <Check size={32} color={localInput === 'yes' ? '#FF6B6B' : '#666'} />
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionCard, localInput === 'no' && styles.selectedOption]}
                onPress={() => setLocalInput('no')}
              >
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 21:
        return (
          <View style={styles.centerContent}>
            <Text style={styles.title}>Give us a rating</Text>
            <Text style={styles.subtitle}>
              Cal AI was made for people like you
            </Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => {}}>
                  <Star size={40} color="#FFB366" fill="#FFB366" />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.testimonials}>
              <View style={styles.testimonial}>
                <Text style={styles.testimonialText}>
                  "Lost 10kg in 2 months!" - Sarah M.
                </Text>
              </View>
              <View style={styles.testimonial}>
                <Text style={styles.testimonialText}>
                  "So easy to use!" - John D.
                </Text>
              </View>
            </View>
          </View>
        );
        
      case 22:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Do you have a referral code?</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter code (optional)"
              value={localInput}
              onChangeText={setLocalInput}
            />
            <TouchableOpacity onPress={handleContinue}>
              <Text style={styles.skipText}>Skip this step</Text>
            </TouchableOpacity>
          </View>
        );
        
      case 23:
        return (
          <View style={styles.centerContent}>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>Your custom plan is ready!</Text>
            {isGenerating ? (
              <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 40 }} />
            ) : (
              <View style={styles.planAnimation}>
                <LinearGradient
                  colors={['#FF6B6B', '#FFB366']}
                  style={styles.planCard}
                >
                  <Text style={styles.planCardText}>Generating your personalized plan...</Text>
                </LinearGradient>
              </View>
            )}
          </View>
        );
        
      case 24:
        return (
          <View style={styles.centerContent}>
            <Text style={styles.title}>Time to generate your custom plan!</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>{loadingProgress}%</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${loadingProgress}%` }]} />
              </View>
              <Text style={styles.subtitle}>
                We're sorting everything up for you
              </Text>
            </View>
          </View>
        );
        
      case 25:
        return (
          <View style={styles.centerContent}>
            <Text style={styles.title}>Your personalized plan is ready!</Text>
            <View style={styles.resultsContainer}>
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Daily Calories</Text>
                <Text style={styles.resultValue}>{onboardingData.dailyCalories || 2000}</Text>
              </View>
              <View style={styles.macrosContainer}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Protein</Text>
                  <Text style={styles.macroValue}>{onboardingData.proteinGrams || 150}g</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Carbs</Text>
                  <Text style={styles.macroValue}>{onboardingData.carbsGrams || 200}g</Text>
                </View>
                <View style={styles.macroItem}>
                  <Text style={styles.macroLabel}>Fat</Text>
                  <Text style={styles.macroValue}>{onboardingData.fatGrams || 67}g</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
              <LinearGradient
                colors={['#FF6B6B', '#FFB366']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Let's Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
        
      default:
        return null;
    }
  };

  const showContinueButton = () => {
    return ![1, 23, 24, 25].includes(currentStep);
  };

  const canContinue = () => {
    // Steps that don't require input validation
    const noValidationSteps = [6, 11, 13, 17, 18, 21];
    if (noValidationSteps.includes(currentStep)) {
      return true;
    }
    
    // Step 7 uses onboardingData for height and weight
    if (currentStep === 7) {
      return onboardingData.height && onboardingData.weight;
    }
    
    // Steps that use selectedOptions
    if ([14, 16].includes(currentStep)) {
      return selectedOptions.length > 0;
    }
    
    // All other steps require localInput
    return localInput.length > 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(currentStep / 25) * 100}%` }]} />
          </View>
          <Text style={styles.stepIndicator}>Step {currentStep} of 25</Text>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Platform.OS === 'web' ? (
            renderStepContent()
          ) : (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              {renderStepContent()}
            </Animated.View>
          )}
        </ScrollView>
        
        {showContinueButton() && (
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.continueButton, !canContinue() && styles.disabledButton]} 
              onPress={handleContinue}
              disabled={!canContinue()}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <ChevronRight size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
  },
  stepIndicator: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  stepContent: {
    flex: 1,
    paddingVertical: 40,
  },
  videoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  primaryButton: {
    marginTop: 40,
    width: '100%',
    maxWidth: 300,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 30,
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  optionMainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recommendedBadge: {
    backgroundColor: '#4CAF50',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  gridOption: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  gridOptionText: {
    fontSize: 14,
    color: '#333',
  },
  inputGroup: {
    marginTop: 30,
    gap: 20,
  },
  inputRow: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
  },
  sliderContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 20,
  },
  benefitsList: {
    marginTop: 30,
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 30,
  },
  comparisonColumn: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  comparisonText: {
    fontSize: 14,
    color: '#666',
  },
  comparisonX: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 30,
  },
  testimonials: {
    marginTop: 30,
    gap: 12,
  },
  testimonial: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
  },
  testimonialText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  privacyNote: {
    backgroundColor: '#F0FFF0',
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
  },
  privacyText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
  },
  skipText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  planAnimation: {
    marginTop: 40,
  },
  planCard: {
    padding: 30,
    borderRadius: 20,
  },
  planCardText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 40,
    width: '100%',
    maxWidth: 300,
  },
  progressText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultsContainer: {
    marginTop: 30,
    width: '100%',
    maxWidth: 350,
  },
  resultCard: {
    backgroundColor: '#FFF5F5',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  macroItem: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
  },
  continueButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});