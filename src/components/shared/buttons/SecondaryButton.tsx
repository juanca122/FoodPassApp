// Botón secundario con fondo claro

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  variant?: 'light' | 'dark' | 'outline';
  fullWidth?: boolean;
}

export default function SecondaryButton({
  label,
  onPress,
  icon,
  variant = 'light',
  fullWidth = true,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        variant === 'light' && styles.variantLight,
        variant === 'dark' && styles.variantDark,
        variant === 'outline' && styles.variantOutline,
      ]}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={18}
          color={variant === 'dark' ? '#fff' : Colors.onSurface}
        />
      )}
      <Text style={[
        styles.label,
        variant === 'dark' && styles.labelDark,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: BorderRadius.xl,
    gap: 8,
  },
  fullWidth: { width: '100%' },
  variantLight: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  variantDark: {
    backgroundColor: Colors.inverseSurface,
  },
  variantOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  labelDark: {
    color: '#fff',
  },
});