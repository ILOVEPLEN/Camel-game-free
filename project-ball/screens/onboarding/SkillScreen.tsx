import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { SkillLevel } from '../../types/profile';

const LEVELS: { value: SkillLevel; label: string; desc: string; emoji: string }[] = [
  { value: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'New to organized training, building fundamentals' },
  { value: 'intermediate', label: 'Intermediate', emoji: '⚡', desc: 'Consistent player, looking to sharpen your game' },
  { value: 'advanced', label: 'Advanced', emoji: '🔥', desc: 'Competitive player pushing elite-level training' },
];

interface Props {
  onNext: (level: SkillLevel) => void;
}

export default function SkillScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<SkillLevel | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>2 of 5</Text>
          <Text style={styles.title}>What's your skill level?</Text>
          <Text style={styles.subtitle}>Be honest — we'll set the right difficulty so you're challenged, not overwhelmed.</Text>
        </View>

        <View style={styles.list}>
          {LEVELS.map((l) => {
            const active = selected === l.value;
            return (
              <TouchableOpacity
                key={l.value}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => setSelected(l.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.emoji}>{l.emoji}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{l.label}</Text>
                  <Text style={[styles.cardDesc, active && styles.cardDescActive]}>{l.desc}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.btn, !selected && styles.btnDisabled]}
          onPress={() => selected && onNext(selected)}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Continue</Text>
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
  list: { flex: 1, gap: Spacing.md, justifyContent: 'center' },
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
  emoji: { fontSize: 32 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 18, fontWeight: '700', color: Colors.textDark, marginBottom: 2 },
  cardLabelActive: { color: Colors.primary },
  cardDesc: { fontSize: 13, color: Colors.textMid, lineHeight: 18 },
  cardDescActive: { color: Colors.textDark },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: Colors.accent },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
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
