# GitHub Users - Challenge Técnico Front Mobile

Una aplicación móvil desarrollada con React Native que permite explorar usuarios de GitHub, buscar usuarios específicos y gestionar una lista de favoritos.

## 🚀 Características

- **Listado de Usuarios**: Muestra una lista inicial de usuarios de GitHub
- **Búsqueda en Tiempo Real**: Busca usuarios por nombre
- **Sistema de Favoritos**: Marca/desmarca usuarios como favoritos con persistencia local
- **Detalles de Usuario**: Vista detallada con información completa del usuario
- **Navegación Intuitiva**: Navegación entre pantallas con React Navigation
- **Diseño Responsivo**: Interfaz adaptada para diferentes tamaños de pantalla
- **Gestión de Estado**: Context API para favoritos y React Query para datos
- **Manejo de Errores**: Estados de carga, error y vacío bien definidos
- **Sistema de Temas**: Soporte para tema claro y oscuro

## 🛠️ Tecnologías Utilizadas

- **React Native** con Expo
- **TypeScript** para tipado estático
- **React Navigation** para navegación
- **React Query (@tanstack/react-query)** para gestión de datos
- **Axios** para peticiones HTTP
- **AsyncStorage** para persistencia local
- **Jest** y **React Native Testing Library** para testing
- **@expo/vector-icons** para íconos profesionales

## 📱 Pantallas

### 1. Pantalla de Inicio (Home)
- Lista de usuarios de GitHub
- Buscador con debounce
- Indicador de favoritos en cada usuario
- Estados de carga y error

### 2. Pantalla de Detalles
- Información completa del usuario
- Estadísticas (repositorios, seguidores, siguiendo)
- Detalles adicionales (ubicación, empresa, blog)
- Botón para marcar/desmarcar favorito

### 3. Pantalla de Favoritos
- Lista de usuarios marcados como favoritos
- Ordenamiento alfabético (A-Z / Z-A)
- Persistencia de datos

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 22)
- npm
- Expo CLI (`npm install -g @expo/cli`)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd github-users
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npm start   
   ```

4. **Ejecutar tests**
   ```bash
   npm test   
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables organizados por funcionalidad
│   ├── user/            # Componentes relacionados con usuarios
│   │   ├── UserCard.tsx         # Tarjeta de usuario
│   │   ├── UserDetailHeader.tsx # Header de detalles de usuario
│   │   ├── UserDetails.tsx      # Detalles del usuario
│   │   ├── UserProfile.tsx      # Perfil del usuario (avatar, nombre, bio)
│   │   └── UserStats.tsx        # Estadísticas del usuario
│   ├── favorites/       # Componentes relacionados con favoritos
│   │   ├── FavoritesHeader.tsx  # Header de favoritos con ordenamiento
│   │   └── FavoritesList.tsx    # Lista de usuarios favoritos
│   ├── common/          # Componentes comunes/reutilizables
│   │   ├── SearchBar.tsx        # Barra de búsqueda
│   │   ├── ThemeToggle.tsx      # Toggle de tema
│   │   ├── LoadingView.tsx      # Vista de carga
│   │   ├── ErrorView.tsx        # Vista de error
│   │   └── EmptyView.tsx        # Vista vacía
│   └── navigation/      # Componentes de navegación
│       └── TabNavigator.tsx     # Navegación por pestañas
├── screens/             # Pantallas de la aplicación
│   ├── MainScreen.tsx           # Pantalla principal con pestañas
│   ├── HomeScreen.tsx           # Lista de usuarios
│   ├── UserDetailScreen.tsx     # Detalles del usuario
│   └── FavoritesScreen.tsx      # Lista de favoritos
├── services/            # Servicios y APIs
│   └── githubApi.ts             # Cliente de GitHub API
├── hooks/               # Hooks personalizados
│   ├── useGitHubUsers.ts        # Hooks para consultas de usuarios
│   ├── useFavoritesLogic.ts     # Lógica de favoritos
│   └── useUserDetailLogic.ts    # Lógica de detalles de usuario
├── contexts/            # Contextos de React
│   ├── FavoritesContext.tsx     # Contexto de favoritos
│   └── ThemeContext.tsx         # Contexto de tema
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts                 # Interfaces y tipos
├── utils/               # Utilidades
│   ├── dateUtils.ts             # Utilidades de fecha
│   ├── icons.ts                 # Configuración de íconos
│   └── __tests__/               # Tests unitarios
└── __tests__/           # Tests adicionales
```

## 🏗️ Arquitectura y Decisiones Técnicas

### 1. Organización de Componentes
**Decisión**: Agrupación de componentes por funcionalidad en subdirectorios
**Razón**: 
- Mejor organización y navegación del código
- Facilita encontrar componentes específicos
- Escalabilidad para proyectos grandes
- Separación clara de responsabilidades

#### Estructura de Componentes:
- **`user/`**: Componentes específicos para mostrar información de usuarios
- **`favorites/`**: Componentes para gestión de favoritos
- **`common/`**: Componentes reutilizables en toda la aplicación
- **`navigation/`**: Componentes relacionados con navegación

### 2. Separación de Lógica de Negocio
**Decisión**: Extracción de lógica compleja a hooks personalizados
**Razón**:
- Componentes más limpios y enfocados en UI
- Lógica reutilizable entre componentes
- Facilita testing de lógica de negocio
- Mejor separación de responsabilidades

#### Hooks Personalizados:
- **`useFavoritesLogic`**: Maneja filtrado, ordenamiento y navegación de favoritos
- **`useUserDetailLogic`**: Maneja navegación y estado de favoritos para detalles

### 3. Estructura de Directorios
**Decisión**: Separación clara de responsabilidades en directorios específicos
**Razón**: Facilita el mantenimiento, escalabilidad y navegación del código

### 2. Gestión de Estado

#### Context API para Favoritos
- **Decisión**: Usar Context API en lugar de Redux/Zustand
- **Razón**: 
  - Estado simple (array de strings)
  - No requiere middleware complejo
  - Integración nativa con React
  - Persistencia con AsyncStorage

#### Context API para Tema
- **Decisión**: Context API separado para gestión de tema
- **Razón**:
  - Estado simple (claro/oscuro)
  - Persistencia automática
  - Acceso global al tema
  - Fácil implementación

#### React Query para Datos del Servidor
- **Decisión**: Usar @tanstack/react-query
- **Razón**:
  - Cache automático
  - Estados de carga/error
  - Revalidación automática
  - Actualizaciones optimistas
  - Refetch en segundo plano

### 3. Navegación

#### React Navigation v7
- **Decisión**: Usar React Navigation Native Stack
- **Razón**:
  - Navegación nativa
  - Rendimiento optimizado
  - Soporte para TypeScript
  - Integración con Expo

### 4. Configuración de TypeScript

#### Tipos Estrictos
- **Decisión**: Configuración estricta de TypeScript
- **Razón**:
  - Detección temprana de errores
  - Mejor experiencia de desarrollo con autocompletado
  - Documentación del código
  - Refactoring seguro

## 🎨 Decisiones de UI/UX

### 1. Diseño de Componentes

#### UserCard
- **Decisión**: Componente reutilizable con props opcionales
- **Razón**:
  - Principio DRY
  - Consistencia visual
  - Fácil mantenimiento

#### SearchBar con Debounce
- **Decisión**: Debounce de 500ms
- **Razón**:
  - Evita peticiones excesivas
  - Mejor experiencia de usuario (no spam de peticiones)
  - Optimización de rendimiento

### 2. Estados de UI

#### Estados de Carga
- **Decisión**: Componentes específicos para cada estado
- **Razón**:
  - Feedback claro al usuario
  - Consistencia en toda la aplicación
  - Fácil reutilización

#### Manejo de Errores
- **Decisión**: Manejo centralizado de errores
- **Razón**:
  - Experiencia de usuario consistente
  - Opción de reintentar
  - Mensajes claros

### 3. Sistema de Íconos
- **Decisión**: Usar @expo/vector-icons en lugar de emojis
- **Razón**:
  - Consistencia visual profesional
  - Escalabilidad y mantenimiento
  - Mejor rendimiento (vectoriales)
  - Soporte para accesibilidad

### 4. Sistema de Temas
- **Decisión**: Implementar tema claro y oscuro
- **Razón**:
  - Mejor experiencia de usuario
  - Accesibilidad mejorada
  - Preferencias del usuario
  - Consistencia visual

## 🚀 Decisiones de Rendimiento

### 1. Optimización de FlatList
```typescript
initialNumToRender={10}
maxToRenderPerBatch={10}
windowSize={10}
```
- **Razón**: Renderizado eficiente para listas grandes

### 2. Configuración de React Query
```typescript
staleTime: 5 * 60 * 1000, // 5 minutos
gcTime: 10 * 60 * 1000,   // 10 minutos
```
- **Razón**: Balance entre datos frescos y rendimiento

### 3. Optimización de Imágenes
- **Decisión**: Usar resizeMode="cover"
- **Razón**: Consistencia visual en avatares

## 🔧 Configuración de Desarrollo

### TypeScript
El proyecto usa TypeScript con configuración estricta. Asegúrate de:
- Definir tipos para todas las props
- Usar interfaces para objetos complejos
- Evitar `any` cuando sea posible

### ESLint y Prettier
```bash
# Verificar linting
npx eslint src/ --ext .ts,.tsx

# Formatear código
npx prettier --write src/
```

### Variables de Entorno
La aplicación utiliza la API pública de GitHub, por lo que no requiere configuración adicional de variables de entorno.

### Endpoints de API Utilizados
- `GET /users` - Lista inicial de usuarios
- `GET /search/users?q={term}` - Búsqueda de usuarios
- `GET /users/{username}` - Detalles de usuario específico

## 🎨 Guías de Estilo

### Nomenclatura
- **Componentes**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useGitHubUsers.ts`)
- **Utilidades**: camelCase (`dateUtils.ts`)
- **Tipos**: PascalCase (`GitHubUser`)

### Estructura de Componentes
```typescript
import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComponentProps {
  // Props aquí
}

export const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Lógica aquí
  
  return (
    <View style={styles.container}>
      {/* JSX aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Estilos aquí
  },
});
```

### Estilos
- Usar `StyleSheet.create()` para todos los estilos
- Nombres descriptivos para las clases
- Colores consistentes (paleta de GitHub)
- Diseño responsivo con `Dimensions`

## 📊 Decisiones de Desarrollo

### Arquitectura
- **Separación de responsabilidades**: Componentes, servicios y hooks bien separados
- **Organización modular**: Componentes agrupados por funcionalidad en subdirectorios
- **Lógica de negocio separada**: Hooks personalizados para lógica compleja
- **Context API**: Para estado global de favoritos y tema
- **React Query**: Para gestión de estado del servidor y cache
- **TypeScript**: Para tipado estático y mejor experiencia de desarrollo

### Rendimiento
- **Debounce en búsqueda**: 500ms para evitar peticiones excesivas
- **FlatList optimizada**: Configuración de renderizado eficiente
- **Cache de React Query**: Configuración de staleTime y gcTime
- **Carga diferida**: Componentes cargados bajo demanda

### UX/UI
- **Estados de carga**: Indicadores visuales durante peticiones
- **Manejo de errores**: Mensajes claros y opción de reintentar
- **Diseño consistente**: Paleta de colores de GitHub
- **Navegación intuitiva**: Pestañas y navegación por stack
- **Íconos profesionales**: Sistema unificado de íconos vectoriales
- **Sistema de temas**: Soporte para modo claro y oscuro

### Persistencia
- **AsyncStorage**: Para favoritos y tema locales
- **React Query**: Para cache de datos de API
- **Sincronización**: Estado local sincronizado con almacenamiento

## 🔒 Consideraciones de Seguridad

### 1. Llamadas a API
- **Decisión**: Usar API pública de GitHub
- **Razón**:
  - No requiere autenticación
  - Límite de velocidad manejado por GitHub
  - Simplicidad para la demostración

### 2. Almacenamiento de Datos
- **Decisión**: AsyncStorage para favoritos y tema
- **Razón**:
  - Datos locales únicamente
  - No información sensible
  - Persistencia simple

## 🚀 Estrategia de Despliegue

### 1. Expo EAS Build
- **Decisión**: Usar EAS Build
- **Razón**:
  - Builds nativos en la nube
  - No requiere macOS para iOS
  - Integración con Expo

### 2. Configuración de Entorno
- **Decisión**: Sin variables de entorno
- **Razón**:
  - API pública
  - Configuración simple
  - Fácil configuración

### Expo
```bash
# Construir para producción
expo build:android
expo build:ios

# Publicar en Expo
expo publish
```

### EAS Build (Recomendado)
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Configurar build
eas build:configure

# Construir para Android/iOS
eas build --platform android
eas build --platform ios
```

## 🔄 Mejoras Implementadas

### 1. Refactorización de Componentes
- **Componentes divididos**: Pantallas grandes divididas en componentes más pequeños y reutilizables
- **Separación de lógica**: Hooks personalizados para manejar lógica de negocio compleja
- **Organización modular**: Componentes agrupados por funcionalidad en subdirectorios
- **Mejor mantenibilidad**: Código más limpio y fácil de mantener

### 2. Beneficios de la Refactorización
- **Reutilización**: Componentes pueden ser reutilizados en otras partes de la aplicación
- **Testabilidad**: Cada componente puede ser testeado de forma independiente
- **Legibilidad**: Código más fácil de entender y navegar
- **Escalabilidad**: Facilita agregar nuevas funcionalidades

### 4. Mejoras en Testing
- **Cobertura completa**: 33 tests en 6 suites de testing
- **Tests implementados**:
  - **Servicios**: `githubApi.test.ts` - Tests para endpoints de GitHub API
  - **Contextos**: `FavoritesContext.test.tsx` - Tests para gestión de favoritos
  - **Hooks**: `useGitHubUsers.test.ts` - Tests para hooks de React Query
  - **Componentes**: `SearchBar.test.tsx`, `UserCard.test.tsx` - Tests de componentes UI
  - **Utilidades**: `dateUtils.test.ts` - Tests para funciones utilitarias
- **Configuración de Jest optimizada**:
  - Soporte completo para TypeScript y React Native
  - Mocks para módulos problemáticos (AsyncStorage, React Navigation)
  - Configuración de transformIgnorePatterns para evitar errores de Flow
  - Setup personalizado en `jest.setup.js`
- **Beneficios**:
  - Detección temprana de bugs
  - Refactoring seguro
  - Documentación viva del código
  - Confianza en el despliegue

### 5. Configuración de Desarrollo Mejorada
- **Jest configurado correctamente** para React Native + TypeScript
- **Babel configurado** con presets necesarios para React Native y TypeScript
- **Mocks implementados** para módulos externos problemáticos
- **Dependencias actualizadas** para testing:
  - `@testing-library/react-native`
  - `@testing-library/jest-native`
  - `babel-jest`
  - `metro-react-native-babel-preset`

## 🎯 Estado Actual del Proyecto

### ✅ Funcionalidades Completadas
- ✅ Listado inicial de usuarios de GitHub
- ✅ Búsqueda en tiempo real con debounce
- ✅ Sistema de favoritos con persistencia local
- ✅ Vista detallada de usuarios
- ✅ Navegación entre pantallas
- ✅ Sistema de temas (claro/oscuro)
- ✅ Manejo de estados de carga y error
- ✅ **Bug fix de favoritos** - Usuarios de búsqueda ahora aparecen en favoritos
- ✅ **Testing completo** - 33 tests cubriendo servicios, hooks, componentes y utilidades
- ✅ **Configuración optimizada** - Jest y Babel configurados correctamente para React Native + TypeScript

### 📊 Métricas de Calidad
- **Cobertura de testing**: 33 tests en 6 suites
- **Tipos TypeScript**: 100% de componentes tipados
- **Linting**: Sin errores de ESLint
- **Performance**: Optimizaciones implementadas (debounce, cache, FlatList)

## 🔄 Consideraciones Futuras

### 1. Escalabilidad
- **Consideraciones**:
  - Migrar a Redux/Zustand si el estado crece
  - Implementar carga diferida para imágenes
  - Agregar scroll infinito
  - Implementar virtualización para listas muy grandes

### 2. Funcionalidades
- **Consideraciones**:
  - Autenticación con GitHub OAuth
  - Notificaciones push para nuevos repositorios
  - Soporte offline con sincronización
  - Compartir usuarios en redes sociales
  - Filtros avanzados en favoritos

### 3. Testing Avanzado
- **Consideraciones**:
  - Tests de integración para flujos completos
  - Tests de navegación entre pantallas
  - Tests de accesibilidad
  - Tests de rendimiento
  - Tests E2E con Detox

### 4. Rendimiento
- **Consideraciones**:
  - Implementar virtualización para listas grandes
  - Carga diferida de componentes
  - División de código (code splitting)
  - Optimización de bundle
  - Lazy loading de imágenes

### 5. UX/UI Mejorada
- **Consideraciones**:
  - Animaciones fluidas entre pantallas
  - Gestos de navegación (swipe)
  - Modo de accesibilidad mejorado
  - Soporte para diferentes tamaños de pantalla
  - Temas personalizables

## 📚 Recursos

### Documentación
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/latest)

### Herramientas
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [Reactotron](https://github.com/infinitered/reactotron)

### Comunidad
- [React Native Community](https://github.com/react-native-community)
- [Expo Discord](https://discord.gg/expo)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
