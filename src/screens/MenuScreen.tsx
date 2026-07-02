// src/screens/MenuScreen.tsx
//
// Pantalla del menú de comidas.
//
// Conceptos nuevos:
// - FlatList: Lista eficiente para renderizar muchos elementos
// - numColumns: Para hacer grids con FlatList
// - useState para filtros interactivos

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/shared/Header';
import { Colors, BorderRadius, Typography } from '../theme/colors';
import InfoModal from '../components/shared/InfoModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculamos el ancho de cada tarjeta para el grid de 2 columnas
const CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2; // padding*2 - gap

// Categorías del filtro
const categories = ['Todos', 'Entradas', 'Plato Fuerte', 'Postres'];

// Datos del menú enriquecidos
const menuItems = [
  {
    id: '1',
    name: 'Artisan Salad Bowl',
    description: 'Mezcla orgánica de hojas verdes con salmón ahumado.',
    price: '$18.25',
    badge: 'Fresh',
    badgeType: 'green',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Entradas',
    prepTime: '8-10 mins',
    characteristics: '320 kcal · Keto · Sin lactosa',
    howItsMade: 'Salmón ahumado premium colocado sobre una cama fresca de lechugas orgánicas, espinacas y arúgula, acompañado de aguacate hass, semillas de sésamo y aderezo cítrico artesanal.',
    ingredients: 'Salmón ahumado al roble, Lechuga orgánica variada, Espinaca baby, Arúgula silvestre, Aguacate fresco, Semillas de sésamo negro, Vinagreta cítrica de la casa.',
  },
  {
    id: '2',
    name: 'FoodPass Signature',
    description: 'Hamburguesa de res premium con queso artesanal.',
    price: '$14.50',
    badge: null,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'Plato Fuerte',
    prepTime: '12-15 mins',
    characteristics: '680 kcal · Proteína alta · Pan brioche',
    howItsMade: 'Carne de res premium (180g) asada a la parrilla con leña de encino, cubierta con queso gouda curado derretido, cebollas caramelizadas al oporto y lechuga, en pan brioche horneado hoy mismo.',
    ingredients: 'Carne de res angus selecta, Queso gouda curado, Cebolla caramelizada, Tomate de milpa, Lechuga hidropónica, Pan brioche artesanal, Salsa de la casa.',
  },
  {
    id: '3',
    name: 'Pasta del Huerto',
    description: 'Pasta hecha a mano con tomates cherry orgánicos.',
    price: '$16.00',
    badge: null,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    category: 'Plato Fuerte',
    prepTime: '15-18 mins',
    characteristics: '420 kcal · Vegetariano · Pasta fresca',
    howItsMade: 'Pasta fettuccine amasada a mano y cocida al dente, salteada en aceite de oliva extra virgen prensado en frío con tomates cherry dulces confitados, albahaca genovesa del huerto y lascas de queso parmesano reggiano.',
    ingredients: 'Harina de sémola de trigo, Huevos de campo, Tomates cherry confitados, Albahaca genovesa fresca, Aceite de oliva premium, Ajo laminado, Queso parmesano curado.',
  },
  {
    id: '4',
    name: 'Morning Delight',
    description: 'Tostada de masa madre con aguacate y huevo pochado.',
    price: '$12.75',
    badge: 'Top Rated',
    badgeType: 'orange',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    category: 'Entradas',
    prepTime: '10-12 mins',
    characteristics: '380 kcal · Desayuno elite · Fibra alta',
    howItsMade: 'Rebanada gruesa de pan de masa madre tostado, untada con puré rústico de aguacate sazonado con limón y cilantro, coronada con dos huevos pochados de granja y un toque de hojuelas de chile y brotes orgánicos.',
    ingredients: 'Pan de masa madre integral, Aguacate hass maduro, Huevos orgánicos de granja, Jugo de limón verde, Sal rosa del Himalaya, Hojuelas de chile seco, Brotes de cilantro.',
  },
  {
    id: '5',
    name: 'Kyoto Ramen Bowl',
    description: 'Caldo tonkotsu cocido por 12 horas.',
    price: '$21.50',
    badge: null,
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400',
    category: 'Plato Fuerte',
    prepTime: '20-22 mins',
    characteristics: '780 kcal · Rico en colágeno · Receta tradicional',
    howItsMade: 'Fideos de ramen frescos sumergidos en un sustancioso y cremoso caldo tonkotsu cocido a fuego lento durante 12 horas, acompañado de chashu de cerdo tierno asado, huevo ajitama marinado, cebollín picado, algas nori y brotes de bambú.',
    ingredients: 'Caldo tonkotsu artesanal, Fideos ramen tradicionales, Chashu de cerdo premium, Huevo ajitama marinado en soya, Alga nori tostada, Cebollín fresco, Bambú marinado.',
  },
  {
    id: '6',
    name: 'Tiramisú Artesanal',
    description: 'Postre italiano tradicional con café espresso.',
    price: '$9.50',
    badge: 'Nuevo',
    badgeType: 'green',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    category: 'Postres',
    prepTime: '5 mins',
    characteristics: '290 kcal · Dulce selecto · Café de origen',
    howItsMade: 'Capas alternadas de bizcochos savoiardi remojados en un aromático café espresso premium de origen y licor amaretto, cubiertas por una suave y cremosa mezcla de queso mascarpone batido, decorado con cacao puro espolvoreado.',
    ingredients: 'Queso mascarpone italiano, Café espresso gourmet, Bizcochos de vainilla, Cacao orgánico en polvo, Licor de amaretto selecto, Azúcar glass, Huevos frescos.',
  },
];

const featuredItem = {
  id: 'featured',
  name: 'Corte Artisan con Finas Hierbas',
  description: 'Corte premium de carne asada a la leña, sazonado con finas hierbas aromáticas.',
  price: '$45.50',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  category: 'Plato Fuerte',
  prepTime: '25-30 mins',
  characteristics: '720 kcal · Proteína premium · Sin gluten',
  howItsMade: 'Corte selecto asado lentamente sobre brasas de madera de encino, sellado con mantequilla noisette infusionada con ajo confitado, romero fresco y tomillo silvestre cosechados hoy.',
  ingredients: 'Bife de res de pastura (350g), Mantequilla de ajo confitado, Romero fresco de nuestro huerto, Tomillo silvestre, Pimienta negra gruesa, Sal marina gruesa.',
};

// Tipo para los items del menú
type MenuItem = typeof menuItems[0];

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Filtramos los items según la categoría seleccionada
  const filteredItems = activeCategory === 'Todos'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleSelectFood = (item: MenuItem) => {
    setSelectedFood(item);
    setShowDetailModal(true);
  };

  const handleConfirmOrder = () => {
    setShowDetailModal(false);
    // Esperamos un instante a que se cierre el primer modal para abrir el éxito
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 450);
  };

  // Componente para renderizar cada tarjeta del menú.
  const renderMenuCard = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleSelectFood(item)}
    >
      {/* Imagen del plato */}
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        {/* Badge si existe */}
        {item.badge && (
          <View style={[
            styles.badge,
            item.badgeType === 'green' ? styles.badgeGreen : styles.badgeOrange
          ]}>
            <Text style={[
              styles.badgeText,
              item.badgeType === 'green' ? styles.badgeTextGreen : styles.badgeTextOrange
            ]}>
              {item.badge.toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Contenido de la tarjeta */}
      <View style={styles.cardContent}>
        <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>

        {/* Precio y botón */}
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            activeOpacity={0.8}
            onPress={() => handleSelectFood(item)}
          >
            <Text style={styles.selectButtonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header title="Menú Digital" showSearch />

      {/* Banner del plato destacado */}
      <View style={styles.featuredBanner}>
        <View style={styles.featuredOverlay}>
          <View style={styles.chefBadge}>
            <Text style={styles.chefBadgeText}>RECOMENDACIÓN DEL CHEF</Text>
          </View>
          <Text style={styles.featuredTitle}>Corte Artisan{'\n'}con Finas Hierbas</Text>
          <View style={styles.featuredFooter}>
            <TouchableOpacity
              style={styles.featuredButton}
              activeOpacity={0.8}
              onPress={() => handleSelectFood(featuredItem)}
            >
              <MaterialIcons name="shopping-cart" size={16} color={Colors.onPrimaryContainer} />
              <Text style={styles.featuredButtonText}>Seleccionar</Text>
            </TouchableOpacity>
            <Text style={styles.featuredPrice}>$45.50</Text>
          </View>
        </View>
      </View>

      {/* Filtros de categoría */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
        style={styles.filtersScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              activeCategory === cat && styles.filterChipActive,
            ]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.filterChipText,
              activeCategory === cat && styles.filterChipTextActive,
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid de platos con FlatList */}
      <FlatList
        data={filteredItems}
        renderItem={renderMenuCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL DETALLADO DE COMIDA (BOTTOM SHEET) */}
      <Modal
        visible={showDetailModal && selectedFood !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDetailModal(false)}>
          <View style={styles.detailOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.detailSheet}>
                {selectedFood && (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Imagen de Cabecera con Botón de Cerrar */}
                    <View style={styles.detailImageContainer}>
                      <Image source={{ uri: selectedFood.image }} style={styles.detailImage} />
                      <TouchableOpacity
                        style={styles.closeDetailButton}
                        onPress={() => setShowDetailModal(false)}
                      >
                        <MaterialIcons name="close" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    {/* Cuerpo de la información */}
                    <View style={styles.detailContent}>
                      {/* Título y precio */}
                      <View style={styles.detailHeader}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.detailCategory}>{selectedFood.category.toUpperCase()}</Text>
                          <Text style={styles.detailName}>{selectedFood.name}</Text>
                        </View>
                        <Text style={styles.detailPrice}>{selectedFood.price}</Text>
                      </View>

                      {/* Descripción breve */}
                      <Text style={styles.detailDesc}>{selectedFood.description}</Text>

                      {/* Chips de características y demora */}
                      <View style={styles.detailChips}>
                        <View style={styles.detailChip}>
                          <MaterialIcons name="schedule" size={16} color={Colors.primary} />
                          <Text style={styles.detailChipText}>{selectedFood.prepTime}</Text>
                        </View>
                        <View style={[styles.detailChip, { backgroundColor: Colors.surfaceContainerLow }]}>
                          <MaterialIcons name="eco" size={16} color={Colors.tertiary} />
                          <Text style={[styles.detailChipText, { color: Colors.onSurface }]}>
                            {selectedFood.characteristics}
                          </Text>
                        </View>
                      </View>

                      {/* Cómo se hace */}
                      <Text style={styles.sectionTitleDetail}>Preparación Artesanal</Text>
                      <Text style={styles.sectionBodyDetail}>{selectedFood.howItsMade}</Text>

                      {/* Ingredientes */}
                      <Text style={styles.sectionTitleDetail}>Ingredientes Premium</Text>
                      <Text style={styles.sectionBodyDetail}>{selectedFood.ingredients}</Text>

                      {/* Botón de acción */}
                      <TouchableOpacity
                        style={styles.orderButton}
                        onPress={handleConfirmOrder}
                        activeOpacity={0.8}
                      >
                        <MaterialIcons name="check-circle" size={20} color={Colors.onPrimaryContainer} />
                        <Text style={styles.orderButtonText}>Confirmar y Seleccionar Pedido</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL DE ÉXITO */}
      {selectedFood && (
        <InfoModal
          visible={showSuccessModal}
          title="¡Pedido Confirmado!"
          message={`Tu orden de "${selectedFood.name}" ha sido enviada con éxito a la cocina.\n\nTiempo estimado de espera: ${selectedFood.prepTime}.\n\n¡Te notificaremos cuando esté listo para retirar!`}
          icon="restaurant"
          iconColor={Colors.tertiary}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // BANNER DESTACADO
  featuredBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    height: 160,
    borderRadius: BorderRadius.xxxl,
    backgroundColor: Colors.inverseSurface,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(39, 53, 23, 0.75)',
    padding: 20,
    justifyContent: 'space-between',
  },
  chefBadge: {
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  chefBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onTertiaryContainer,
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.xl,
  },
  featuredButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
  featuredPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  // FILTROS
  filtersScroll: {
    maxHeight: 50,
    marginBottom: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainer,
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
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: Colors.onSurface,
    fontWeight: '700',
  },
  // LISTA
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  // TARJETA DE PLATO
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardImageContainer: {
    height: 130,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  badgeGreen: {
    backgroundColor: Colors.tertiaryContainer,
  },
  badgeOrange: {
    backgroundColor: Colors.primaryContainer,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeTextGreen: {
    color: Colors.onTertiaryContainer,
  },
  badgeTextOrange: {
    color: Colors.onPrimaryContainer,
  },
  cardContent: {
    padding: 14,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardDescription: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    lineHeight: 15,
    marginBottom: 12,
  },
  cardFooter: {
    gap: 8,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryContainer,
    letterSpacing: -0.5,
  },
  selectButton: {
    backgroundColor: Colors.primaryContainer,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onPrimaryContainer,
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 31, 5, 0.4)',
    justifyContent: 'flex-end',
  },
  detailSheet: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: BorderRadius.xxxl,
    borderTopRightRadius: BorderRadius.xxxl,
    maxHeight: '85%',
    overflow: 'hidden',
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  detailImageContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  closeDetailButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(18, 31, 5, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    padding: 24,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  detailName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onBackground,
    letterSpacing: -0.5,
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primaryContainer,
  },
  detailDesc: {
    ...Typography.bodyLg,
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 20,
  },
  detailChips: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  detailChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primaryContainer + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  detailChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  sectionTitleDetail: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onBackground,
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionBodyDetail: {
    ...Typography.bodyMd,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 20,
  },
  orderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primaryContainer,
    paddingVertical: 16,
    borderRadius: BorderRadius.xl,
    marginTop: 12,
  },
  orderButtonText: {
    color: Colors.onPrimaryContainer,
    fontSize: 14,
    fontWeight: '700',
  },
});
