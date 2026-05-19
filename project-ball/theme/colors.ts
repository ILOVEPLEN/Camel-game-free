export type ColorSet = typeof LightColors;

export const LightColors = {
  primary: '#1E3A8A',
  accent: '#3B82F6',
  accentLight: '#EFF6FF',
  background: '#FFFFFF',
  surface: '#F5F7FA',
  surfaceBorder: '#E5E7EB',
  textDark: '#0F172A',
  textMid: '#64748B',
  textLight: '#94A3B8',
  white: '#FFFFFF',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  easy: '#22C55E',
  medium: '#F59E0B',
  hard: '#EF4444',
} as const;

export const DarkColors: ColorSet = {
  primary: '#3B82F6',
  accent: '#60A5FA',
  accentLight: '#1E3A8A',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceBorder: '#334155',
  textDark: '#F1F5F9',
  textMid: '#94A3B8',
  textLight: '#475569',
  white: '#FFFFFF',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  easy: '#22C55E',
  medium: '#F59E0B',
  hard: '#EF4444',
};

// Backward compat alias
export const Colors = LightColors;
