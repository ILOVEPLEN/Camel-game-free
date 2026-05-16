import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, unit, accent }: Props) {
  return (
    <View style={[styles.card, accent && styles.cardAccent]}>
      <Text style={[styles.value, accent && styles.valueAccent]}>
        {value}
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </Text>
      <Text style={[styles.label, accent && styles.labelAccent]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    ...Shadow.sm,
  },
  cardAccent: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  value: { fontSize: 28, fontWeight: '800', color: Colors.textDark },
  valueAccent: { color: Colors.white },
  unit: { fontSize: 14, fontWeight: '500' },
  label: { fontSize: 12, color: Colors.textMid, fontWeight: '500', marginTop: 2, textAlign: 'center' },
  labelAccent: { color: 'rgba(255,255,255,0.75)' },
});
