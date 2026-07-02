// Tarjeta para mostrar un número o métrica importante

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface StatCardProps {
  label: string;
  value: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  trend?: string;        // ej: "+2 esta semana"
  trendPositive?: boolean;
  variant?: 'light' | 'dark';
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendPositive = true,
  variant = 'light',
}: StatCardProps) {
  const isDark = variant === 'dark';

  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.top}>
        <View style={[styles.iconBox, isDark && styles.iconBoxDark]}>
          <MaterialIcons
            name={icon}
            size={20}
            color={isDark ? Colors.primaryContainer : Colors.primary}
          />
        </View>
        {trend && (
          <Text style={[
            styles.trend,
            { color: trendPositive ? Colors.tertiary : Colors.error }
          ]}>
            {trend}
          </Text>
        )}
      </View>
      <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>
      <Text style={[styles.value, isDark && styles.valueDark]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.xxl,
    padding: 18,
    gap: 6,
  },
  cardDark: {
    backgroundColor: Colors.inverseSurface,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: Colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxDark: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  trend: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    maxWidth: 80,
    textAlign: 'right',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  labelDark: {
    color: 'rgba(255,255,255,0.5)',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  valueDark: {
    color: Colors.primaryContainer,
  },
});