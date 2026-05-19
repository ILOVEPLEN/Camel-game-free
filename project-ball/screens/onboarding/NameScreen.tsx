import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Spacing, Radius, Shadow } from '../../theme/spacing';

interface Props {
  onNext: (name: string) => void;
}

export default function NameScreen({ onNext }: Props) {
  const { colors } = useTheme();
  const [name, setName] = useState('');

  const canContinue = name.trim().length >= 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.container]}>
          <View style={styles.header}>
            <Text style={[styles.step, { color: colors.accent }]}>1 of 6</Text>
            <Text style={[styles.title, { color: colors.textDark }]}>What's your name?</Text>
            <Text style={[styles.subtitle, { color: colors.textMid }]}>
              We'll personalize your training experience just for you.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: colors.textDark }]}>Your Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  borderColor: name.trim().length > 0 ? colors.accent : colors.surfaceBorder,
                  color: colors.textDark,
                },
              ]}
              placeholder="e.g. Jordan, Kobe, LeBron..."
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
              autoFocus
              autoCorrect={false}
              maxLength={30}
              returnKeyType="next"
              onSubmitEditing={() => canContinue && onNext(name.trim())}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: canContinue ? colors.accent : colors.surfaceBorder },
            ]}
            onPress={() => canContinue && onNext(name.trim())}
            disabled={!canContinue}
            activeOpacity={0.85}
          >
            <Text style={[styles.btnText, { color: colors.white }]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    justifyContent: 'space-between',
    paddingBottom: Spacing.lg,
  },
  header: { marginBottom: Spacing.xl },
  step: { fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm },
  title: { fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, lineHeight: 22 },
  inputSection: { flex: 1, justifyContent: 'center', gap: Spacing.sm },
  label: { fontSize: 16, fontWeight: '700' },
  input: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 2,
    ...Shadow.sm,
  },
  btn: {
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    ...Shadow.md,
  },
  btnText: { fontSize: 17, fontWeight: '700' },
});
