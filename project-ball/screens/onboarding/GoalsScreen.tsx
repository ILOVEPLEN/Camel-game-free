import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { Goal } from '../../types/profile';

const GOALS: { value: Goal; label: string; desc: string; icon: string }[] = [
  { value: 'shooting', label: 'Shooting', icon: '🎯', desc: 'Form, range, shot creation' },
  { value: 'handles', label: 'Ball Handling', icon: '🏀', desc: 'Dribble moves, speed, vision' },
  { value: 'finishing', label: 'Finishing', icon: '💥', desc: 'Layups, floaters, contact' },
  { value: 'athleticism', label: 'Athleticism', icon: '⚡', desc: 'Vertical, speed, strength' },
  { value: 'conditioning', label: 'Conditioning', icon: '🫁', desc: 'Cardio, endurance, gas tank' },
];

interface Props {
  onNext: (goals: Goal[]) => void;
  stepLabel?: string;
}

export default function GoalsScreen({ onNext, stepLabel = '3 of 5' }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<Goal[]>([]);

  const toggle = (g: Goal) => {
    setSelected((prev) => {
      if (prev.includes(g)) return prev.filter((x) => x !== g);
      if (prev.length >= 3) return prev;
      return [...prev, g];
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.accent }]}>{stepLabel}</Text>
          <Text style={[styles.title, { color: colors.textDark }]}>What are your goals?</Text>
          <Text style={[styles.subtitle, { color: colors.textMid }]}>Pick up to 3. Your daily workouts will prioritize these areas.</Text>
        </View>

        <View style={styles.list}>
          {GOALS.map((g) => {
            const active = selected.includes(g.value);
            const disabled = !active && selected.length >= 3;
            return (
              <TouchableOpacity
                key={g.value}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: colors.accentLight, borderColor: colors.accent },
                  disabled && styles.cardDisabled,
                ]}
                onPress={() => !disabled && toggle(g.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.icon}>{g.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, { color: colors.textDark }, active && { color: colors.primary }]}>{g.label}</Text>
                  <Text style={[styles.cardDesc, { color: colors.textMid }, active && { color: colors.textDark }]}>{g.desc}</Text>
                </View>
                <View style={[styles.check, { borderColor: colors.surfaceBorder }, active && { backgroundColor: colors.accent, borderColor: colors.accent }]}>
                  {active && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.counter, { color: colors.textMid }]}>{selected.length}/3 selected</Text>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: selected.length > 0 ? colors.accent : colors.surfaceBorder },
            ]}
            onPress={() => selected.length > 0 && onNext(selected)}
            disabled={selected.length === 0}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnText, { color: colors.white }]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, justifyContent: 'space-between' },
  header: { marginBottom: Spacing.lg },
  step: { fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, lineHeight: 22 },
  list: { flex: 1, gap: Spacing.sm, justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardDisabled: { opacity: 0.4 },
  icon: { fontSize: 26 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 16, fontWeight: '700' },
  cardDesc: { fontSize: 12, marginTop: 2 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  footer: { marginBottom: Spacing.lg, gap: Spacing.sm },
  counter: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  btn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.md,
  },
  btnText: { fontSize: 17, fontWeight: '700' },
});
