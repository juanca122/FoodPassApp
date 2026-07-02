// src/screens/PerfilScreen.tsx
//
// Pantalla de perfil del usuario.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Typography } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import InfoModal from '../components/shared/InfoModal';

// Tipo para los items del menú de configuración
type SettingItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  description?: string;
  type: 'arrow' | 'toggle' | 'badge';
  badge?: string;
  badgeColor?: string;
  value?: boolean;
};

const settingsSections: { title: string; items: SettingItem[] }[] = [
  {
    title: 'Mi Cuenta',
    items: [
      { icon: 'person-outline', label: 'Información personal', type: 'arrow' },
      { icon: 'workspace-premium', label: 'Mi plan', description: 'Premium · Activo', type: 'badge', badge: 'Premium', badgeColor: Colors.primaryContainer },
      { icon: 'notifications-none', label: 'Notificaciones', type: 'toggle', value: true },
      { icon: 'lock-outline', label: 'Seguridad', type: 'arrow' },
    ],
  },
  {
    title: 'FoodPass',
    items: [
      { icon: 'restaurant-menu', label: 'Preferencias de menú', type: 'arrow' },
      { icon: 'place', label: 'Mis sedes favoritas', type: 'arrow' },
      { icon: 'card-giftcard', label: 'Programa de puntos', type: 'badge', badge: '1,240 pts', badgeColor: Colors.tertiaryContainer },
    ],
  },
  {
    title: 'Soporte',
    items: [
      { icon: 'help-outline', label: 'Centro de ayuda', type: 'arrow' },
      { icon: 'chat-bubble-outline', label: 'Contactar soporte', type: 'arrow' },
      { icon: 'info-outline', label: 'Versión 2.4.1', type: 'badge', badge: 'Actualizado', badgeColor: Colors.tertiaryContainer },
    ],
  },
];

export default function PerfilScreen() {
  const { logout } = useAuth();

  // Estado del interruptor de notificaciones
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Estados para modal explicativo
  const [activeInfo, setActiveInfo] = useState<{ title: string; message: string; icon: keyof typeof MaterialIcons.glyphMap } | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleSettingPress = (label: string) => {
    let title = '';
    let message = '';
    let icon: keyof typeof MaterialIcons.glyphMap = 'info';

    switch (label) {
      case 'edit':
        title = 'Editar Perfil';
        message = 'Tu información de perfil de FoodPass está sincronizada directamente con el sistema de nómina e identificación corporativa de tu empresa.\n\nPara solicitar cambios en tu nombre, correo o foto, por favor comunícate con el área de Gestión Humana de tu empresa.';
        icon = 'edit';
        break;
      case 'Información personal':
        title = 'Información Personal';
        message = 'Datos de Cuenta:\n\n• Nombre: Juan Pérez\n• Cargo: Especialista de TI\n• Correo: juan.perez@empresa.com\n• Teléfono: +57 311 555 1234\n• Corporación: Ledger Corporate SAS\n\nEstos datos son gestionados por el administrador corporativo.';
        icon = 'person';
        break;
      case 'Mi plan':
        title = 'Detalle del Plan';
        message = 'Información de Suscripción:\n\n• Plan: FoodPass Premium\n• Cupo Mensual: 22 almuerzos laborales\n• Periodo de Facturación: Mensual automático\n• Estado: ACTIVO\n\nTu suscripción está financiada al 100% por tu empleador como beneficio laboral.';
        icon = 'workspace-premium';
        break;
      case 'Seguridad':
        title = 'Seguridad de la Cuenta';
        message = 'La aplicación utiliza el sistema de autenticación única corporativa (SSO).\n\nPara cambiar tu contraseña o actualizar tus credenciales de inicio de sesión, accede al portal de autogestión de seguridad en la intranet de tu compañía.';
        icon = 'lock';
        break;
      case 'Preferencias de menú':
        title = 'Preferencias Gastronómicas';
        message = 'Tus opciones preferidas actuales:\n\n• Categoría: Plato Fuerte / Parrilla\n• Alérgenos declarados: Ninguno\n• Dieta: Sin restricciones\n\nNuestras cocinas asociadas consultan estas preferencias para sugerirte platos del chef alineados con tus gustos.';
        icon = 'restaurant-menu';
        break;
      case 'Mis sedes favoritas':
        title = 'Sedes Autorizadas';
        message = 'Sedes asociadas a tu plan de retiro:\n\n1. Sede Centro (Default)\n2. Sede Norte\n3. Sede Sur\n\nPuedes retirar tu almuerzo en cualquiera de estas sucursales mostrando tu código QR de canje.';
        icon = 'place';
        break;
      case 'Programa de puntos':
        title = 'Programa de Puntos Pass';
        message = 'Puntos Acumulados: 1,240 pts\n\nObtienes 1 punto por cada dólar de almuerzo laboral consumido.\n\nPróxima meta: Acumula 1,500 puntos para desbloquear un almuerzo especial del Chef de cortesía en cualquier sede.';
        icon = 'card-giftcard';
        break;
      case 'Centro de ayuda':
        title = 'Centro de Soporte';
        message = 'Preguntas Frecuentes:\n\n• ¿Hasta qué hora puedo canjear? El horario de canje es de 11:30 AM a 2:30 PM.\n• ¿Los almuerzos se acumulan? No, los almuerzos no consumidos en el mes expiran y no se transfieren al siguiente ciclo.';
        icon = 'help-outline';
        break;
      case 'Contactar soporte':
        title = 'Contacto de Soporte';
        message = '¿Tienes inconvenientes con la aplicación o con un almuerzo?\n\n• Correo electrónico: soporte@foodpass.co\n• Teléfono de atención: 01-8000-FOODPASS\n• Chat interno: Disponible en la intranet corporativa.\n\nHorario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM.';
        icon = 'chat-bubble-outline';
        break;
      default:
        return;
    }

    setActiveInfo({ title, message, icon });
    setShowInfoModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header personalizado para perfil */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Mi Perfil</Text>
        <TouchableOpacity
          style={styles.topBarAction}
          onPress={() => handleSettingPress('edit')}
          activeOpacity={0.7}
        >
          <MaterialIcons name="edit" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* === TARJETA DE PERFIL === */}
        <View style={styles.profileCard}>
          {/* Avatar grande */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JP</Text>
            {/* Badge de verificado */}
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={18} color={Colors.tertiary} />
            </View>
          </View>

          <Text style={styles.profileName}>Juan Perez</Text>
          <Text style={styles.profileEmail}>juan.perez@empresa.com</Text>

          {/* Chip de membresía */}
          <View style={styles.membershipChip}>
            <MaterialIcons name="workspace-premium" size={14} color={Colors.onPrimaryContainer} />
            <Text style={styles.membershipText}>Premium Member</Text>
          </View>

          {/* Stats del perfil */}
          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNumber}>128</Text>
              <Text style={styles.profileStatLabel}>PEDIDOS</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatNumber}>1,240</Text>
              <Text style={styles.profileStatLabel}>PUNTOS</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={[styles.profileStatNumber, { color: Colors.tertiary }]}>$1,450</Text>
              <Text style={styles.profileStatLabel}>AHORRADO</Text>
            </View>
          </View>
        </View>

        {/* === SECCIONES DE CONFIGURACIÓN === */}
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.settingsSectionTitle}>{section.title.toUpperCase()}</Text>

            <View style={styles.settingsGroup}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.settingItem,
                    // Sin borde en el último elemento
                    index === section.items.length - 1 && styles.settingItemLast,
                  ]}
                  activeOpacity={item.type !== 'toggle' ? 0.7 : 1}
                  onPress={() => item.type !== 'toggle' && handleSettingPress(item.label)}
                >
                  {/* Ícono */}
                  <View style={styles.settingIcon}>
                    <MaterialIcons name={item.icon} size={20} color={Colors.primary} />
                  </View>

                  {/* Texto */}
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.description && (
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    )}
                  </View>

                  {/* Control del lado derecho */}
                  {item.type === 'arrow' && (
                    <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.onSurfaceVariant} />
                  )}
                  {item.type === 'toggle' && (
                    // Switch es el componente de toggle nativo
                    <Switch
                      value={notifEnabled}
                      onValueChange={setNotifEnabled}
                      trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.tertiaryContainer }}
                      thumbColor={notifEnabled ? Colors.tertiary : Colors.outlineVariant}
                    />
                  )}
                  {item.type === 'badge' && item.badge && (
                    <View style={[styles.settingBadge, { backgroundColor: item.badgeColor }]}>
                      <Text style={styles.settingBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Botón de cerrar sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={logout}
        >
          <MaterialIcons name="logout" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* MODAL DE INFORMACIÓN */}
      {activeInfo && (
        <InfoModal
          visible={showInfoModal}
          title={activeInfo.title}
          message={activeInfo.message}
          icon={activeInfo.icon}
          onClose={() => setShowInfoModal(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.3,
  },
  topBarAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: { flex: 1 },
  // TARJETA DE PERFIL
  profileCard: {
    margin: 20,
    backgroundColor: Colors.inverseSurface,
    borderRadius: BorderRadius.xxxl,
    padding: 28,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.onPrimaryContainer,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 2,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 14,
  },
  membershipChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginBottom: 24,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: BorderRadius.xl,
    padding: 16,
    width: '100%',
    justifyContent: 'space-around',
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  profileStatLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    marginTop: 2,
  },
  profileStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  // CONFIGURACIÓN
  settingsSection: {
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  settingsSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingLeft: 4,
  },
  settingsGroup: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // Separador sutil en el fondo (no en el último)
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 1,
  },
  settingBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  settingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
    letterSpacing: 0.5,
  },
  // LOGOUT
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 16,
    backgroundColor: Colors.errorContainer,
    borderRadius: BorderRadius.xl,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.error,
  },
});
