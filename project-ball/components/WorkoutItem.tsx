import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SessionDrill } from '../types/workout';
import { useTheme } from '../theme/ThemeContext';
import { Spacing, Radius } from '../theme/spacing';

const BLOCK_LABELS: Record<string, string> = {
  warmup: 'Warm-Up',
  skill: 'Skill',
  conditioning: 'Conditioning',
  lift: 'Strength',
  cooldown: 'Cool-Down',
};

interface Props {
  item: SessionDrill;
  completed?: boolean;
  onPress: () => void;
  onSwap?: () => void;
}

export default function WorkoutItem({ item, completed, onPress, onSwap }: Props) {
  const { colors, isDark } = useTheme();

  const BLOCK_COLORS: Record<string, string> = {
    warmup: isDark ? '#451A00' : '#FEF9C3',
    skill: colors.accentLight,
    conditioning: isDark ? '#052E16' : '#DCFCE7',
    lift: isDark ? '#2E1065' : '#EDE9FE',
    cooldown: colors.surface,
  };

  const BLOCK_TEXT_COLORS: Record<string, string> = {
    warmup: isDark ? '#FDE68A' : '#92400E',
    skill: colors.primary,
    conditioning: isDark ? '#86EFAC' : '#166534',
    lift: isDark ? '#C4B5FD' : '#5B21B6',
    cooldown: colors.textMid,
  };

  return (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: colors.background, borderColor: colors.surfaceBorder },
        completed && styles.rowDone,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.blockTag, { backgroundColor: BLOCK_COLORS[item.block] ?? colors.accentLight }]}>
        <Text style={[styles.blockText, { color: BLOCK_TEXT_COLORS[item.block] ?? colors.primary }]}>
          {BLOCK_LABELS[item.block] ?? item.block}
        </Text>
      </View>
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            { color: colors.textDark },
            completed && { textDecorationLine: 'line-through', color: colors.textMid },
          ]}
          numberOfLines={1}
        >
          {item.drill.name}
        </Text>
        <Text style={[styles.meta, { color: colors.textMid }]}>
          {item.drill.duration} min{item.targetSets ? ` · ${item.targetSets} sets` : ''}
        </Text>
      </View>
      {completed ? (
        <View style={[styles.checkCircle, { backgroundColor: colors.easy }]}>
          <Text style={[styles.checkMark, { color: colors.white }]}>✓</Text>
        </View>
      ) : onSwap ? (
        <TouchableOpacity onPress={onSwap} style={styles.swapBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.swapText, { color: colors.accent }]}>Swap</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
  },
  rowDone: { opacity: 0.6 },
  blockTag: {
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  blockText: { fontSize: 10, fontWeight: '700' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700' },
  meta: { fontSize: 12, marginTop: 2 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 13, fontWeight: '800' },
  swapBtn: { paddingHorizontal: 8 },
  swapText: { fontSize: 13, fontWeight: '600' },
});
