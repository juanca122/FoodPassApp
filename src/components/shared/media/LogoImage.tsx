// Logo de la app con ícono y texto

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

interface LogoImageProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function LogoImage({ size = 'md', showSubtitle = true }: LogoImageProps) {
  const config = {
    sm: { iconBox: 36, icon: 20, title: 16, subtitle: 9 },
    md: { iconBox: 52, icon: 28, title: 22, subtitle: 11 },
    lg: { iconBox: 68, icon: 36, title: 30, subtitle: 13 },
  }[size];

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, {
        width: config.iconBox,
        height: config.iconBox,
        borderRadius: config.iconBox * 0.3,
      }]}>
        <MaterialIcons
          name="restaurant-menu"
          size={config.icon}
          color={Colors.primaryContainer}
        />
      </View>
      <View>
        <Text style={[styles.title, { fontSize: config.title }]}>FoodPass</Text>
        {showSubtitle && (
          <Text style={[styles.subtitle, { fontSize: config.subtitle }]}>
            The Artisanal Ledger
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    backgroundColor: Colors.inverseSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.onSurfaceVariant,
    fontWeight: '500',
    marginTop: 1,
  },
});