import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    Pressable,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

type Props<T> = {
    label: string;
    value: T;
    options: T[];
    onSelect: (value: T) => void;
};

export function Select<T extends string>({
    label,
    value,
    options,
    onSelect,
}: Props<T>) {
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>

            <TouchableOpacity
                style={[styles.selectBox, { borderColor: theme.border, backgroundColor: theme.background }]}
                onPress={() => setVisible(true)}
            >
                <Text style={[styles.valueText, { color: theme.textPrimary }]}>{value}</Text>
            </TouchableOpacity>

            <Modal transparent animationType="fade" visible={visible}>
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onSelect(item);
                                        setVisible(false);
                                    }}
                                >
                                    <Text style={[styles.optionText, { color: theme.textPrimary }]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        marginTop: 14,
        marginBottom: 6,
        fontSize: 13,
    },

    selectBox: {
        borderWidth: 1,
        padding: 14,
        borderRadius: 8,
    },

    valueText: {
        fontSize: 14,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },

    modalContent: {
        borderRadius: 12,
        borderWidth: 1,
    },

    option: {
        padding: 16,
    },

    optionText: {
        fontSize: 15,
    },
});