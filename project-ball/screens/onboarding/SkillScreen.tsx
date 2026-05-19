import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { SkillLevel } from '../../types/profile';

const LEVELS: { value: SkillLevel; label: string; desc: string; emoji: string }[] = [
  { value: 'beginner', label: 'Beginner', emoji: '🌱', desc: 'New to organized training, building fundamentals' },
  { value: 'intermediate', label: 'Intermediate', emoji: '⚡', desc: 'Consistent player, looking to sharpen your game' },
  { value: 'advanced', label: 'Advanced', emoji: '🔥', desc: 'Competitive player pushing elite-level training' },
];

interface Props {
  onNext: (level: SkillLevel) => void;
  stepLabel?: string;
}

export default function SkillScreen({ onNext, stepLabel = '2 of 5' }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<SkillLevel | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.accent }]}>{stepLabel}</Text>
          <Text style={[styles.title, { color: colors.textDark }]}>What's your skill level?</Text>
          <Text style={[styles.subtitle, { color: colors.textMid }]}>Be honest — we'll set the right difficulty so you're challenged, not overwhelmed.</Text>
        </View>

        <View style={styles.list}>
          {LEVELS.map((l) => {
            const active = selected === l.value;
            return (
              <TouchableOpacity
                key={l.value}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: colors.accentLight, borderColor: colors.accent },
                ]}
                onPress={() => setSelected(l.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.emoji}>{l.emoji}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, { color: colors.textDark }, active && { color: colors.primary }]}>{l.label}</Text>
                  <Text style={[styles.cardDesc, { color: colors.textMid }, active && { color: colors.textDark }]}>{l.desc}</Text>
                </View>
                <View style={[styles.radio, { borderColor: colors.surfaceBorder }, active && { borderColor: colors.accent }]}>
                  {active && <View style={[styles.radioDot, { backgroundColor: colors.accent }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: selected ? colors.accent : colors.surfaceBorder },
          ]}
          onPress={() => selected && onNext(selected)}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={[styles.btnText, { color: colors.white }]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, justifyContent: 'space-between' },
  header: { marginBottom: Spacing.xl },
  step: { fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, lineHeight: 22 },
  list: { flex: 1, gap: Spacing.md, justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 2,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  emoji: { fontSize: 32 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  btn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  btnText: { fontSize: 17, fontWeight: '700' },
});
