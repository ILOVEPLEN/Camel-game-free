import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

interface Props {
  progress: number; // 0-1
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
}: Props) {
  const { colors } = useTheme();
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={colors.accentLight}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </Svg>
      <View style={[styles.center, { width: size, height: size }]}>
        {label ? <Text style={[styles.label, { color: colors.textDark }]}>{label}</Text> : null}
        {sublabel ? <Text style={[styles.sublabel, { color: colors.textMid }]}>{sublabel}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  center: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 22, fontWeight: '800' },
  sublabel: { fontSize: 12, marginTop: 2 },
});
