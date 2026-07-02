// src/screens/HistorialScreen.tsx
//
// Pantalla de historial de pedidos.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius } from '../theme/colors';

const filters = ['Todos', 'Últimos 30 días', 'Este mes', 'Pasados'];

const transactions = [
  {
    id: '1',
    name: 'Artisan Salad Bowl',
    restaurant: 'FoodPass — Sede Centro',
    date: 'Hoy, 12:34 PM',
    amount: '-$18.25',
    status: 'ok',
    points: '+18 pts',
  },
  {
    id: '2',
    name: 'FoodPass Signature Burger',
    restaurant: 'FoodPass — Sede Norte',
    date: 'Ayer, 1:05 PM',
    amount: '-$14.50',
    status: 'ok',
    points: '+14 pts',
  },
  {
    id: '3',
    name: 'Kyoto Ramen Bowl',
    restaurant: 'FoodPass — Sede Centro',
    date: 'Mar 20, 12:45 PM',
    amount: '-$21.50',
    status: 'ok',
    points: '+21 pts',
  },
  {
    id: '4',
    name: 'Morning Delight Toast',
    restaurant: 'FoodPass — Cafetería',
    date: 'Lun 18, 8:15 AM',
    amount: '-$12.75',
    status: 'ok',
    points: '+12 pts',
  },
  {
    id: '5',
    name: 'Pizza Margherita Luxe',
    restaurant: 'FoodPass — Sede Sur',
    date: 'Vie 16, 1:20 PM',
    amount: '-$19.00',
    status: 'pending',
    points: '+19 pts',
  },
  {
    id: '6',
    name: 'Pasta del Huerto',
    restaurant: 'FoodPass — Sede Centro',
    date: 'Jue 15, 12:55 PM',
    amount: '-$16.00',
    status: 'ok',
    points: '+16 pts',
  },
];

type Transaction = typeof transactions[0];

export default function HistorialScreen() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionCard} activeOpacity={0.8}>
      {/* Ícono */}
      <View style={styles.transactionIconWrap}>
        <MaterialIcons name="restaurant" size={22} color={Colors.primary} />
      </View>

      {/* Info principal */}
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.transactionRestaurant} numberOfLines={1}>{item.restaurant}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      {/* Monto y estado */}
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'ok' ? styles.statusBadgeOk : styles.statusBadgePending
        ]}>
          <Text style={[
            styles.statusBadgeText,
            item.status === 'ok' ? styles.statusTextOk : styles.statusTextPending
          ]}>
            {item.status === 'ok' ? 'OK' : 'PEND'}
          </Text>
        </View>
        <Text style={styles.transactionPoints}>{item.points}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Historial" showSearch />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* === STATS HERO (Bento asimétrico) === */}
        <View style={styles.statsContainer}>
          {/* Tarjeta grande */}
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatTitle}>Tu Trayectoria Gastronómica</Text>
            <Text style={styles.heroStatSubtitle}>
              Has disfrutado de 42 experiencias culinarias este año.
            </Text>
            <View style={styles.heroStats}>
              <View>
                <Text style={styles.heroStatLabel}>TOTAL PEDIDOS</Text>
                <Text style={[styles.heroStatNumber, { color: Colors.primary }]}>128</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View>
                <Text style={styles.heroStatLabel}>AHORRO FOODPASS</Text>
                <Text style={[styles.heroStatNumber, { color: Colors.tertiary }]}>$1,450</Text>
              </View>
            </View>
          </View>

          {/* Tarjeta elite */}
          <View style={styles.eliteCard}>
            <View style={styles.eliteIcon}>
              <MaterialIcons name="workspace-premium" size={32} color={Colors.onPrimaryContainer} />
            </View>
            <Text style={styles.eliteTitle}>Miembro Elite</Text>
            <Text style={styles.eliteSubtitle}>
              Estás a 3 pedidos de tu próxima recompensa.
            </Text>
            <TouchableOpacity style={styles.eliteButton}>
              <Text style={styles.eliteButtonText}>Ver Beneficios</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* === FILTROS === */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          style={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === filter && styles.filterChipTextActive,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* === LISTA DE TRANSACCIONES === */}
        <View style={styles.listSection}>
          <Text style={styles.listTitle}>Historial Detallado</Text>
          {transactions.map((item) => (
            <View key={item.id}>
              {renderTransaction({ item })}
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  // STATS
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  heroStatCard: {
    flex: 1.6,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    padding: 20,
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  heroStatTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 6,
    lineHeight: 20,
  },
  heroStatSubtitle: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 15,
    marginBottom: 16,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  heroStatLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: Colors.outline,
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroStatNumber: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  heroStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.3,
  },
  eliteCard: {
    flex: 1,
    backgroundColor: Colors.inverseSurface,
    borderRadius: BorderRadius.xxl,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eliteIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  eliteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  eliteSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 10,
  },
  eliteButton: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  eliteButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  // FILTROS
  filtersScroll: {
    maxHeight: 48,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surfaceContainerLow,
  },
  filterChipActive: {
    backgroundColor: Colors.surfaceContainerLowest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  // LISTA
  listSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    // Separación vertical en lugar de bordes (regla del diseño)
  },
  transactionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  transactionRestaurant: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  statusBadgeOk: {
    backgroundColor: Colors.tertiaryContainer,
  },
  statusBadgePending: {
    backgroundColor: Colors.primaryContainer,
  },
  statusBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statusTextOk: {
    color: Colors.onTertiaryContainer,
  },
  statusTextPending: {
    color: Colors.onPrimaryContainer,
  },
  transactionPoints: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.tertiary,
  },
});
