import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';
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
}

export default function PositionScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<Position | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>1 of 5</Text>
          <Text style={styles.title}>What position do you play?</Text>
          <Text style={styles.subtitle}>We'll tailor your drills to match your role on the court.</Text>
        </View>

        <View style={styles.grid}>
          {POSITIONS.map((p) => {
            const active = selected === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => setSelected(p.value)}
                activeOpacity={0.8}
              >
                <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{p.label}</Text>
                <Text style={[styles.cardDesc, active && styles.cardDescActive]}>{p.desc}</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center', flex: 1, alignItems: 'center' },
  card: {
    width: '43%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    ...Shadow.sm,
  },
  cardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  cardLabel: { fontSize: 24, fontWeight: '800', color: Colors.textDark, marginBottom: 4 },
  cardLabelActive: { color: Colors.white },
  cardDesc: { fontSize: 13, color: Colors.textMid, fontWeight: '500' },
  cardDescActive: { color: 'rgba(255,255,255,0.8)' },
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
