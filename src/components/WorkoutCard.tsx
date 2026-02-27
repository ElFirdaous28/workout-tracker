import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Workout } from "@/types/workout";
import { colors } from "@/theme/colors";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
}

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={styles.workoutCard}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={styles.cardType}>{workout.type}</Text>
      <Text style={styles.cardDetails}>
        Duration: {workout.duration} minutes{"\n"}
        Intensity: {workout.intensity}
      </Text>
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardType: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
