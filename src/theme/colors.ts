// src/theme/colors.ts
//
// Este archivo define TODOS los colores del sistema de diseño "The Artisanal Ledger".
// Están copiados exactamente del diseño web para mantener consistencia.
//
// ¿Por qué centralizar colores aquí?
// Si mañana quieres cambiar el naranja principal, solo lo cambias en UN lugar
// y se actualiza en toda la app automáticamente.

export const Colors = {
  // === COLORES PRIMARIOS (Naranja artesanal) ===
  primary: '#9b4500',              // Naranja oscuro - textos de énfasis
  primaryContainer: '#f97f2d',     // Naranja brillante - botones CTA principales
  onPrimary: '#ffffff',            // Texto SOBRE el color primary
  onPrimaryContainer: '#5f2700',   // Texto SOBRE primaryContainer

  // === COLORES SECUNDARIOS ===
  secondary: '#a04100',
  secondaryContainer: '#fd8544',
  onSecondaryContainer: '#682800',

  // === COLORES TERCIARIOS (Verde orgánico - éxito/positivo) ===
  tertiary: '#006e16',             // Verde oscuro
  tertiaryContainer: '#4cb64b',    // Verde brillante - badges de éxito
  onTertiaryContainer: '#004209',  // Texto sobre tertiaryContainer

  // === SUPERFICIES (Capas del fondo) ===
  // Regla del diseño: la profundidad se crea con cambios de color, NO con bordes
  surface: '#f0ffd8',              // Capa base - el canvas de la app
  surfaceBright: '#f0ffd8',
  surfaceDim: '#cee0b5',
  surfaceContainerLowest: '#ffffff', // Tarjetas de mayor jerarquía (blanco puro)
  surfaceContainerLow: '#e8facd',    // Secciones de contenido
  surfaceContainer: '#e2f4c8',       // Campos de input, elementos recesados
  surfaceContainerHigh: '#dcefc3',   // Separadores sutiles
  surfaceContainerHighest: '#d7e9bd',// Elementos de fondo secundarios

  // === SUPERFICIE INVERSA (Sidebar oscuro) ===
  inverseSurface: '#273517',         // Fondo del menú lateral / navegación inferior
  inverseOnSurface: '#e5f7cb',       // Texto sobre la superficie inversa
  inversePrimary: '#ffb68e',

  // === TEXTO ===
  onBackground: '#121f05',          // Texto principal (casi negro, tono verde oscuro)
  onSurface: '#121f05',             // Texto sobre superficies claras
  onSurfaceVariant: '#574237',      // Texto secundario / subtítulos

  // === FONDO GENERAL ===
  background: '#f0ffd8',

  // === BORDES Y LÍNEAS ===
  // El diseño prohíbe bordes sólidos normales. Estos se usan solo cuando es necesario.
  outline: '#8b7265',
  outlineVariant: '#dec1b2',        // Borde muy sutil (ghost border)

  // === ERROR ===
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // === FIJOS ===
  primaryFixed: '#ffdbc9',
  primaryFixedDim: '#ffb68e',
};

// === SOMBRAS ===
// El diseño usa sombras muy difusas y suaves, no las típicas sombras de Material Design
export const Shadows = {
  // Sombra principal para tarjetas flotantes
  card: {
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 8,           // Android necesita "elevation" en lugar de shadowXxx
  },
  // Sombra más intensa para modales
  modal: {
    shadowColor: '#121f05',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 15,
  },
};

// === TIPOGRAFÍA ===
// En React Native no podemos usar Google Fonts directamente sin expo-font.
// Si quieres usar Plus Jakarta Sans e Inter, consulta la guía para instalar expo-font.
// Por ahora usamos las fuentes del sistema que se ven muy bien.
export const Typography = {
  // Display - números grandes, héroe
  displayLg: { fontSize: 56, fontWeight: '800' as const, letterSpacing: -1.5 },
  displayMd: { fontSize: 45, fontWeight: '800' as const, letterSpacing: -1 },

  // Headlines - títulos de sección
  headlineLg: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  headlineMd: { fontSize: 28, fontWeight: '700' as const },
  headlineSm: { fontSize: 24, fontWeight: '700' as const },

  // Títulos
  titleLg: { fontSize: 22, fontWeight: '700' as const },
  titleMd: { fontSize: 16, fontWeight: '600' as const, letterSpacing: 0.15 },
  titleSm: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 0.1 },

  // Cuerpo
  bodyLg: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyMd: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodySm: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },

  // Labels - texto de UI pequeño
  labelLg: { fontSize: 14, fontWeight: '500' as const, letterSpacing: 0.1 },
  labelMd: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5 },
  labelSm: { fontSize: 10, fontWeight: '700' as const, letterSpacing: 1.5 },
};

// === BORDER RADIUS ===
// El diseño exige esquinas redondeadas - nada menor a 8px
export const BorderRadius = {
  sm: 8,      // Mínimo permitido
  md: 12,     // Inputs, chips pequeños
  lg: 16,     // Tarjetas pequeñas
  xl: 20,     // Botones principales
  xxl: 24,    // Tarjetas medianas
  xxxl: 32,   // Tarjetas grandes (el "rounded-[2rem]" del diseño web)
  full: 9999, // Completamente circular (pills, avatares)
};
