import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Workout, ActivityType, Intensity } from "../types/workout";
import { colors } from "../theme/colors";
import { Picker } from "@react-native-picker/picker";

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
            <Text style={styles.label}>Type</Text>
            <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue as ActivityType)}
                style={styles.picker}
            >
                {Object.values(ActivityType).map((act) => (
                    <Picker.Item key={act} label={act} value={act} />
                ))}
            </Picker>

            <Text style={styles.label}>Duration (min)</Text>
            <TextInput
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
                style={styles.input}
            />

            <Text style={styles.label}>Intensity</Text>
            <Picker
                selectedValue={intensity}
                onValueChange={(itemValue) => setIntensity(itemValue as Intensity)}
                style={styles.picker}
            >
                {Object.values(Intensity).map((i) => (
                    <Picker.Item key={i} label={i} value={i} />
                ))}
            </Picker>

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
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 8,
    },
    label: {
        color: colors.textPrimary,
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        padding: 8,
        borderRadius: 6,
        color: colors.textPrimary,
    },
    picker: {
        color: colors.textPrimary,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});