// AppSelectInput.tsx
// Componente reutilizable para campos de selección (dropdown).
// Al tocarlo muestra una lista de opciones para elegir.
//
// Concepto nuevo: Modal
// Un Modal es una ventana que aparece encima de todo el contenido.
// En React Native se usa el componente <Modal> para esto.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../theme/colors';

// Tipo para cada opción del selector
interface SelectOption {
  label: string;   // texto que ve el usuario, ej: "Colombia"
  value: string;   // valor interno, ej: "CO"
}

interface CampoSelectorProps {
  label: string;                        // ej: "PAÍS"
  placeholder?: string;                 // ej: "Selecciona una opción"
  options: SelectOption[];              // lista de opciones
  value: string;                        // valor seleccionado actualmente
  onValueChange: (value: string) => void; // función al seleccionar
  icon?: keyof typeof MaterialIcons.glyphMap; // ícono opcional
}

export default function CampoSelector({
  label,
  placeholder = 'Selecciona una opción',
  options,
  value,
  onValueChange,
  icon = 'list',
}: CampoSelectorProps) {
  // Controla si el modal está abierto o cerrado
  const [modalVisible, setModalVisible] = useState(false);

  // Buscamos el label de la opción seleccionada para mostrarlo
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <View style={styles.container}>

      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Botón que abre el selector */}
      <TouchableOpacity
        style={[
          styles.selector,
          modalVisible && styles.selectorFocused,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        {/* Ícono izquierdo */}
        <MaterialIcons
          name={icon}
          size={20}
          color={modalVisible ? Colors.tertiary : Colors.onSurfaceVariant}
          style={styles.icon}
        />

        {/* Texto seleccionado o placeholder */}
        <Text style={[
          styles.selectorText,
          !selectedLabel && styles.placeholderText,
        ]}>
          {selectedLabel || placeholder}
        </Text>

        {/* Flecha que indica que es un dropdown */}
        <MaterialIcons
          name={modalVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color={Colors.onSurfaceVariant}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {/* Modal con las opciones
          El Modal se renderiza encima de todo el contenido de la pantalla */}
      <Modal
        visible={modalVisible}
        transparent={true}       // fondo semitransparente
        animationType="slide"    // animación desde abajo
        onRequestClose={() => setModalVisible(false)} // botón atrás de Android
      >
        {/* Fondo oscuro semitransparente — al tocarlo cierra el modal */}
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          {/* Contenedor del modal — evitamos que el toque se propague al backdrop */}
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
          >
            {/* Encabezado del modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color={Colors.onSurface} />
              </TouchableOpacity>
            </View>

            {/* Lista de opciones */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onValueChange(item.value); // guardamos el valor
                    setModalVisible(false);    // cerramos el modal
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === value && styles.optionTextSelected,
                  ]}>
                    {item.label}
                  </Text>

                  {/* Checkmark si está seleccionado */}
                  {item.value === value && (
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={Colors.tertiary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

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
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 52,
  },
  selectorFocused: {
    borderColor: Colors.tertiary,
  },
  icon: {
    marginLeft: 14,
    marginRight: 4,
  },
  selectorText: {
    flex: 1,
    fontSize: 15,
    color: Colors.onSurface,
    paddingVertical: 14,
  },
  placeholderText: {
    color: Colors.onSurfaceVariant + '80',
  },
  arrow: {
    marginRight: 12,
  },
  // MODAL
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end', // el modal aparece desde abajo
  },
  modalContainer: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: BorderRadius.xxxl,
    borderTopRightRadius: BorderRadius.xxxl,
    maxHeight: '60%',
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  optionSelected: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  optionText: {
    fontSize: 15,
    color: Colors.onSurface,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: Colors.tertiary,
    fontWeight: '700',
  },
});