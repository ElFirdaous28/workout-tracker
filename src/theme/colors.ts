export const colors = {
    primary: '#FF6914',
    background: '#0A0A0A',
    surface: '#151515',

    // Derived from primary
    primaryMuted: 'rgba(255, 105, 20, 0.15)', // badge backgrounds, subtle highlights
    primaryBorder: 'rgba(255, 105, 20, 0.3)',  // bordered elements

    // Text
    textPrimary: '#F5F5F5',
    textSecondary: '#888888',
    textDisabled: '#444444',

    // UI
    border: '#222222',
    error: '#FF4444',
    success: '#4CAF50',
} as const;

export type Colors = typeof colors;