// AppPasswordInput.tsx
// Componente reutilizable para campos de contraseña.
// La diferencia con AppTextInput es que tiene el botón de mostrar/ocultar.

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

interface AppPasswordInputProps {
  label: string;              // ej: "PASSWORD"
  placeholder?: string;       // ej: "••••••••"
  value: string;              // valor actual
  onChangeText: (text: string) => void; // función al escribir
  rightLabel?: string;        // texto opcional a la derecha del label (ej: "¿OLVIDASTE?")
  onRightLabelPress?: () => void; // función al tocar el texto derecho
}

export default function PasswordField({
  label,
  placeholder = '••••••••',
  value,
  onChangeText,
  rightLabel,
  onRightLabelPress,
}: PasswordFieldProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>

      {/* Fila del label — puede tener texto a la derecha (ej: "¿Olvidaste?") */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightLabel && (
          <TouchableOpacity onPress={onRightLabelPress}>
            <Text style={styles.rightLabel}>{rightLabel}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Campo de entrada */}
      <View style={[
        styles.inputWrapper,
        focused && styles.inputWrapperFocused,
      ]}>
        {/* Ícono del candado */}
        <MaterialIcons
          name="lock"
          size={20}
          color={focused ? Colors.tertiary : Colors.onSurfaceVariant}
          style={styles.icon}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.onSurfaceVariant + '80'}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // secureTextEntry oculta el texto cuando es true
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Botón ojo — muestra u oculta la contraseña */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={20}
            color={Colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 1.5,
  },
  rightLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
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
    fontSize: 15,
    color: Colors.onSurface,
  },
  eyeButton: {
    padding: 14,
  },
});