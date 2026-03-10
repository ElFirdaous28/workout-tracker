import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import AppNavigator from "@/navigation/AppNavigator";

function AppContent() {
  const { theme, themeMode } = useTheme();

  return (
    <>
      <StatusBar 
        barStyle={themeMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.primary} 
      />
      <SafeAreaView 
        style={[styles.container, { backgroundColor: theme.background }]} 
        edges={["right", "bottom", "left"]}
      >
        <AppNavigator />
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WorkoutProvider>
          <AppContent />
        </WorkoutProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});