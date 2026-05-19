import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Drill } from '../types/drill';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced'];

const CATEGORY_LABELS: Record<string, string> = {
  shooting: 'Shooting',
  'ball-handling': 'Ball Handling',
  finishing: 'Finishing',
  footwork: 'Footwork',
  defense: 'Defense',
  conditioning: 'Conditioning',
  strength: 'Strength',
};

interface Props {
  route: { params: { drill: Drill } };
  navigation: any;
}

export default function DrillDetailScreen({ route }: Props) {
  const { colors, isDark } = useTheme();
  const { drill } = route.params;
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSeconds = drill.duration * 60;

  const DIFFICULTY_COLORS = ['', colors.easy, colors.medium, colors.hard];

  useEffect(() => {
    if (timerActive) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= totalSeconds) {
            clearInterval(intervalRef.current!);
            setTimerActive(false);
            Alert.alert('Time\'s up!', `${drill.name} complete.`);
            return totalSeconds;
          }
          return e + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerActive, totalSeconds, drill.name]);

  const mins = String(Math.floor((totalSeconds - elapsed) / 60)).padStart(2, '0');
  const secs = String((totalSeconds - elapsed) % 60).padStart(2, '0');
  const timerProgress = elapsed / totalSeconds;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero image placeholder */}
        <Image
          source={{ uri: drill.videoPlaceholder }}
          style={[styles.hero, { backgroundColor: colors.accentLight }]}
          resizeMode="cover"
        />

        <View style={styles.body}>
          {/* Badges */}
          <View style={styles.badges}>
            <View style={[styles.catBadge, { backgroundColor: colors.accentLight }]}>
              <Text style={[styles.catText, { color: colors.accent }]}>{CATEGORY_LABELS[drill.category] ?? drill.category}</Text>
            </View>
            <View style={[styles.diffBadge, { backgroundColor: DIFFICULTY_COLORS[drill.difficulty] }]}>
              <Text style={[styles.diffText, { color: colors.white }]}>{DIFFICULTY_LABELS[drill.difficulty]}</Text>
            </View>
          </View>

          <Text style={[styles.name, { color: colors.textDark }]}>{drill.name}</Text>
          <Text style={[styles.desc, { color: colors.textMid }]}>{drill.description}</Text>

          {/* Meta row */}
          <View style={[styles.metaRow, { backgroundColor: colors.surface }]}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaValue, { color: colors.primary }]}>{drill.duration}</Text>
              <Text style={[styles.metaLabel, { color: colors.textMid }]}>minutes</Text>
            </View>
            {drill.targetSets && (
              <View style={styles.metaItem}>
                <Text style={[styles.metaValue, { color: colors.primary }]}>{drill.targetSets}</Text>
                <Text style={[styles.metaLabel, { color: colors.textMid }]}>sets</Text>
              </View>
            )}
            {drill.targetReps && (
              <View style={styles.metaItem}>
                <Text style={[styles.metaValue, { color: colors.primary }]}>{drill.targetReps}</Text>
                <Text style={[styles.metaLabel, { color: colors.textMid }]}>reps</Text>
              </View>
            )}
          </View>

          {/* Cues */}
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Coaching Cues</Text>
          <View style={styles.cuesList}>
            {drill.cues.map((cue, i) => (
              <View key={i} style={styles.cueItem}>
                <View style={[styles.cueDot, { backgroundColor: colors.accent }]} />
                <Text style={[styles.cueText, { color: colors.textDark }]}>{cue}</Text>
              </View>
            ))}
          </View>

          {/* Equipment */}
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Equipment</Text>
          <View style={styles.equipRow}>
            {drill.equipment.map((e) => (
              <View key={e} style={[styles.equipChip, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                <Text style={[styles.equipText, { color: colors.textMid }]}>{e.replace(/-/g, ' ')}</Text>
              </View>
            ))}
          </View>

          {/* Timer */}
          <View style={[styles.timerCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.timerLabel}>Session Timer</Text>
            <Text style={styles.timerDisplay}>{mins}:{secs}</Text>
            <View style={styles.timerBar}>
              <View style={[styles.timerFill, { flex: timerProgress, backgroundColor: colors.accent }]} />
              <View style={{ flex: 1 - timerProgress }} />
            </View>
            <View style={styles.timerButtons}>
              <TouchableOpacity
                style={[
                  styles.timerBtn,
                  { backgroundColor: colors.accent },
                  timerActive && { backgroundColor: colors.hard },
                ]}
                onPress={() => setTimerActive((v) => !v)}
                activeOpacity={0.85}
              >
                <Text style={[styles.timerBtnText, { color: colors.white }]}>
                  {timerActive ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
                </Text>
              </TouchableOpacity>
              {elapsed > 0 && (
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={() => { setElapsed(0); setTimerActive(false); }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: Spacing.xxl },
  hero: { width: '100%', height: 220 },
  body: { padding: Spacing.lg, gap: Spacing.md },
  badges: { flexDirection: 'row', gap: Spacing.sm },
  catBadge: { borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  catText: { fontSize: 12, fontWeight: '700' },
  diffBadge: { borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  diffText: { fontSize: 12, fontWeight: '700' },
  name: { fontSize: 26, fontWeight: '800' },
  desc: { fontSize: 15, lineHeight: 22 },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  metaItem: { alignItems: 'center', flex: 1 },
  metaValue: { fontSize: 24, fontWeight: '800' },
  metaLabel: { fontSize: 12, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  cuesList: { gap: Spacing.sm },
  cueItem: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  cueDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  cueText: { flex: 1, fontSize: 15, lineHeight: 22 },
  equipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  equipChip: {
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
  },
  equipText: { fontSize: 13, fontWeight: '500', textTransform: 'capitalize' },
  timerCard: {
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    alignItems: 'center',
    ...Shadow.md,
  },
  timerLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600' },
  timerDisplay: { color: '#FFFFFF', fontSize: 52, fontWeight: '800', fontVariant: ['tabular-nums'] },
  timerBar: {
    flexDirection: 'row',
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerFill: { borderRadius: 3, width: '100%', minHeight: 4 },
  timerButtons: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  timerBtn: {
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 32,
    ...Shadow.sm,
  },
  timerBtnText: { fontSize: 16, fontWeight: '700' },
  resetBtn: { paddingVertical: 12, paddingHorizontal: 16 },
  resetText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
});
