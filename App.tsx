import { View, StyleSheet } from "react-native";
import { WorkoutProvider } from "@/context/WorkoutContext";
import AppNavigator from "@/navigation/AppNavigator";
import { colors } from "@/theme/colors";

export default function App() {
  
  return (
    <WorkoutProvider>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </WorkoutProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});