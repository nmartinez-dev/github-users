import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        surface: '#ffffff',
        text: '#000000',
        textMuted: '#666666',
        border: '#e0e0e0',
        icon: '#666666',
      },
    },
  }),
}));

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    expect(getByPlaceholderText('Buscar usuarios...')).toBeTruthy();
  });

  it('should render with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />
    );

    expect(getByPlaceholderText('Custom placeholder')).toBeTruthy();
  });

  it('should update input value when typing', () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const input = getByPlaceholderText('Buscar usuarios...');
    fireEvent.changeText(input, 'test query');

    expect(input.props.value).toBe('test query');
  });

  it('should call onSearch with debounced value', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar onSearch={mockOnSearch} debounceMs={500} />
    );

    const input = getByPlaceholderText('Buscar usuarios...');

    expect(mockOnSearch).toHaveBeenCalledWith('');

    mockOnSearch.mockClear();

    fireEvent.changeText(input, 'test query');

    expect(mockOnSearch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });

  it('should clear input when clear button is pressed', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const input = getByPlaceholderText('Buscar usuarios...');
    fireEvent.changeText(input, 'test query');

    const clearButton = getByTestId('clear-button');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);

    expect(input.props.value).toBe('');
  });

  it('should not show clear button when input is empty', () => {
    const { queryByTestId } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const clearButton = queryByTestId('clear-button');
    expect(clearButton).toBeNull();
  });

  it('should show clear button when input has content', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar onSearch={mockOnSearch} />
    );

    const input = getByPlaceholderText('Buscar usuarios...');
    fireEvent.changeText(input, 'test');

    const clearButton = getByTestId('clear-button');
    expect(clearButton).toBeTruthy();
  });
});
