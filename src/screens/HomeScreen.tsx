import { View, Text, FlatList } from "react-native";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export default function HomeScreen() {
  const { state } = useContext(WorkoutContext);

  return (
    <View>
      <Text>My Workouts:</Text>
      <Text>{state.workouts.length}</Text>
      <FlatList
        data={state.workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.type} - {item.duration} min - {item.intensity}
          </Text>
        )}
      />
    </View>
  );
}