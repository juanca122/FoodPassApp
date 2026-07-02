// Botón circular con solo un ícono

import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface IconButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  size?: number;
  variant?: 'light' | 'dark' | 'orange';
  showDot?: boolean;   // punto de notificación
}

export default function IconButton({
  icon,
  onPress,
  size = 44,
  variant = 'light',
  showDot = false,
}: IconButtonProps) {
  const bgColor = {
    light: Colors.surfaceContainerLow,
    dark: Colors.inverseSurface,
    orange: Colors.primaryContainer,
  }[variant];

  const iconColor = variant === 'light' ? Colors.onSurface : '#fff';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bgColor,
      }]}
    >
      <MaterialIcons name={icon} size={size * 0.45} color={iconColor} />
      {showDot && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryContainer,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});