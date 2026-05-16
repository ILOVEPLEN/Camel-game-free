import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Storage } from '../lib/storage';
import { PlayerProfile } from '../types/profile';
import { Colors } from '../theme/colors';
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

interface Props {
  onReset: () => void;
}

export default function ProfileScreen({ onReset }: Props) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);

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

  if (!profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}><Text style={styles.loadingText}>Loading profile…</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.position}</Text>
          </View>
          <Text style={styles.positionFull}>{POSITION_FULL[profile.position]}</Text>
          <Text style={styles.skillLabel}>{SKILL_LABELS[profile.skillLevel]}</Text>
        </View>

        {/* Info cards */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goals</Text>
          <View style={styles.chipRow}>
            {profile.goals.map((g) => (
              <View key={g} style={styles.goalChip}>
                <Text style={styles.goalChipText}>{GOAL_LABELS[g]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Setup</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Equipment</Text>
            <Text style={styles.infoValue}>{EQUIP_LABELS[profile.equipmentAccess]}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Days per week</Text>
            <Text style={styles.infoValue}>{profile.daysPerWeek}×</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Session length</Text>
            <Text style={styles.infoValue}>{profile.minutesPerSession} min</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About Project Ball</Text>
          <Text style={styles.aboutText}>
            Project Ball is a personalized basketball training companion built to help you improve through consistent, structured work.
            {'\n\n'}MVP · No auth · Data stored locally on your device.
          </Text>
        </View>

        <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.85}>
          <Text style={styles.resetText}>Reset & Re-onboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.surface },
  scroll: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing.xxl },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: Colors.textMid },
  avatarCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 28, fontWeight: '800' },
  positionFull: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  skillLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 14 },
  card: {
    backgroundColor: Colors.background,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  goalChip: {
    backgroundColor: Colors.accentLight,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  goalChipText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  infoLabel: { fontSize: 15, color: Colors.textMid },
  infoValue: { fontSize: 15, fontWeight: '700', color: Colors.textDark },
  divider: { height: 1, backgroundColor: Colors.surfaceBorder },
  aboutText: { fontSize: 14, color: Colors.textMid, lineHeight: 22 },
  resetBtn: {
    borderWidth: 1.5,
    borderColor: Colors.error,
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: { color: Colors.error, fontSize: 15, fontWeight: '700' },
});
