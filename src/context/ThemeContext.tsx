import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkColors, lightColors, Colors } from "@/theme/colors";

type ThemeMode = "dark" | "light";

type ThemeContextType = {
    theme: Colors;
    themeMode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@workout_tracker_theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

    // Load theme preference on mount
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === "light" || savedTheme === "dark") {
                    setThemeMode(savedTheme);
                }
            } catch (error) {
                console.error("Failed to load theme preference", error);
            }
        };
        loadTheme();
    }, []);

    // Save theme preference when it changes
    const toggleTheme = async () => {
        const newTheme: ThemeMode = themeMode === "dark" ? "light" : "dark";
        setThemeMode(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error("Failed to save theme preference", error);
        }
    };

    const theme = themeMode === "dark" ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for using ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
