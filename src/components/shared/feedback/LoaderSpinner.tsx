// Indicador de carga

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';

interface LoaderSpinnerProps {
  label?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;   // ocupa toda la pantalla
}

export default function LoaderSpinner({
  label,
  size = 'large',
  fullScreen = false,
}: LoaderSpinnerProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={Colors.primaryContainer} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  label: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    fontWeight: '500',
  },
});