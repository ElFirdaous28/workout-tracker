import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Workout, ActivityType, Intensity } from "../types/workout";
import { colors } from "../theme/colors";
import { Select } from "../components/Select";

type Props = {
    onSubmit: (workout: Omit<Workout, "id">) => void;
};

export default function WorkoutForm({ onSubmit }: Props) {
    const [type, setType] = useState<ActivityType>(ActivityType.Running);
    const [duration, setDuration] = useState("");
    const [intensity, setIntensity] = useState<Intensity>(Intensity.Medium);
    const [notes, setNotes] = useState("");

    const handleSubmit = () => {
        const workout: Omit<Workout, "id"> = {
            type,
            duration: Number(duration),
            intensity,
            date: new Date().toISOString(),
            notes: notes || undefined,
        };

        onSubmit(workout);

        setDuration("");
        setNotes("");
        setType(ActivityType.Running);
        setIntensity(Intensity.Medium);
    };

    return (
        <View style={styles.container}>
            <Select
                label="Type"
                value={type}
                options={Object.values(ActivityType)}
                onSelect={(val) => setType(val as ActivityType)}
            />

            <Text style={styles.label}>Duration (min)</Text>
            <TextInput
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
                style={styles.input}
            />

            <Select
                label="Intensity"
                value={intensity}
                options={Object.values(Intensity)}
                onSelect={(val) => setIntensity(val as Intensity)}
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },

    label: {
        color: colors.textSecondary,
        marginTop: 14,
        marginBottom: 6,
        fontSize: 13,
        letterSpacing: 0.5,
    },

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 8,
        color: colors.textPrimary,
        fontSize: 14,
    },

    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});