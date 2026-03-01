import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Workout, ActivityType, Intensity } from "../types/workout";
import { useTheme } from "@/context/ThemeContext";
import { Select } from "../components/Select";

type Props = {
    onSubmit: (workout: Omit<Workout, "id">) => void;
};

export default function WorkoutForm({ onSubmit }: Props) {
    const { theme } = useTheme();
    const [type, setType] = useState<ActivityType>(ActivityType.Running);
    const [duration, setDuration] = useState("");
    const [intensity, setIntensity] = useState<Intensity>(Intensity.Medium);
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<{ duration?: string }>({});

    const validateForm = (): boolean => {
        const newErrors: { duration?: string } = {};

        if (!duration.trim()) {
            newErrors.duration = "Duration is required";
        } else {
            const durationNum = Number(duration);
            if (isNaN(durationNum)) {
                newErrors.duration = "Duration must be a valid number";
            } else if (durationNum <= 0) {
                newErrors.duration = "Duration must be greater than 0";
            } else if (durationNum > 60) {
                newErrors.duration = "Duration cannot exceed 60 minutes (1 hour)";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

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
        setErrors({});
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Select
                label="Type"
                value={type}
                options={Object.values(ActivityType)}
                onSelect={(val) => setType(val as ActivityType)}
            />

            <Text style={[styles.label, { color: theme.textSecondary }]}>Duration (min)</Text>
            <TextInput
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
                style={[
                    styles.input,
                    {
                        borderColor: errors.duration ? theme.error : theme.border,
                        backgroundColor: theme.background,
                        color: theme.textPrimary,
                    }
                ]}
            />
            {errors.duration && (
                <Text style={[styles.errorText, { color: theme.error }]}>
                    {errors.duration}
                </Text>
            )}

            <Select
                label="Intensity"
                value={intensity}
                options={Object.values(Intensity)}
                onSelect={(val) => setIntensity(val as Intensity)}
            />

            <Text style={[styles.label, { color: theme.textSecondary }]}>Notes</Text>
            <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Optional"
                placeholderTextColor={theme.textSecondary}
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.background, color: theme.textPrimary }]}
            />

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: theme.primary }]}>
                <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
    },

    label: {
        marginTop: 14,
        marginBottom: 6,
        fontSize: 13,
        letterSpacing: 0.5,
    },

    input: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontSize: 14,
    },

    errorText: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500",
    },

    button: {
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
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