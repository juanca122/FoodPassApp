// Campo de entrada del chat con botón de enviar

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../../theme/colors';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  placeholder = 'Escribe un mensaje...',
}: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length === 0) return; // no enviar mensajes vacíos
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={Colors.onSurfaceVariant + '80'}
          multiline
          maxLength={500}
        />
      </View>
      {/* Botón de enviar — solo activo si hay texto */}
      <TouchableOpacity
        style={[styles.sendButton, text.trim().length === 0 && styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={text.trim().length === 0}
        activeOpacity={0.8}
      >
        <MaterialIcons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerLow,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.xxl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
  },
  input: {
    fontSize: 14,
    color: Colors.onSurface,
    lineHeight: 20,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.surfaceContainerHigh,
  },
});