// Barra de progreso animada

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, BorderRadius } from '../../../theme/colors';

interface ProgressBarProps {
  progress: number;    // valor entre 0 y 1 (ej: 0.65 = 65%)
  label?: string;
  showPercent?: boolean;
  color?: string;
}

export default function ProgressBar({
  progress,
  label,
  showPercent = true,
  color = Colors.primaryContainer,
}: ProgressBarProps) {
  // useRef guarda un valor que NO provoca re-render cuando cambia
  // Animated.Value es un valor especial que React Native puede animar eficientemente
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animated.timing crea una animación suave desde el valor actual hasta "progress"
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false, // false porque animamos el width (layout property)
    }).start();
  }, [progress]);

  const percent = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      {(label || showPercent) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercent && <Text style={styles.percent}>{percent}%</Text>}
        </View>
      )}
      {/* Track (fondo de la barra) */}
      <View style={styles.track}>
        {/* Fill (relleno animado) */}
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: color,
              // interpolate convierte el valor 0-1 en un porcentaje de ancho
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  percent: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  track: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});