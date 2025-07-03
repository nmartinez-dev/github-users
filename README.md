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
├── components/          # Componentes reutilizables
│   ├── UserCard.tsx     # Tarjeta de usuario
│   ├── SearchBar.tsx    # Barra de búsqueda
│   ├── TabNavigator.tsx # Navegación por tabs
│   └── LoadingAndError.tsx # Estados de carga y error
├── screens/             # Pantallas de la aplicación
│   ├── MainScreen.tsx   # Pantalla principal con tabs
│   ├── HomeScreen.tsx   # Lista de usuarios
│   ├── UserDetailScreen.tsx # Detalles del usuario
│   └── FavoritesScreen.tsx # Lista de favoritos
├── services/            # Servicios y APIs
│   └── githubApi.ts     # Cliente de GitHub API
├── hooks/               # Hooks personalizados
│   └── useGitHubUsers.ts # Hooks para consultas de usuarios
├── contexts/            # Contextos de React
│   └── FavoritesContext.tsx # Contexto de favoritos
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts         # Interfaces y tipos
├── utils/               # Utilidades
│   ├── dateUtils.ts     # Utilidades de fecha
│   ├── icons.ts         # Configuración de íconos
│   └── __tests__/       # Tests unitarios
└── __tests__/           # Tests adicionales
```

## 🏗️ Arquitectura y Decisiones Técnicas

### 1. Estructura de Directorios
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

#### React Query para Datos del Servidor
- **Decisión**: Usar @tanstack/react-query
- **Razón**:
  - Cache automático
  - Estados de loading/error
  - Revalidación automática
  - Optimistic updates
  - Background refetching

### 3. Navegación

#### React Navigation v7
- **Decisión**: Usar React Navigation Native Stack
- **Razón**:
  - Navegación nativa
  - Performance optimizada
  - Soporte para TypeScript
  - Integración con Expo

### 4. Configuración de TypeScript

#### Tipos Estrictos
- **Decisión**: Configuración estricta de TypeScript
- **Razón**:
  - Detección temprana de errores
  - Mejor DX con autocompletado
  - Documentación del código
  - Refactoring seguro

## 🎨 UI/UX Decisions

### 1. Diseño de Componentes

#### UserCard
- **Decisión**: Componente reutilizable con props opcionales
- **Razón**:
  - DRY principle
  - Consistencia visual
  - Fácil mantenimiento

#### SearchBar con Debounce
- **Decisión**: Debounce de 500ms
- **Razón**:
  - Evita requests excesivos
  - Mejor UX (no spam de requests)
  - Optimización de performance

### 2. Estados de UI

#### Loading States
- **Decisión**: Componentes específicos para cada estado
- **Razón**:
  - Feedback claro al usuario
  - Consistencia en toda la app
  - Fácil reutilización

#### Error Handling
- **Decisión**: Manejo centralizado de errores
- **Razón**:
  - UX consistente
  - Opción de reintentar
  - Mensajes claros

### 3. Sistema de Íconos
- **Decisión**: Usar @expo/vector-icons en lugar de emojis
- **Razón**:
  - Consistencia visual profesional
  - Escalabilidad y mantenimiento
  - Mejor performance (vectoriales)
  - Soporte para accesibilidad

## 🚀 Performance Decisions

### 1. FlatList Optimization
```typescript
initialNumToRender={10}
maxToRenderPerBatch={10}
windowSize={10}
```
- **Razón**: Renderizado eficiente para listas grandes

### 2. React Query Configuration
```typescript
staleTime: 5 * 60 * 1000, // 5 minutos
gcTime: 10 * 60 * 1000,   // 10 minutos
```
- **Razón**: Balance entre datos frescos y performance

### 3. Image Optimization
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

### API Endpoints Utilizados
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
- Responsive design con `Dimensions`

## 📊 Decisiones de Desarrollo

### Arquitectura
- **Separación de responsabilidades**: Componentes, servicios y hooks bien separados
- **Context API**: Para estado global de favoritos
- **React Query**: Para gestión de estado del servidor y cache
- **TypeScript**: Para tipado estático y mejor DX

### Performance
- **Debounce en búsqueda**: 500ms para evitar requests excesivos
- **FlatList optimizada**: Configuración de renderizado eficiente
- **Cache de React Query**: Configuración de staleTime y gcTime
- **Lazy loading**: Componentes cargados bajo demanda

### UX/UI
- **Estados de carga**: Indicadores visuales durante requests
- **Manejo de errores**: Mensajes claros y opción de reintentar
- **Diseño consistente**: Paleta de colores de GitHub
- **Navegación intuitiva**: Tabs y navegación por stack
- **Íconos profesionales**: Sistema unificado de íconos vectoriales

### Persistencia
- **AsyncStorage**: Para favoritos locales
- **React Query**: Para cache de datos de API
- **Sincronización**: Estado local sincronizado con storage

## 🔒 Security Considerations

### 1. API Calls
- **Decisión**: Usar API pública de GitHub
- **Razón**:
  - No requiere autenticación
  - Rate limiting manejado por GitHub
  - Simplicidad para el demo

### 2. Data Storage
- **Decisión**: AsyncStorage para favoritos
- **Razón**:
  - Datos locales únicamente
  - No información sensible
  - Persistencia simple

## 🚀 Deployment Strategy

### 1. Expo EAS Build
- **Decisión**: Usar EAS Build
- **Razón**:
  - Builds nativos en la nube
  - No requiere macOS para iOS
  - Integración con Expo

### 2. Environment Configuration
- **Decisión**: Sin variables de entorno
- **Razón**:
  - API pública
  - Configuración simple
  - Fácil setup

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

## 🔄 Future Considerations

### 1. Scalability
- **Consideraciones**:
  - Migrar a Redux/Zustand si el estado crece
  - Implementar lazy loading para imágenes
  - Agregar infinite scroll

### 2. Features
- **Consideraciones**:
  - Autenticación con GitHub
  - Notificaciones push
  - Offline support
  - Dark mode

### 3. Performance
- **Consideraciones**:
  - Implementar virtualización para listas grandes
  - Lazy loading de componentes
  - Code splitting
  - Bundle optimization

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
