import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';

const DAYS_OPTIONS = [2, 3, 4, 5, 6];
const DURATION_OPTIONS = [30, 45, 60, 75, 90];

interface Props {
  onNext: (daysPerWeek: number, minutesPerSession: number) => void;
}

export default function ScheduleScreen({ onNext }: Props) {
  const [days, setDays] = useState<number | null>(null);
  const [mins, setMins] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>5 of 5</Text>
          <Text style={styles.title}>How much time can you commit?</Text>
          <Text style={styles.subtitle}>We'll build sessions that fit your schedule, not the other way around.</Text>
        </View>

        <View style={styles.sections}>
          <View>
            <Text style={styles.sectionLabel}>Days per week</Text>
            <View style={styles.row}>
              {DAYS_OPTIONS.map((d) => {
                const active = days === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setDays(d)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View>
            <Text style={styles.sectionLabel}>Minutes per session</Text>
            <View style={styles.row}>
              {DURATION_OPTIONS.map((m) => {
                const active = mins === m;
                return (
                  <TouchableOpacity
                    key={m}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setMins(m)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {days && mins ? (
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                That's <Text style={styles.summaryHighlight}>{days * mins} minutes</Text> of training per week.{'\n'}
                Serious players are built on consistency.
              </Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.btn, (!days || !mins) && styles.btnDisabled]}
          onPress={() => days && mins && onNext(days, mins)}
          disabled={!days || !mins}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Let's Build Your Program</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, justifyContent: 'space-between' },
  header: { marginBottom: Spacing.xl },
  step: { fontSize: 13, color: Colors.accent, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textDark, marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, color: Colors.textMid, lineHeight: 22 },
  sections: { flex: 1, gap: Spacing.xl, justifyContent: 'center' },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: Colors.textDark, marginBottom: Spacing.md },
  row: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    ...Shadow.sm,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  chipTextActive: { color: Colors.white },
  summary: {
    backgroundColor: Colors.accentLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  summaryText: { fontSize: 14, color: Colors.textDark, lineHeight: 22 },
  summaryHighlight: { fontWeight: '800', color: Colors.primary },
  btn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  btnDisabled: { backgroundColor: Colors.surfaceBorder },
  btnText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
});
