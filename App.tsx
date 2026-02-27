import { WorkoutProvider } from "@/context/WorkoutContext";
import AppNavigator from "@/navigation/AppNavigator";

export default function App() {
  return (
    <WorkoutProvider>
      <AppNavigator />
    </WorkoutProvider>
  );
}