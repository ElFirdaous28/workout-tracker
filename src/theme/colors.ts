export const darkColors = {
    primary: '#FF6914',
    background: '#0A0A0A',
    surface: '#151515',

    // Derived from primary
    primaryMuted: 'rgba(255, 105, 20, 0.15)',
    primaryBorder: 'rgba(255, 105, 20, 0.3)',

    // Text
    textPrimary: '#F5F5F5',
    textSecondary: '#888888',
    textDisabled: '#444444',

    // UI
    border: '#222222',
    error: '#FF4444',
    success: '#4CAF50',
};

export const lightColors = {
    primary: '#FF6914',
    background: '#FFFFFF',
    surface: '#F5F5F5',

    // Derived from primary
    primaryMuted: 'rgba(255, 105, 20, 0.1)',
    primaryBorder: 'rgba(255, 105, 20, 0.3)',

    // Text
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textDisabled: '#AAAAAA',

    // UI
    border: '#E0E0E0',
    error: '#FF4444',
    success: '#4CAF50',
};

// Default export for backward compatibility
export const colors = darkColors;

export type Colors = {
    primary: string;
    background: string;
    surface: string;
    primaryMuted: string;
    primaryBorder: string;
    textPrimary: string;
    textSecondary: string;
    textDisabled: string;
    border: string;
    error: string;
    success: string;
};