import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PROGRAMS } from '../data/programs';
import { Program, ProgramEnrollment } from '../types/program';
import { Storage } from '../lib/storage';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const GOAL_ICONS: Record<string, string> = {
  shooting: '🎯',
  athleticism: '⚡',
  handles: '🏀',
};

const PROGRAM_COLORS: Record<string, string> = {
  'shooting-overhaul': '#1E3A8A',
  'summer-bounce': '#166534',
  'handles-lockdown': '#7C3AED',
};

export default function ProgramsScreen() {
  const { colors, isDark } = useTheme();
  const [enrollment, setEnrollment] = useState<ProgramEnrollment | null>(null);

  useEffect(() => {
    Storage.getEnrollment().then(setEnrollment);
  }, []);

  const enroll = (program: Program) => {
    if (enrollment) {
      Alert.alert(
        'Switch Programs?',
        `You're currently enrolled in another program. Switching will reset your progress.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Switch', style: 'destructive', onPress: () => doEnroll(program) },
        ]
      );
      return;
    }
    Alert.alert(
      `Start ${program.name}?`,
      `${program.weeks}-week program. Your daily workout will pull from this plan.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enroll', onPress: () => doEnroll(program) },
      ]
    );
  };

  const doEnroll = async (program: Program) => {
    const e: ProgramEnrollment = {
      programId: program.id,
      startDate: new Date().toISOString(),
      currentWeek: 1,
      currentDay: 1,
      completedDays: [],
    };
    await Storage.setEnrollment(e);
    setEnrollment(e);
  };

  const unenroll = () => {
    Alert.alert('Leave Program?', 'Your progress will be cleared.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Leave', style: 'destructive', onPress: async () => {
          await Storage.setEnrollment(null);
          setEnrollment(null);
        },
      },
    ]);
  };

  const activeProgram = enrollment ? PROGRAMS.find((p) => p.id === enrollment.programId) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={[styles.scroll, { gap: Spacing.md }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.textDark }]}>Programs</Text>
        <Text style={[styles.subtitle, { color: colors.textMid }]}>Enroll in a structured plan to get results faster.</Text>

        {activeProgram && enrollment && (
          <View style={[styles.activeCard, { backgroundColor: PROGRAM_COLORS[activeProgram.id] }]}>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
            <Text style={styles.activeTitle}>{activeProgram.name}</Text>
            <Text style={styles.activeProgress}>
              Week {enrollment.currentWeek} · Day {enrollment.currentDay} · {enrollment.completedDays.length} sessions done
            </Text>
            <TouchableOpacity style={styles.leaveBtn} onPress={unenroll} activeOpacity={0.8}>
              <Text style={styles.leaveBtnText}>Leave Program</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.list}>
          {PROGRAMS.map((program) => {
            const isActive = enrollment?.programId === program.id;
            const color = PROGRAM_COLORS[program.id] ?? colors.primary;
            const totalDays = program.schedule.reduce((s, w) => s + w.days.length, 0);
            return (
              <View key={program.id} style={[styles.card, { backgroundColor: colors.background }]}>
                <View style={[styles.cardHeader, { backgroundColor: color }]}>
                  <Text style={styles.cardIcon}>{GOAL_ICONS[program.focusGoal] ?? '🏀'}</Text>
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.cardTitle}>{program.name}</Text>
                    <Text style={styles.cardTagline}>{program.tagline}</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <Text style={[styles.cardDesc, { color: colors.textMid }]}>{program.description}</Text>
                  <View style={styles.cardMeta}>
                    <View style={[styles.metaPill, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.metaPillText, { color: colors.textMid }]}>{program.weeks} weeks</Text>
                    </View>
                    <View style={[styles.metaPill, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.metaPillText, { color: colors.textMid }]}>{totalDays} sessions</Text>
                    </View>
                    <View style={[styles.metaPill, { backgroundColor: colors.accentLight }]}>
                      <Text style={[styles.metaPillText, { color: colors.primary }]}>{program.focusGoal}</Text>
                    </View>
                  </View>
                  {!isActive ? (
                    <TouchableOpacity
                      style={[styles.enrollBtn, { backgroundColor: color }]}
                      onPress={() => enroll(program)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.enrollBtnText}>Start Program</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.activeLabel, { backgroundColor: colors.surface }]}>
                      <Text style={[styles.activeLabelText, { color: colors.textMid }]}>Currently enrolled</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 15 },
  activeCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.sm,
    ...Shadow.md,
  },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  activeTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  activeProgress: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  leaveBtn: {
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: Radius.md,
    paddingVertical: 10,
    alignItems: 'center',
  },
  leaveBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  list: { gap: Spacing.md },
  card: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  cardHeader: { padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  cardIcon: { fontSize: 32 },
  cardHeaderText: { flex: 1 },
  cardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  cardTagline: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 },
  cardBody: { padding: Spacing.md, gap: Spacing.md },
  cardDesc: { fontSize: 14, lineHeight: 20 },
  cardMeta: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  metaPill: {
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  metaPillText: { fontSize: 12, fontWeight: '600' },
  enrollBtn: {
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    ...Shadow.sm,
  },
  enrollBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  activeLabel: {
    borderRadius: Radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeLabelText: { fontSize: 14, fontWeight: '600' },
});
