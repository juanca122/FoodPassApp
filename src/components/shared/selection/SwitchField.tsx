// Toggle switch con label y descripción

import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface SwitchFieldProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

export default function SwitchField({
  label,
  description,
  value,
  onToggle,
}: SwitchFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.label}>{label}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: Colors.surfaceContainerHigh,
          true: Colors.tertiaryContainer,
        }}
        thumbColor={value ? Colors.tertiary : Colors.outlineVariant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  textGroup: { flex: 1, marginRight: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  description: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
});
