import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { BBEquipment } from '../../types/profile';

const OPTIONS: { value: BBEquipment; label: string; desc: string; icon: string }[] = [
  { value: 'ball-only', label: 'Ball Only', icon: '🏀', desc: 'Just a basketball — no hoop nearby' },
  { value: 'ball-and-hoop', label: 'Ball + Hoop', icon: '⛹️', desc: 'A ball and a basket to shoot at' },
  { value: 'court-only', label: 'Court', icon: '🏟️', desc: 'Full court with hoop and cones' },
  { value: 'full-court', label: 'Full Setup', icon: '⭐', desc: 'Court, cones, two balls, all accessories' },
];

interface Props {
  onNext: (equipment: BBEquipment) => void;
  stepLabel?: string;
}

export default function BBEquipmentScreen({ onNext, stepLabel = '5 of 7' }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<BBEquipment | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.step, { color: colors.accent }]}>{stepLabel}</Text>
          <Text style={[styles.title, { color: colors.textDark }]}>Basketball setup?</Text>
          <Text style={[styles.subtitle, { color: colors.textMid }]}>
            We'll only give you drills you can actually run.
          </Text>
        </View>

        <View style={styles.list}>
          {OPTIONS.map((o) => {
            const active = selected === o.value;
            return (
              <TouchableOpacity
                key={o.value}
                style={[
                  styles.card,
                  { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
                  active && { backgroundColor: colors.accentLight, borderColor: colors.accent },
                ]}
                onPress={() => setSelected(o.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.icon}>{o.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, { color: colors.textDark }, active && { color: colors.primary }]}>
                    {o.label}
                  </Text>
                  <Text style={[styles.cardDesc, { color: colors.textMid }]}>{o.desc}</Text>
                </View>
                <View style={[styles.radio, { borderColor: colors.surfaceBorder }, active && { borderColor: colors.accent }]}>
                  {active && <View style={[styles.radioDot, { backgroundColor: colors.accent }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: selected ? colors.accent : colors.surfaceBorder }]}
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
  icon: { fontSize: 28 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 16, fontWeight: '700' },
  cardDesc: { fontSize: 12, marginTop: 2, lineHeight: 17 },
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
