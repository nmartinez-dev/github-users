import { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoadingViewProps {
  message?: string;
}

export const LoadingView: FC<LoadingViewProps> = ({
  message = 'Cargando...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0366d6" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: FC<ErrorViewProps> = ({
  message,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="warning" size={48} color="#d73a49" />
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface EmptyViewProps {
  message: string;
}

export const EmptyView: FC<EmptyViewProps> = ({
  message,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={48} color="#586069" />
      <Text style={styles.emptyMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#d73a49',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0366d6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#586069',
    textAlign: 'center',
  },
});
