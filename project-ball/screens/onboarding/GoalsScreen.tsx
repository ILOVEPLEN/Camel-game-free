import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';
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
}

export default function GoalsScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<Goal[]>([]);

  const toggle = (g: Goal) => {
    setSelected((prev) => {
      if (prev.includes(g)) return prev.filter((x) => x !== g);
      if (prev.length >= 3) return prev;
      return [...prev, g];
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>3 of 5</Text>
          <Text style={styles.title}>What are your goals?</Text>
          <Text style={styles.subtitle}>Pick up to 3. Your daily workouts will prioritize these areas.</Text>
        </View>

        <View style={styles.list}>
          {GOALS.map((g) => {
            const active = selected.includes(g.value);
            const disabled = !active && selected.length >= 3;
            return (
              <TouchableOpacity
                key={g.value}
                style={[styles.card, active && styles.cardActive, disabled && styles.cardDisabled]}
                onPress={() => !disabled && toggle(g.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.icon}>{g.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{g.label}</Text>
                  <Text style={[styles.cardDesc, active && styles.cardDescActive]}>{g.desc}</Text>
                </View>
                <View style={[styles.check, active && styles.checkActive]}>
                  {active && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.counter}>{selected.length}/3 selected</Text>
          <TouchableOpacity
            style={[styles.btn, selected.length === 0 && styles.btnDisabled]}
            onPress={() => selected.length > 0 && onNext(selected)}
            disabled={selected.length === 0}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, justifyContent: 'space-between' },
  header: { marginBottom: Spacing.lg },
  step: { fontSize: 13, color: Colors.accent, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textDark, marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, color: Colors.textMid, lineHeight: 22 },
  list: { flex: 1, gap: Spacing.sm, justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  cardActive: { backgroundColor: Colors.accentLight, borderColor: Colors.accent },
  cardDisabled: { opacity: 0.4 },
  icon: { fontSize: 26 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  cardLabelActive: { color: Colors.primary },
  cardDesc: { fontSize: 12, color: Colors.textMid, marginTop: 2 },
  cardDescActive: { color: Colors.textDark },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  checkMark: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  footer: { marginBottom: Spacing.lg, gap: Spacing.sm },
  counter: { textAlign: 'center', color: Colors.textMid, fontSize: 14, fontWeight: '600' },
  btn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.md,
  },
  btnDisabled: { backgroundColor: Colors.surfaceBorder },
  btnText: { color: Colors.white, fontSize: 17, fontWeight: '700' },
});
