import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, unit, accent }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[
      styles.card,
      { backgroundColor: colors.surface, borderColor: colors.surfaceBorder },
      accent && { backgroundColor: colors.primary, borderColor: colors.primary },
    ]}>
      <Text style={[styles.value, { color: colors.textDark }, accent && { color: colors.white }]}>
        {value}
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </Text>
      <Text style={[styles.label, { color: colors.textMid }, accent && { color: 'rgba(255,255,255,0.75)' }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    ...Shadow.sm,
  },
  value: { fontSize: 28, fontWeight: '800' },
  unit: { fontSize: 14, fontWeight: '500' },
  label: { fontSize: 12, fontWeight: '500', marginTop: 2, textAlign: 'center' },
});
