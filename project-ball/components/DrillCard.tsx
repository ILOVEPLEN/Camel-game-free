import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Drill } from '../types/drill';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../theme/spacing';

const CATEGORY_LABELS: Record<string, string> = {
  shooting: 'Shooting',
  'ball-handling': 'Ball Handling',
  finishing: 'Finishing',
  footwork: 'Footwork',
  defense: 'Defense',
  conditioning: 'Conditioning',
  strength: 'Strength',
};

const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced'];

interface Props {
  drill: Drill;
  onPress: () => void;
  compact?: boolean;
}

export default function DrillCard({ drill, onPress, compact }: Props) {
  const { colors } = useTheme();
  const DIFFICULTY_COLORS = [colors.easy, colors.medium, colors.hard];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.background, borderColor: colors.surfaceBorder },
        compact && styles.compact,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.top}>
        <View style={[styles.catBadge, { backgroundColor: colors.accentLight }]}>
          <Text style={[styles.catText, { color: colors.accent }]}>{CATEGORY_LABELS[drill.category] ?? drill.category}</Text>
        </View>
        <View style={[styles.diffDot, { backgroundColor: DIFFICULTY_COLORS[drill.difficulty - 1] }]} />
      </View>
      <Text style={[styles.name, { color: colors.textDark }]} numberOfLines={2}>{drill.name}</Text>
      {!compact && (
        <Text style={[styles.desc, { color: colors.textMid }]} numberOfLines={2}>{drill.description}</Text>
      )}
      <View style={styles.meta}>
        <Text style={[styles.metaText, { color: colors.textLight }]}>{drill.duration} min</Text>
        <Text style={[styles.metaDot, { color: colors.textLight }]}>·</Text>
        <Text style={[styles.metaText, { color: colors.textLight }]}>{DIFFICULTY_LABELS[drill.difficulty]}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.xs,
    borderWidth: 1,
    ...Shadow.sm,
  },
  compact: { padding: Spacing.sm },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  catText: { fontSize: 11, fontWeight: '700' },
  diffDot: { width: 8, height: 8, borderRadius: 4 },
  name: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 13, lineHeight: 18 },
  meta: { flexDirection: 'row', gap: 6, marginTop: 2 },
  metaText: { fontSize: 12, fontWeight: '500' },
  metaDot: { fontSize: 12 },
});
