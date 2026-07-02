// Botón principal con degradado naranja

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  icon,
  fullWidth = true,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.9}
      style={[styles.wrapper, fullWidth && styles.fullWidth]}
    >
      <LinearGradient
        colors={[Colors.primaryContainer, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, (disabled || isLoading) && styles.buttonDisabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            {icon && (
              <MaterialIcons name={icon} size={18} color={Colors.onPrimaryContainer} />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
});