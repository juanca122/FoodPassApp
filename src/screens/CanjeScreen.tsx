// src/screens/CanjeScreen.tsx
//
// Pantalla de canje con código QR.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius, Typography } from '../theme/colors';
import InfoModal from '../components/shared/InfoModal';

export default function CanjeScreen() {
  const [activeTab, setActiveTab] = useState<'qr' | 'codigo'>('qr');

  // Estados para modales explicativos
  const [showLunchesInfo, setShowLunchesInfo] = useState(false);
  const [showPointsInfo, setShowPointsInfo] = useState(false);
  const [showQRInfo, setShowQRInfo] = useState(false);

  // Estados para detalle del canje histórico
  const [selectedCanje, setSelectedCanje] = useState<any | null>(null);
  const [showCanjeModal, setShowCanjeModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Canje de Almuerzo" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* === ESTADÍSTICAS RÁPIDAS === */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statChip}
            activeOpacity={0.8}
            onPress={() => setShowLunchesInfo(true)}
          >
            <Text style={styles.statChipNumber}>14</Text>
            <Text style={styles.statChipLabel}>CANJES RESTANTES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statChip, styles.statChipDark]}
            activeOpacity={0.8}
            onPress={() => setShowPointsInfo(true)}
          >
            <Text style={[styles.statChipNumber, { color: Colors.primaryContainer }]}>1,240</Text>
            <Text style={[styles.statChipLabel, { color: 'rgba(255,255,255,0.6)' }]}>PUNTOS PASS</Text>
          </TouchableOpacity>
        </View>

        {/* === TARJETA PRINCIPAL DE CANJE === */}
        <View style={styles.qrCard}>
          {/* Tabs QR / Código manual */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'qr' && styles.tabActive]}
              onPress={() => setActiveTab('qr')}
            >
              <MaterialIcons
                name="qr-code"
                size={16}
                color={activeTab === 'qr' ? Colors.onSurface : Colors.onSurfaceVariant}
              />
              <Text style={[styles.tabText, activeTab === 'qr' && styles.tabTextActive]}>
                Código QR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'codigo' && styles.tabActive]}
              onPress={() => setActiveTab('codigo')}
            >
              <MaterialIcons
                name="pin"
                size={16}
                color={activeTab === 'codigo' ? Colors.onSurface : Colors.onSurfaceVariant}
              />
              <Text style={[styles.tabText, activeTab === 'codigo' && styles.tabTextActive]}>
                Código Manual
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'qr' ? (
            /* === VISTA QR === */
            <View style={styles.qrSection}>
              {/* Placeholder del QR Code */}
              <TouchableOpacity
                style={styles.qrPlaceholder}
                activeOpacity={0.9}
                onPress={() => setShowQRInfo(true)}
              >
                {/* Esquinas del QR (decorativas) */}
                <View style={[styles.qrCorner, styles.qrCornerTL]} />
                <View style={[styles.qrCorner, styles.qrCornerTR]} />
                <View style={[styles.qrCorner, styles.qrCornerBL]} />
                <View style={[styles.qrCorner, styles.qrCornerBR]} />

                <MaterialIcons name="qr-code-2" size={160} color={Colors.onSurface} />
                <View style={styles.qrCenterDot}>
                  <MaterialIcons name="restaurant-menu" size={24} color={Colors.primaryContainer} />
                </View>
              </TouchableOpacity>

              <Text style={styles.qrLabel}>FP-2024-001-MS</Text>
              <Text style={styles.qrSubtitle}>
                Muestra este código al cajero para canjear tu almuerzo (Toca el QR para ayuda)
              </Text>

              {/* Countdown timer simulado */}
              <View style={styles.timer}>
                <MaterialIcons name="timer" size={14} color={Colors.tertiary} />
                <Text style={styles.timerText}>Válido por 04:32</Text>
              </View>
            </View>
          ) : (
            /* === VISTA CÓDIGO MANUAL === */
            <View style={styles.codeSection}>
              <Text style={styles.codeTitle}>Tu código de hoy</Text>
              <View style={styles.codeDisplay}>
                {['F', 'P', '-', '7', '8', '3', '4'].map((char, i) => (
                  <View key={i} style={styles.codeChar}>
                    <Text style={styles.codeCharText}>{char}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.codeSubtitle}>
                Dicta este código en caja si el QR no funciona
              </Text>
            </View>
          )}
        </View>

        {/* === INFO DEL PLAN === */}
        <View style={styles.planInfo}>
          <View style={styles.planInfoRow}>
            <View style={styles.planInfoIcon}>
              <MaterialIcons name="calendar-today" size={18} color={Colors.primary} />
            </View>
            <View style={styles.planInfoText}>
              <Text style={styles.planInfoLabel}>CICLO ACTUAL</Text>
              <Text style={styles.planInfoValue}>Mayo 2024 — 22 días laborables</Text>
            </View>
          </View>

          <View style={styles.planInfoDivider} />

          <View style={styles.planInfoRow}>
            <View style={styles.planInfoIcon}>
              <MaterialIcons name="schedule" size={18} color={Colors.primary} />
            </View>
            <View style={styles.planInfoText}>
              <Text style={styles.planInfoLabel}>HORARIO DE CANJE</Text>
              <Text style={styles.planInfoValue}>11:30 AM – 2:30 PM (días hábiles)</Text>
            </View>
          </View>

          <View style={styles.planInfoDivider} />

          <View style={styles.planInfoRow}>
            <View style={styles.planInfoIcon}>
              <MaterialIcons name="place" size={18} color={Colors.primary} />
            </View>
            <View style={styles.planInfoText}>
              <Text style={styles.planInfoLabel}>SEDES DISPONIBLES</Text>
              <Text style={styles.planInfoValue}>Centro, Norte, Sur y Cafetería</Text>
            </View>
          </View>
        </View>

        {/* === HISTORIAL RÁPIDO === */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Últimos canjes (Toca para ver detalles)</Text>
          {[
            { name: 'Artisan Salad Bowl', date: 'Hoy', sede: 'Sede Centro', points: '+18 pts', code: 'FP-8329-1' },
            { name: 'FoodPass Signature', date: 'Ayer', sede: 'Sede Norte', points: '+14 pts', code: 'FP-8329-2' },
            { name: 'Kyoto Ramen Bowl', date: 'Mar 20', sede: 'Sede Centro', points: '+21 pts', code: 'FP-8329-3' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.recentItem}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedCanje(item);
                setShowCanjeModal(true);
              }}
            >
              <View style={styles.recentDot} />
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{item.name}</Text>
                <Text style={styles.recentMeta}>{item.date} · {item.sede}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MODALES DE INFORMACIÓN */}
      <InfoModal
        visible={showLunchesInfo}
        title="Canjes Restantes"
        message={`Dispones de 14 canjes de almuerzo para consumir durante este mes.\n\nRecuerda que tu ciclo mensual se reiniciará el 1 de junio, 2024.`}
        icon="restaurant"
        iconColor={Colors.primary}
        onClose={() => setShowLunchesInfo(false)}
      />

      <InfoModal
        visible={showPointsInfo}
        title="Mis Puntos Pass"
        message={`Tienes 1,240 Puntos Pass acumulados.\n\nEstos puntos los obtienes al consumir tus almuerzos corporativos diarios y los puedes usar en promociones de platos del chef.`}
        icon="star"
        iconColor={Colors.primaryContainer}
        onClose={() => setShowPointsInfo(false)}
      />

      <InfoModal
        visible={showQRInfo}
        title="¿Cómo canjear mi código?"
        message={`1. Elige tu plato favorito en la cafetería o restaurante asociado.\n2. Al momento de pagar, muestra este código QR en pantalla al cajero.\n3. El cajero lo escaneará y tu consumo quedará registrado automáticamente.`}
        icon="help-outline"
        iconColor={Colors.primary}
        onClose={() => setShowQRInfo(false)}
      />

      {/* MODAL DE DETALLE DE CANJE HISTÓRICO */}
      {selectedCanje && (
        <InfoModal
          visible={showCanjeModal}
          title="Detalle del Canje"
          message={`Consumo verificado con éxito:\n\nPlato: ${selectedCanje.name}\nFecha: ${selectedCanje.date}\nLugar: ${selectedCanje.sede}\nPuntos ganados: ${selectedCanje.points}\nID de Operación: ${selectedCanje.code}\n\nEstado de Transacción: COMPLETADO`}
          icon="check-circle"
          iconColor={Colors.tertiary}
          onClose={() => setShowCanjeModal(false)}
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
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statChip: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.xxl,
    padding: 16,
    alignItems: 'center',
  },
  statChipDark: {
    backgroundColor: Colors.inverseSurface,
  },
  statChipNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  statChipLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  // TARJETA QR
  qrCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxxl,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 6,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.xl,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
  },
  tabActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: Colors.onSurface,
    fontWeight: '700',
  },
  // QR VIEW
  qrSection: {
    alignItems: 'center',
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    marginBottom: 20,
  },
  qrCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: Colors.primaryContainer,
    borderWidth: 3,
  },
  qrCornerTL: { top: 12, left: 12, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  qrCornerTR: { top: 12, right: 12, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  qrCornerBL: { bottom: 12, left: 12, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  qrCornerBR: { bottom: 12, right: 12, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  qrCenterDot: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surfaceContainerLow,
  },
  qrLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 2,
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.tertiaryContainer + '30',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.tertiary,
  },
  // CÓDIGO MANUAL
  codeSection: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 20,
  },
  codeDisplay: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  codeChar: {
    width: 38,
    height: 48,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeCharText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
    letterSpacing: 0,
  },
  codeSubtitle: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
  // INFO DEL PLAN
  planInfo: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    padding: 20,
    marginBottom: 20,
  },
  planInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 4,
  },
  planInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planInfoText: { flex: 1 },
  planInfoLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 2,
  },
  planInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  planInfoDivider: {
    height: 16,
  },
  // HISTORIAL RÁPIDO
  recentSection: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: BorderRadius.xxl,
    padding: 20,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  recentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryContainer,
  },
  recentInfo: { flex: 1 },
  recentName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 2,
  },
  recentMeta: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
});
