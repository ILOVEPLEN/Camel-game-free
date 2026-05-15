import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

const TABS = [
  { id: 'home', label: 'Home', icon: 'home', iconOff: 'home-outline' },
  { id: 'train', label: 'Train', icon: 'basketball', iconOff: 'basketball-outline' },
  { id: 'generate', label: 'AI Plan', icon: 'sparkles', iconOff: 'sparkles-outline' },
  { id: 'progress', label: 'Progress', icon: 'bar-chart', iconOff: 'bar-chart-outline' },
  { id: 'streak', label: 'Streak', icon: 'flame', iconOff: 'flame-outline' },
];

export default function BottomTabBar({ active, onChange }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <TouchableOpacity key={tab.id} style={s.tab} onPress={() => onChange(tab.id)} activeOpacity={0.7}>
            <Ionicons
              name={isActive ? tab.icon : tab.iconOff}
              size={24}
              color={isActive ? colors.blue500 : colors.gray400}
            />
            <Text style={[s.label, isActive && s.labelActive]}>{tab.label}</Text>
            {isActive && <View style={s.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.gray400,
  },
  labelActive: {
    color: colors.blue500,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.blue500,
  },
});
