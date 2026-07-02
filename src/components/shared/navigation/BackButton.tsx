// Botón de regreso para pantallas internas

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

interface BackButtonProps {
  onPress: () => void;
  label?: string;
}

export default function BackButton({ onPress, label = 'Volver' }: BackButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconBox}>
        <MaterialIcons name="arrow-back-ios" size={16} color={Colors.onSurface} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

import { View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.onSurface,
  },
});