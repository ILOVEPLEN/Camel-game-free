import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
  TextInput, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Storage } from '../lib/storage';
import { PlayerProfile } from '../types/profile';
import { useTheme } from '../theme/ThemeContext';
import { ThemeMode } from '../theme/ThemeContext';
import { useSubscription } from '../context/SubscriptionContext';
import { setProUser } from '../lib/subscriptions';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const POSITION_FULL: Record<string, string> = {
  PG: 'Point Guard', SG: 'Shooting Guard', SF: 'Small Forward', PF: 'Power Forward', C: 'Center',
};
const SKILL_LABELS: Record<string, string> = {
  beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
};
const GOAL_LABELS: Record<string, string> = {
  shooting: 'Shooting', handles: 'Ball Handling', finishing: 'Finishing',
  athleticism: 'Athleticism', conditioning: 'Conditioning',
};
const EQUIP_LABELS: Record<string, string> = {
  'full-gym': 'Full Gym', 'home-gym': 'Home Gym', 'court-only': 'Court Only', 'ball-and-hoop': 'Ball + Hoop',
};

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'system', label: 'System', icon: '⚙️' },
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
];

interface Props {
  onReset: () => void;
}

export default function ProfileScreen({ onReset }: Props) {
  const { colors, isDark, mode, setMode } = useTheme();
  const { isPro, showPaywall, refreshPro } = useSubscription();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    Storage.getProfile().then(setProfile);
  }, []);

  const handleReset = () => {
    Alert.alert(
      'Reset Profile?',
      'This will clear all your data and take you back to onboarding.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset', style: 'destructive', onPress: async () => {
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            await AsyncStorage.clear();
            onReset();
          },
        },
      ]
    );
  };

  const openEdit = () => {
    setEditName(profile?.name ?? '');
    setEditModalVisible(true);
  };

  const saveEdit = async () => {
    if (!profile) return;
    const updated = { ...profile, name: editName.trim() };
    await Storage.setProfile(updated);
    setProfile(updated);
    setEditModalVisible(false);
  };

  if (!profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.loading}><Text style={[styles.loadingText, { color: colors.textMid }]}>Loading profile…</Text></View>
      </SafeAreaView>
    );
  }

  const displayName = profile.name ?? profile.position;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={[styles.scroll, { gap: Spacing.md }]} showsVerticalScrollIndicator={false}>

        {/* Profile card */}
        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.position}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profilePosition}>{POSITION_FULL[profile.position]}</Text>
              <View style={styles.skillBadge}>
                <Text style={styles.skillBadgeText}>{SKILL_LABELS[profile.skillLevel]}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={openEdit} activeOpacity={0.8}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription card */}
        {isPro ? (
          <View style={[styles.proCard, { backgroundColor: '#1a2f1a' }]}>
            <Text style={styles.proCardIcon}>🏆</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.proCardTitle}>Project Ball Pro</Text>
              <Text style={styles.proCardSub}>All features unlocked · Cancel anytime</Text>
            </View>
            <TouchableOpacity onPress={async () => { await setProUser(false); await refreshPro(); }} activeOpacity={0.7}>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Dev: off</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.upgradeCard} onPress={showPaywall} activeOpacity={0.85}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.upgradeTitle}>Upgrade to Pro 🏆</Text>
              <Text style={styles.upgradeSub}>Camera tracker · All programs · Full analytics</Text>
              <Text style={styles.upgradePrice}>From $5.99/mo · 7-day free trial</Text>
            </View>
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>›</Text>
          </TouchableOpacity>
        )}

        {/* Appearance */}
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>Appearance</Text>
          <View style={styles.themeRow}>
            {THEME_OPTIONS.map((opt) => {
              const active = mode === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.themeOption,
                    { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                    active && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}
                  onPress={() => setMode(opt.value)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.themeIcon}>{opt.icon}</Text>
                  <Text style={[styles.themeLabel, { color: colors.textMid }, active && { color: colors.white }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Info cards */}
        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>Goals</Text>
          <View style={styles.chipRow}>
            {profile.goals.map((g) => (
              <View key={g} style={[styles.goalChip, { backgroundColor: colors.accentLight }]}>
                <Text style={[styles.goalChipText, { color: colors.primary }]}>{GOAL_LABELS[g]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>Setup</Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textMid }]}>Equipment</Text>
            <Text style={[styles.infoValue, { color: colors.textDark }]}>{EQUIP_LABELS[profile.equipmentAccess]}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textMid }]}>Days per week</Text>
            <Text style={[styles.infoValue, { color: colors.textDark }]}>{profile.daysPerWeek}×</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.surfaceBorder }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textMid }]}>Session length</Text>
            <Text style={[styles.infoValue, { color: colors.textDark }]}>{profile.minutesPerSession} min</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.background }]}>
          <Text style={[styles.cardTitle, { color: colors.textDark }]}>About Project Ball</Text>
          <Text style={[styles.aboutText, { color: colors.textMid }]}>
            Project Ball is a personalized basketball training companion built to help you improve through consistent, structured work.
            {'\n\n'}MVP · No auth · Data stored locally on your device.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.resetBtn, { borderColor: colors.hard }]}
          onPress={handleReset}
          activeOpacity={0.85}
        >
          <Text style={[styles.resetText, { color: colors.hard }]}>Reset & Re-onboard</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Name Modal */}
      <Modal visible={editModalVisible} animationType="slide" presentationStyle="pageSheet">
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={[styles.modalContent, { gap: Spacing.md }]}>
              <Text style={[styles.modalTitle, { color: colors.textDark }]}>Edit Profile</Text>
              <Text style={[styles.modalLabel, { color: colors.textMid }]}>Your Name</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.surfaceBorder,
                    color: colors.textDark,
                  },
                ]}
                value={editName}
                onChangeText={setEditName}
                placeholder="Your name"
                placeholderTextColor={colors.textLight}
                autoFocus
                maxLength={30}
              />
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: colors.accent }]}
                onPress={saveEdit}
                activeOpacity={0.85}
              >
                <Text style={[styles.saveBtnText, { color: colors.white }]}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelBtn}>
                <Text style={[styles.cancelBtnText, { color: colors.textMid }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: {},
  profileCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.md,
  },
  avatarRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  profilePosition: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  skillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 2,
  },
  skillBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  editBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: Radius.md,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  themeRow: { flexDirection: 'row', gap: Spacing.sm },
  themeOption: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
  },
  themeIcon: { fontSize: 20 },
  themeLabel: { fontSize: 12, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  goalChip: {
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  goalChipText: { fontSize: 13, fontWeight: '600' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  infoLabel: { fontSize: 15 },
  infoValue: { fontSize: 15, fontWeight: '700' },
  divider: { height: 1 },
  aboutText: { fontSize: 14, lineHeight: 22 },
  proCard: {
    borderRadius: Radius.xl, padding: Spacing.lg,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)',
  },
  proCardIcon: { fontSize: 28 },
  proCardTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  proCardSub: { color: 'rgba(255,255,255,0.55)', fontSize: 13 },
  upgradeCard: {
    borderRadius: Radius.xl, padding: Spacing.lg,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: '#1E3A8A',
    ...Shadow.md,
  },
  upgradeTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  upgradeSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  upgradePrice: { color: '#60A5FA', fontSize: 13, fontWeight: '600', marginTop: 2 },
  resetBtn: {
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: { fontSize: 15, fontWeight: '700' },
  modalContent: { flex: 1, padding: Spacing.lg },
  modalTitle: { fontSize: 24, fontWeight: '800' },
  modalLabel: { fontSize: 15, fontWeight: '600' },
  modalInput: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: 17,
    borderWidth: 1,
  },
  saveBtn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.md,
  },
  saveBtnText: { fontSize: 17, fontWeight: '700' },
  cancelBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  cancelBtnText: { fontSize: 15 },
});
