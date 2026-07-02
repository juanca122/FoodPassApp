// Ítem individual de la barra de navegación inferior

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

interface TabItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
  badgeCount?: number;  // número de notificaciones
}

export default function TabItem({
  icon,
  label,
  active,
  onPress,
  badgeCount,
}: TabItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Ícono con pill activo */}
      <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
        <MaterialIcons
          name={icon}
          size={22}
          color={active ? Colors.onPrimaryContainer : 'rgba(255,255,255,0.5)'}
        />
        {/* Badge de notificaciones */}
        {badgeCount !== undefined && badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badgeCount > 9 ? '9+' : badgeCount}
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.label, active && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 8,
  },
  iconWrap: {
    width: 44,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapActive: {
    backgroundColor: Colors.primaryContainer,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  labelActive: {
    color: Colors.primaryContainer,
    fontWeight: '700',
  },
});