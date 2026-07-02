// Contenedor tipo tarjeta reutilizable

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius } from '../../theme/colors';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'green' | 'dark';
  padding?: number;
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = 'white',
  padding = 20,
  style,
}: CardProps) {
  return (
    <View style={[
      styles.card,
      { padding },
      variant === 'white' && styles.variantWhite,
      variant === 'green' && styles.variantGreen,
      variant === 'dark' && styles.variantDark,
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.xxxl,
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  variantWhite: {
    backgroundColor: Colors.surfaceContainerLowest,
  },
  variantGreen: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  variantDark: {
    backgroundColor: Colors.inverseSurface,
  },
});