import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { ActivityType } from "@/types/workout";
import { useTheme } from "@/context/ThemeContext";

type Props = {
    selectedType: ActivityType | "All";
    onTypeChange: (type: ActivityType | "All") => void;
};

export default function WorkoutFilter({ selectedType, onTypeChange }: Props) {
    const { theme } = useTheme();
    const allTypes: (ActivityType | "All")[] = ["All", ...Object.values(ActivityType)];

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            {allTypes.map((type) => {
                const isSelected = selectedType === type;
                return (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: isSelected ? theme.primary : theme.surface,
                                borderColor: isSelected ? theme.primary : theme.border,
                            }
                        ]}
                        onPress={() => onTypeChange(type)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                {
                                    color: isSelected ? "#fff" : theme.textPrimary,
                                    fontWeight: isSelected ? "600" : "500",
                                }
                            ]}
                        >
                            {type}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        flexGrow: 0,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
    },
    filterText: {
        fontSize: 13,
    },
});
