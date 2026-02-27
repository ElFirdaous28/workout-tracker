import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";

type WorkoutDetailsRouteProp = RouteProp<AppStackParamList, "WorkoutDetails">;
type WorkoutDetailsNavigationProp = NativeStackNavigationProp<AppStackParamList, "WorkoutDetails">;

const WorkoutDetailsScreen = () => {
  const { state, dispatch } = useContext(WorkoutContext);
  const route = useRoute<WorkoutDetailsRouteProp>();
  const navigation = useNavigation<WorkoutDetailsNavigationProp>();
  const { id } = route.params;

  const workout = state.workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color={colors.error} />
          <Text style={styles.errorText}>Workout not found</Text>
        </View>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "REMOVE_WORKOUT", payload: id });
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.typeContainer}>
            <Ionicons name="fitness" size={32} color={colors.primary} />
            <Text style={styles.workoutType}>{workout.type}</Text>
          </View>
          <View style={styles.intensityBadge}>
            <Text style={styles.intensityText}>{workout.intensity.toUpperCase()}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{workout.duration} minutes</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="calendar-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate(workout.date)}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <Ionicons name="speedometer-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Intensity</Text>
              <Text style={styles.detailValue}>{workout.intensity}</Text>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        {workout.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>{workout.notes}</Text>
            </View>
          </View>
        )}

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
          <Text style={styles.deleteButtonText}>Delete Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 16,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderLeftWidth: 6,
    borderLeftColor: colors.primary,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutType: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginLeft: 12,
  },
  intensityBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  notesContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  notesText: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.error,
    marginLeft: 8,
  },
});