// Badge de estado — componente signature del sistema de diseño

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../../theme/colors';

interface FreshnessBadgeProps {
  label: string;
  status?: 'success' | 'error' | 'warning' | 'info';
}

export default function FreshnessBadge({
  label,
  status = 'success',
}: FreshnessBadgeProps) {
  const colorMap = {
    success: { bg: Colors.tertiaryContainer, text: Colors.onTertiaryContainer },
    error: { bg: Colors.errorContainer, text: Colors.onErrorContainer },
    warning: { bg: Colors.primaryContainer, text: Colors.onPrimaryContainer },
    info: { bg: Colors.surfaceContainerHigh, text: Colors.onSurfaceVariant },
  }[status];

  return (
    <View style={[styles.badge, { backgroundColor: colorMap.bg }]}>
      <Text style={[styles.text, { color: colorMap.text }]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});