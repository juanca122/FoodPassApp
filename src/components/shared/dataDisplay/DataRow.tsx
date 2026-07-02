// Fila de dato con label y valor — para listas de info

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';

interface DataRowProps {
  label: string;
  value: string;
  showDivider?: boolean;
}

export default function DataRow({ label, value, showDivider = true }: DataRowProps) {
  return (
    <View style={[styles.row, showDivider && styles.rowDivider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  label: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
  },
});