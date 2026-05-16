import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Spacing, Radius } from '../theme/spacing';

const RPE_LABELS: Record<number, string> = {
  1: 'Very Easy', 2: 'Easy', 3: 'Moderate', 4: 'Somewhat Hard',
  5: 'Hard', 6: 'Hard+', 7: 'Very Hard', 8: 'Very Hard+',
  9: 'Extremely Hard', 10: 'Max Effort',
};

interface Props {
  value: number;
  onChange: (v: number) => void;
}

export default function RPESlider({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const active = n === value;
          const color = n <= 4 ? Colors.easy : n <= 7 ? Colors.warning : Colors.error;
          return (
            <TouchableOpacity
              key={n}
              style={[styles.dot, { borderColor: color }, active && { backgroundColor: color }]}
              onPress={() => onChange(n)}
              activeOpacity={0.8}
            >
              <Text style={[styles.dotText, active && styles.dotTextActive]}>{n}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {value > 0 && (
        <Text style={styles.label}>RPE {value} — {RPE_LABELS[value]}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.sm },
  row: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', justifyContent: 'center' },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: { fontSize: 13, fontWeight: '700', color: Colors.textDark },
  dotTextActive: { color: Colors.white },
  label: { textAlign: 'center', fontSize: 13, color: Colors.textMid, fontWeight: '500' },
});
