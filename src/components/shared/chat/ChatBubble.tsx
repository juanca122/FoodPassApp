// Burbuja de mensaje del chat

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../../theme/colors';
import AvatarImage from '../media/AvatarImage';

interface ChatBubbleProps {
  message: string;
  time: string;
  isOwn: boolean;       // true = mensaje propio (derecha), false = del otro (izquierda)
  initials?: string;
  imageUri?: string;
}

export default function ChatBubble({
  message,
  time,
  isOwn,
  initials = '??',
  imageUri,
}: ChatBubbleProps) {
  return (
    <View style={[styles.row, isOwn && styles.rowOwn]}>
      {/* Avatar — solo aparece en mensajes del otro */}
      {!isOwn && (
        <AvatarImage size={32} initials={initials} imageUri={imageUri} />
      )}

      <View style={styles.group}>
        {/* Burbuja */}
        <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
          <Text style={[styles.message, isOwn && styles.messageOwn]}>
            {message}
          </Text>
        </View>
        {/* Hora */}
        <Text style={[styles.time, isOwn && styles.timeOwn]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  rowOwn: {
    flexDirection: 'row-reverse',
  },
  group: {
    maxWidth: '75%',
    gap: 4,
  },
  bubble: {
    padding: 14,
    borderRadius: BorderRadius.xxl,
  },
  bubbleOther: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderBottomLeftRadius: 4,
  },
  bubbleOwn: {
    backgroundColor: Colors.primaryContainer,
    borderBottomRightRadius: 4,
  },
  message: {
    fontSize: 14,
    color: Colors.onSurface,
    lineHeight: 20,
  },
  messageOwn: {
    color: Colors.onPrimaryContainer,
  },
  time: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginLeft: 4,
  },
  timeOwn: {
    textAlign: 'right',
    marginRight: 4,
  },
});