// src/screens/DashboardScreen.tsx
//
// Pantalla principal del dashboard.
//
// Conceptos nuevos:
// - ScrollView: Contenido desplazable
// - FlatList: Lista optimizada para muchos elementos
// - Dimensiones: Obtenemos el ancho de la pantalla para layouts responsive

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius, Typography } from '../theme/colors';
import InfoModal from '../components/shared/InfoModal';

// Obtenemos el ancho de la pantalla del dispositivo.
// Esto nos permite hacer layouts que se adapten a diferentes tamaños.
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Datos de ejemplo para las últimas transacciones
const recentTransactions = [
  { id: '1', name: 'Artisan Salad Bowl', date: 'Hoy, 12:34', amount: '-$18.25', type: 'lunch', status: 'ok' },
  { id: '2', name: 'FoodPass Signature', date: 'Ayer, 13:05', amount: '-$14.50', type: 'lunch', status: 'ok' },
  { id: '3', name: 'Kyoto Ramen Bowl', date: 'Mar, 12:45', amount: '-$21.50', type: 'lunch', status: 'ok' },
  { id: '4', name: 'Morning Delight', date: 'Lun, 08:15', amount: '-$12.75', type: 'breakfast', status: 'ok' },
];

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  // Estados para modales explicativos de estadísticas
  const [showLunchesInfo, setShowLunchesInfo] = useState(false);
  const [showOrdersInfo, setShowOrdersInfo] = useState(false);
  const [showPointsInfo, setShowPointsInfo] = useState(false);

  // Estados para recibo detallado de transacción
  const [selectedTx, setSelectedTx] = useState<typeof recentTransactions[0] | null>(null);
  const [showTxModal, setShowTxModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Panel Principal" showSearch />

      {/* ScrollView permite que el contenido sea desplazable verticalmente */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* === SECCIÓN DE BIENVENIDA === */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>¡Hola, Juan!</Text>
          <Text style={styles.welcomeSubtitle}>Bienvenido a tu panel artesanal de hoy.</Text>
        </View>

        {/* === BENTO GRID — TARJETAS DE RESUMEN === */}
        {/* TARJETA PRINCIPAL — Almuerzos disponibles */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.9}
          onPress={() => setShowLunchesInfo(true)}
        >
          {/* Badge de plan */}
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>PLAN PREMIUM</Text>
          </View>
          <Text style={styles.heroCardTitle}>Almuerzos disponibles</Text>
          <Text style={styles.heroCardSubtitle}>Consumos restantes de tu ciclo mensual (Toca para detalles)</Text>

          {/* Número grande */}
          <View style={styles.heroNumbers}>
            <Text style={styles.heroNumber}>14</Text>
            <Text style={styles.heroNumberDen}>/ 22 días</Text>
          </View>

          {/* Ícono decorativo */}
          <MaterialIcons
            name="restaurant"
            size={80}
            color={Colors.primaryContainer}
            style={styles.heroIcon}
          />
        </TouchableOpacity>

        {/* TARJETAS SECUNDARIAS en fila */}
        <View style={styles.statsRow}>

          {/* Stat 1: Pedidos realizados */}
          <TouchableOpacity
            style={[styles.statCard, styles.statCardGreen]}
            activeOpacity={0.8}
            onPress={() => setShowOrdersInfo(true)}
          >
            <View style={styles.statCardTop}>
              <View style={styles.statIconBox}>
                <MaterialIcons name="shopping-bag" size={22} color={Colors.primary} />
              </View>
              <Text style={styles.statBadge}>+2 esta semana</Text>
            </View>
            <Text style={styles.statLabel}>PEDIDOS REALIZADOS</Text>
            <Text style={styles.statNumber}>48</Text>
          </TouchableOpacity>

          {/* Stat 2: Puntos acumulados */}
          <TouchableOpacity
            style={[styles.statCard, styles.statCardDark]}
            activeOpacity={0.8}
            onPress={() => setShowPointsInfo(true)}
          >
            <View style={styles.statCardTop}>
              <View style={[styles.statIconBox, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                <MaterialIcons name="star" size={22} color={Colors.primaryContainer} />
              </View>
            </View>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.6)' }]}>PUNTOS PASS</Text>
            <Text style={[styles.statNumber, { color: Colors.primaryContainer }]}>1,240</Text>
          </TouchableOpacity>

        </View>

        {/* === TRANSACCIONES RECIENTES === */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimos Canjes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Historial')}>
              <Text style={styles.sectionLink}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          {/* Renderizamos cada transacción como botón */}
          {recentTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionItem}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedTx(transaction);
                setShowTxModal(true);
              }}
            >
              {/* Ícono */}
              <View style={styles.transactionIcon}>
                <MaterialIcons name="restaurant" size={20} color={Colors.primary} />
              </View>

              {/* Info */}
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{transaction.date} · Ver recibo</Text>
              </View>

              {/* Monto y estado */}
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                <View style={styles.freshnessBadge}>
                  <Text style={styles.freshnessBadgeText}>OK</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* === BANNER DE PUNTOS === */}
        <TouchableOpacity
          style={styles.pointsBanner}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Canje')}
        >
          <View style={styles.pointsBannerContent}>
            <MaterialIcons name="workspace-premium" size={32} color={Colors.primaryContainer} />
            <View style={styles.pointsBannerText}>
              <Text style={styles.pointsBannerTitle}>¡Tienes 1,240 puntos!</Text>
              <Text style={styles.pointsBannerSubtitle}>Canjéalos por platillos exclusivos en tu sección de Canjes</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

      </ScrollView>

      {/* MODALES INFORMATIVOS */}
      <InfoModal
        visible={showLunchesInfo}
        title="Almuerzos Disponibles"
        message={`Tu suscripción corporativa te otorga 22 almuerzos por mes coincidiendo con tus días laborables.\n\nHasta hoy has canjeado 8 almuerzos, por lo que te quedan 14 disponibles para usar antes de que finalice tu ciclo de facturación.`}
        icon="restaurant"
        iconColor={Colors.primary}
        onClose={() => setShowLunchesInfo(false)}
      />

      <InfoModal
        visible={showOrdersInfo}
        title="Pedidos Realizados"
        message={`Has realizado 48 pedidos desde que te uniste a FoodPass.\n\nEsta semana has disfrutado de 2 deliciosas comidas. ¡Esperamos que sigas disfrutando tu menú saludable diario!`}
        icon="shopping-bag"
        iconColor={Colors.primary}
        onClose={() => setShowOrdersInfo(false)}
      />

      <InfoModal
        visible={showPointsInfo}
        title="Programa Puntos Pass"
        message={`Acumulas 1 punto por cada dólar de almuerzo consumido.\n\nActualmente posees 1,240 Puntos Pass acumulados que puedes utilizar para canjear platos premium especiales en el menú de Canjes.`}
        icon="star"
        iconColor={Colors.primaryContainer}
        onClose={() => setShowPointsInfo(false)}
      />

      {/* MODAL DE RECIBO DIGITAL */}
      <Modal
        visible={showTxModal && selectedTx !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTxModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowTxModal(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.receiptCard}>
                {/* Cabecera del recibo */}
                <View style={styles.receiptHeader}>
                  <View style={styles.receiptSuccessIcon}>
                    <MaterialIcons name="check" size={24} color={Colors.tertiary} />
                  </View>
                  <Text style={styles.receiptTitle}>Transacción Exitosa</Text>
                  <Text style={styles.receiptDate}>{selectedTx?.date}</Text>
                </View>

                {/* Separador dentado clásico de ticket */}
                <View style={styles.ticketDivider} />

                {/* Detalles */}
                <View style={styles.receiptBody}>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Plato:</Text>
                    <Text style={styles.receiptValue}>{selectedTx?.name}</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Establecimiento:</Text>
                    <Text style={styles.receiptValue}>Sede principal FoodPass</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Método de Pago:</Text>
                    <Text style={styles.receiptValue}>Cupo Corporativo</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>ID de Orden:</Text>
                    <Text style={styles.receiptValue}>#FP-8329-{selectedTx?.id}</Text>
                  </View>

                  <View style={styles.receiptTotalRow}>
                    <Text style={styles.receiptTotalLabel}>Valor de Canje</Text>
                    <Text style={styles.receiptTotalValue}>{selectedTx?.amount}</Text>
                  </View>
                  <Text style={styles.taxNote}>* Cubierto por la suscripción mensual de tu empresa.</Text>
                </View>

                {/* Botón de cerrar */}
                <TouchableOpacity
                  style={styles.closeReceiptButton}
                  onPress={() => setShowTxModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.closeReceiptButtonText}>Cerrar Recibo</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  welcomeSection: {
    marginTop: 24,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  // TARJETA HÉROE
  heroCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxxl,
    padding: 24,
    marginBottom: 12,
    overflow: 'hidden', // Para que el ícono decorativo no salga de la tarjeta
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
  },
  planBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1.5,
  },
  heroCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: 4,
  },
  heroCardSubtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginBottom: 20,
  },
  heroNumbers: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  heroNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.primaryContainer,
    letterSpacing: -2,
    lineHeight: 72,
  },
  heroNumberDen: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    paddingBottom: 10,
  },
  heroIcon: {
    position: 'absolute',
    right: -10,
    top: 20,
    opacity: 0.12,
  },
  // FILA DE STATS
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.xxl,
    padding: 18,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  statCardGreen: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  statCardDark: {
    backgroundColor: Colors.inverseSurface,
  },
  statCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statIconBox: {
    width: 44,
    height: 44,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBadge: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.tertiary,
    letterSpacing: 0.5,
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: 70,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  // SECCIÓN TRANSACCIONES
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    // En vez de bordes, usamos espacio vertical (regla "No-Divider" del diseño)
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  // Freshness Badge — componente signature del sistema de diseño
  freshnessBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  freshnessBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1,
  },
  // BANNER DE PUNTOS
  pointsBanner: {
    backgroundColor: Colors.inverseSurface,
    borderRadius: BorderRadius.xxl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointsBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  pointsBannerText: {
    flex: 1,
  },
  pointsBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  pointsBannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  receiptCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: BorderRadius.xxl,
    padding: 24,
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptSuccessIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.tertiaryContainer + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  receiptTitle: {
    ...Typography.titleLg,
    color: Colors.onBackground,
    marginBottom: 4,
  },
  receiptDate: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  ticketDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  receiptBody: {
    gap: 12,
    marginBottom: 24,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  receiptValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  receiptTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerLow,
  },
  receiptTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onBackground,
  },
  receiptTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryContainer,
  },
  taxNote: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  closeReceiptButton: {
    backgroundColor: Colors.inverseSurface,
    paddingVertical: 12,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },
  closeReceiptButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 31, 5, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

// Necesitamos exportar este tipo para el sistema de tipos de TypeScript
const { onTertiaryContainer } = Colors;
