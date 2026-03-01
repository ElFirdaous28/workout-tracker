import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutProvider } from "@/context/WorkoutContext";
import AppNavigator from "@/navigation/AppNavigator";
import { colors } from "@/theme/colors";

export default function App() {
  return (
    <WorkoutProvider>
      <StatusBar />
      <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
        <AppNavigator />
      </SafeAreaView>
    </WorkoutProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});