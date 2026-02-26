import { View, Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Add Workout"
        onPress={() => navigation.navigate("AddWorkout")}
      />
    </View>
  );
}