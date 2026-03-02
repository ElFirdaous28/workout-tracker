import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Workout } from "@/types/workout";
import { useTheme } from "@/context/ThemeContext";

interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function WorkoutCard({ workout, onPress, onDelete }: WorkoutCardProps) {
  const { theme } = useTheme();
  const CardWrapper = onPress ? TouchableOpacity : View;

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      weekday: "short",
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <CardWrapper
      style={[styles.workoutCard, { backgroundColor: theme.surface, borderLeftColor: theme.primary }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardType, { color: theme.primary }]}>{workout.type}</Text>
          <Text style={[styles.cardDetails, { color: theme.textSecondary }]}>
            {formatDate(workout.date)}{"\n"}
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
            <Ionicons name="trash-outline" size={20} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  workoutCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
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
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
});
