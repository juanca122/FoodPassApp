// Muestra la foto o iniciales del usuario

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../theme/colors';

interface AvatarImageProps {
  size?: number;          // tamaño en px, por defecto 48
  initials?: string;      // ej: "MS" si no hay imagen
  imageUri?: string;      // URL de la imagen
  showBadge?: boolean;    // punto verde de "en línea"
}

export default function AvatarImage({
  size = 48,
  initials = '??',
  imageUri,
  showBadge = false,
}: AvatarImageProps) {
  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      ) : (
        <View style={[
          styles.initialsBox,
          { width: size, height: size, borderRadius: size / 2 }
        ]}>
          <Text style={[styles.initialsText, { fontSize: size * 0.35 }]}>
            {initials}
          </Text>
        </View>
      )}
      {showBadge && <View style={styles.onlineBadge} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  image: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
  initialsBox: {
    backgroundColor: Colors.inverseSurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontWeight: '800',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.tertiary,
    borderWidth: 2,
    borderColor: '#fff',
  },
});