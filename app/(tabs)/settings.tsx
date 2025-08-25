import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Target, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Globe
} from 'lucide-react-native';
import { useOnboarding } from '@/providers/OnboardingProvider';

export default function SettingsScreen() {
  const { resetOnboarding, onboardingData } = useOnboarding();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const SettingItem = ({ icon: Icon, title, subtitle, onPress, rightElement }: any) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#666" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color="#999" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <User size={32} color="#FFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Your Profile</Text>
              <Text style={styles.profileEmail}>
                Goal: {onboardingData?.goal || 'Maintain'} weight
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon={User}
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => {}}
          />
          <SettingItem
            icon={Target}
            title="Goals & Targets"
            subtitle={`Daily: ${onboardingData?.dailyCalories || 2000} calories`}
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Meal reminders and tips"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E0E0E0', true: '#FFB366' }}
                thumbColor={notifications ? '#FF6B6B' : '#999'}
              />
            }
          />
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Easier on the eyes"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E0E0E0', true: '#FFB366' }}
                thumbColor={darkMode ? '#FF6B6B' : '#999'}
              />
            }
          />
          <SettingItem
            icon={Globe}
            title="Units"
            subtitle="Metric"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs and tutorials"
            onPress={() => {}}
          />
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={resetOnboarding}>
          <LogOut size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Reset App</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 20,
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  version: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});