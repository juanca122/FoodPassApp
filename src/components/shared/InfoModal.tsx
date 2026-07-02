// src/components/shared/InfoModal.tsx
//
// Componente modal reutilizable y estilizado para mostrar información
// sobre características o explicar funciones de forma interactiva y profesional.

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Typography, Shadows } from '../../theme/colors';

interface InfoModalProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconColor?: string;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export default function InfoModal({
  visible,
  title,
  message,
  icon = 'info',
  iconColor = Colors.primary,
  onClose,
  actionText,
  onAction,
}: InfoModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {/* Icono decorativo superior */}
              <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
                <MaterialIcons name={icon} size={36} color={iconColor} />
              </View>

              {/* Contenido de texto */}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              {/* Botones de acción */}
              <View style={styles.buttonContainer}>
                {actionText && onAction && (
                  <TouchableOpacity
                    style={[styles.button, styles.actionButton]}
                    onPress={() => {
                      onAction();
                      onClose();
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.actionButtonText}>{actionText}</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.button, actionText ? styles.secondaryButton : styles.primaryButton]}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={actionText ? styles.secondaryButtonText : styles.primaryButtonText}>
                    {actionText ? 'Cerrar' : 'Entendido'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 31, 5, 0.4)', // Tono oscuro verdoso translúcido
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: Colors.surfaceContainerLowest, // Blanco puro
    borderRadius: BorderRadius.xxxl,
    padding: 24,
    alignItems: 'center',
    ...Shadows.modal,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...Typography.titleLg,
    color: Colors.onBackground,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    ...Typography.bodyMd,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.inverseSurface, // Verde oscuro
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  actionButton: {
    backgroundColor: Colors.primaryContainer, // Naranja
  },
  actionButtonText: {
    color: Colors.onPrimaryContainer,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  secondaryButtonText: {
    color: Colors.onBackground,
    fontSize: 14,
    fontWeight: '700',
  },
});
