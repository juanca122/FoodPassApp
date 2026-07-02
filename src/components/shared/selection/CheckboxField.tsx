// Checkbox con label y descripción opcional

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

interface CheckboxFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
}

export default function CheckboxField({
  label,
  description,
  checked,
  onToggle,
}: CheckboxFieldProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      {/* Caja del checkbox */}
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && (
          <MaterialIcons name="check" size={14} color="#fff" />
        )}
      </View>

      {/* Texto */}
      <View style={styles.textGroup}>
        <Text style={styles.label}>{label}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  boxChecked: {
    backgroundColor: Colors.tertiary,
    borderColor: Colors.tertiary,
  },
  textGroup: { flex: 1 },
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