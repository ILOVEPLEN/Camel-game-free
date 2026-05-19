import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { Position } from '../../types/profile';

const POSITIONS: { value: Position; label: string; desc: string }[] = [
  { value: 'PG', label: 'PG', desc: 'Point Guard' },
  { value: 'SG', label: 'SG', desc: 'Shooting Guard' },
  { value: 'SF', label: 'SF', desc: 'Small Forward' },
  { value: 'PF', label: 'PF', desc: 'Power Forward' },
  { value: 'C', label: 'C', desc: 'Center' },
];

interface Props {
  onNext: (position: Position) => void;
  stepLabel?: string;
}

export default function PositionScreen({ onNext, stepLabel = '1 of 5' }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<Position | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.accent }]}>{stepLabel}</Text>
          <Text style={[styles.title, { color: colors.textDark }]}>What position do you play?</Text>
          <Text style={[styles.subtitle, { color: colors.textMid }]}>We'll tailor your drills to match your role on the court.</Text>
        </View>

        <View style={styles.grid}>
          {POSITIONS.map((p) => {
            const active = selected === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => setSelected(p.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.cardLabel, { color: colors.textDark }, active && { color: colors.white }]}>{p.label}</Text>
                <Text style={[styles.cardDesc, { color: colors.textMid }, active && { color: 'rgba(255,255,255,0.8)' }]}>{p.desc}</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center', flex: 1, alignItems: 'center' },
  card: {
    width: '43%',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    ...Shadow.sm,
  },
  cardLabel: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
  cardDesc: { fontSize: 13, fontWeight: '500' },
  btn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  btnText: { fontSize: 17, fontWeight: '700' },
});
