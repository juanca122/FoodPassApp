// Sección con título y contenido

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface SectionContainerProps {
  title: string;
  linkLabel?: string;
  onLinkPress?: () => void;
  children: React.ReactNode;
}

export default function SectionContainer({
  title,
  linkLabel,
  onLinkPress,
  children,
}: SectionContainerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {linkLabel && (
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.link}>{linkLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
});