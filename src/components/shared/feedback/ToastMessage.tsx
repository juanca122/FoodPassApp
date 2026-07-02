// Mensaje toast que aparece brevemente en pantalla

import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface ToastMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
}

export default function ToastMessage({
  message,
  type = 'success',
  visible,
}: ToastMessageProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Aparece rápido, espera, desaparece
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(2500),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const config = {
    success: { icon: 'check-circle' as const, color: Colors.tertiary, bg: Colors.tertiaryContainer },
    error: { icon: 'error' as const, color: Colors.error, bg: Colors.errorContainer },
    info: { icon: 'info' as const, color: Colors.primary, bg: Colors.surfaceContainerLowest },
  }[type];

  return (
    <Animated.View style={[styles.toast, { opacity, backgroundColor: config.bg }]}>
      <MaterialIcons name={config.icon} size={18} color={config.color} />
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});