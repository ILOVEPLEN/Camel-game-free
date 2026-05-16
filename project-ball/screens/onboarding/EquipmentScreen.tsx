import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { EquipmentAccess } from '../../types/profile';

const OPTIONS: { value: EquipmentAccess; label: string; desc: string; icon: string }[] = [
  { value: 'full-gym', label: 'Full Gym', icon: '🏋️', desc: 'Weights, barbells, plyometric boxes, full court' },
  { value: 'home-gym', label: 'Home Gym', icon: '🏠', desc: 'Dumbbells, resistance bands, outdoor hoop' },
  { value: 'court-only', label: 'Court Only', icon: '🏀', desc: 'Full court with hoop, cones, two balls' },
  { value: 'ball-and-hoop', label: 'Ball + Hoop', icon: '⛹️', desc: 'Just a ball and a basket — we work with it' },
];

interface Props {
  onNext: (access: EquipmentAccess) => void;
}

export default function EquipmentScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<EquipmentAccess | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.step}>4 of 5</Text>
          <Text style={styles.title}>What's your training setup?</Text>
          <Text style={styles.subtitle}>We'll only give you drills you can actually do.</Text>
        </View>

        <View style={styles.list}>
          {OPTIONS.map((o) => {
            const active = selected === o.value;
            return (
              <TouchableOpacity
                key={o.value}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => setSelected(o.value)}
                activeOpacity={0.8}
              >
                <Text style={styles.icon}>{o.icon}</Text>
                <View style={styles.cardText}>
                  <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{o.label}</Text>
                  <Text style={[styles.cardDesc, active && styles.cardDescActive]}>{o.desc}</Text>
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
  icon: { fontSize: 28 },
  cardText: { flex: 1 },
  cardLabel: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  cardLabelActive: { color: Colors.primary },
  cardDesc: { fontSize: 12, color: Colors.textMid, marginTop: 2, lineHeight: 17 },
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
