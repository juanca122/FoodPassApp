// src/navigation/AppNavigator.tsx
//
// Este archivo configura TODA la navegación de la app.
//
// ¿Qué es un Navigator?
// En React Native, un "Navigator" es el componente que controla qué pantalla
// se muestra y cómo se navega entre ellas. Hay varios tipos:
//
// - Stack Navigator: Las pantallas se apilan (como ir hacia adelante/atrás)
// - Bottom Tab Navigator: La barra de navegación abajo del teléfono ← usamos este
// - Drawer Navigator: Menú lateral (hamburguesa)
//
// En el diseño web original había una barra lateral (sidebar). En móvil,
// ese patrón se convierte en una barra de tabs en la parte inferior.
// Esto sigue las guías de UX de iOS y Android.

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Importamos todas las pantallas
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MenuScreen from '../screens/MenuScreen';
import HistorialScreen from '../screens/HistorialScreen';
import CanjeScreen from '../screens/CanjeScreen';
import PagosScreen from '../screens/PagosScreen';
import PerfilScreen from '../screens/PerfilScreen';

import { Colors } from '../theme/colors';

// Creamos los navegadores
// Tab → para las pantallas principales (con la barra inferior)
const Tab = createBottomTabNavigator();
// Stack → para el flujo de login (sin barra inferior)
const Stack = createNativeStackNavigator();

// Este componente configura la barra de tabs del fondo.
// Contiene todas las pantallas principales de la app.
function MainTabs() {
  return (
    <Tab.Navigator
      // screenOptions se aplica a TODOS los tabs
      screenOptions={({ route }) => ({
        // Ocultamos el header por defecto porque cada pantalla tiene el suyo
        headerShown: false,

        // Configuramos el ícono de cada tab según el nombre de la ruta
        tabBarIcon: ({ focused, color, size }) => {
          // Mapeamos el nombre de la ruta al ícono de MaterialIcons correspondiente
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Inicio: 'home',
            Menú: 'restaurant-menu',
            Historial: 'history',
            Canje: 'qr-code-scanner',
            Pagos: 'payments',
            Perfil: 'person',
          };
          const iconName = iconMap[route.name] || 'circle';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },

        // Colores de la barra de tabs
        tabBarActiveTintColor: Colors.primaryContainer,    // Color del tab activo (naranja)
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',  // Color tabs inactivos (blanco transparente)

        // Estilo de la barra de tabs
        tabBarStyle: {
          backgroundColor: Colors.inverseSurface,  // Fondo verde oscuro (igual al sidebar web)
          borderTopWidth: 0,                        // Sin línea separadora (regla "No-Line" del diseño)
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },

        // Estilo del texto de cada tab
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },

        // Indicador del tab activo (la "pastilla" naranja del diseño web)
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 2,
        },
      })}
    >
      {/* Definimos cada pantalla del tab. El "name" es lo que aparece debajo del ícono */}
      <Tab.Screen name="Inicio" component={DashboardScreen} />
      <Tab.Screen name="Menú" component={MenuScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Canje" component={CanjeScreen} />
      <Tab.Screen name="Pagos" component={PagosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// Componente raíz del navegador.
// Maneja el flujo de autenticación: Login → App Principal
export default function AppNavigator() {
  const { isLoggedIn, login } = useAuth();

  return (
    // NavigationContainer SIEMPRE envuelve todo el sistema de navegación.
    // Es el equivalente al router en una app web.
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Si el usuario está autenticado, mostramos las tabs principales
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          // Si no, mostramos el login y le pasamos la función para autenticarse
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={login} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
