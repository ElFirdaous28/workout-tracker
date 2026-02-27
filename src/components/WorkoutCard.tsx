import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Workout } from "@/types/workout";
import { colors } from "@/theme/colors";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function WorkoutCard({ workout, onPress, onDelete }: WorkoutCardProps) {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={styles.workoutCard}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardType}>{workout.type}</Text>
          <Text style={styles.cardDetails}>
            Duration: {workout.duration} minutes{"\n"}
            Intensity: {workout.intensity}
          </Text>
        </View>
        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.6}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        )}
      </View>
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
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
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
});
