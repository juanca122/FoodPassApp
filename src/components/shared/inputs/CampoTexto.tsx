// src/components/shared/inputs/TextInput.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput as RNTextInput,  // renombramos para no chocar con el nuestro
  StyleSheet 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

// Props que acepta el componente
interface TextInputProps {
  label: string;                                    // ej: "EMAIL ADDRESS"
  placeholder: string;                              // ej: "name@example.com"
  value: string;                                    // el valor actual
  onChangeText: (text: string) => void;             // función al escribir
  icon: keyof typeof MaterialIcons.glyphMap;        // ícono de MaterialIcons
  keyboardType?: 'default' | 'email-address' | 'numeric'; // tipo de teclado
  autoCapitalize?: 'none' | 'sentences' | 'words'; // capitalización
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input */}
      <View style={[
        styles.inputWrapper,
        focused && styles.inputWrapperFocused
      ]}>
        <MaterialIcons
          name={icon}
          size={20}
          color={focused ? Colors.tertiary : Colors.onSurfaceVariant}
          style={styles.icon}
        />
        <RNTextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.onSurfaceVariant + '80'}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 1.5,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputWrapperFocused: {
    borderColor: Colors.tertiary,
  },
  icon: {
    marginLeft: 14,
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 14,
    fontSize: 15,
    color: Colors.onSurface,
  },
});