import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ActivityType, Intensity, Workout } from "@/types";
import { Select } from "./Select";

type Props = {
    onSubmit: (workout: Omit<Workout, "id">) => void;
};

export default function WorkoutForm({ onSubmit }: Props) {
    const { theme } = useTheme();
    const [type, setType] = useState<ActivityType>(ActivityType.Running);
    const [duration, setDuration] = useState("");
    const [intensity, setIntensity] = useState<Intensity>(Intensity.Medium);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<{ duration?: string; date?: string }>({});

    const formatDate = (input: string): string => {
        // Remove non-numeric characters
        const cleaned = input.replace(/\D/g, "");

        // Apply YYYY-MM-DD format automatically with leading zeros for single digits 1-9
        if (cleaned.length <= 4) {
            return cleaned; // YYYY
        } else if (cleaned.length <= 6) {
            const year = cleaned.slice(0, 4);
            const monthStr = cleaned.slice(4);
            const monthNum = parseInt(monthStr, 10);
            // Pad only if single digit between 1-9
            const month = monthNum > 0 && monthNum < 10 && monthStr.length === 1 ? monthStr.padStart(2, "0") : monthStr;
            return `${year}-${month}`;
        } else {
            const year = cleaned.slice(0, 4);
            const monthStr = cleaned.slice(4, 6);
            const dayStr = cleaned.slice(6, 8);
            const monthNum = parseInt(monthStr, 10);
            const dayNum = parseInt(dayStr, 10);
            // Pad only if single digit between 1-9
            const month = monthNum > 0 && monthNum < 10 && monthStr.length === 1 ? monthStr.padStart(2, "0") : monthStr;
            const day = dayNum > 0 && dayNum < 10 && dayStr.length === 1 ? dayStr.padStart(2, "0") : dayStr;
            return `${year}-${month}-${day}`;
        }
    };

    const validateDate = (dateStr: string): string | undefined => {
        if (!dateStr.trim()) {
            return "Date is required";
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateStr)) {
            return "Date must be in YYYY-MM-DD format";
        }

        const [year, month, day] = dateStr.split("-").map(Number);

        if (month < 1 || month > 12) {
            return "Month must be between 01 and 12";
        }

        if (day < 1 || day > 31) {
            return "Day must be between 01 and 31";
        }

        const parsedDate = new Date(year, month - 1, day);
        if (parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month - 1 || parsedDate.getDate() !== day) {
            return "Invalid date for the given month";
        }

        return undefined;
    };

    const validateForm = (): boolean => {
        const newErrors: { duration?: string; date?: string } = {};

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

        const dateError = validateDate(date);
        if (dateError) {
            newErrors.date = dateError;
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
            date: new Date(date).toISOString(),
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

            <Text style={[styles.label, { color: theme.textSecondary }]}>
                Date (YYYY-MM-DD)
            </Text>

            <TextInput
                value={date}
                onChangeText={(text) => {
                    const formatted = formatDate(text);
                    setDate(formatted);
                    const dateError = validateDate(formatted);
                    setErrors(prev => ({ ...prev, date: dateError }));
                }}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.textSecondary}
                style={[
                    styles.input,
                    {
                        borderColor: errors.date ? theme.error : theme.border,
                        backgroundColor: theme.background,
                        color: theme.textPrimary,
                    }
                ]}
            />
            {errors.date && (
                <Text style={[styles.errorText, { color: theme.error }]}>
                    {errors.date}
                </Text>
            )}

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
        elevation: 4,
        ...Platform.select({
            web: { boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" } as object,
            default: {
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
        }),
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});