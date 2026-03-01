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
import { colors } from "../theme/colors";

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
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.valueText}>{value}</Text>
            </TouchableOpacity>

            <Modal transparent animationType="fade" visible={visible}>
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalContent}>
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
                                    <Text style={styles.optionText}>{item}</Text>
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
        color: colors.textSecondary,
        marginTop: 14,
        marginBottom: 6,
        fontSize: 13,
    },

    selectBox: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        padding: 14,
        borderRadius: 8,
    },

    valueText: {
        color: colors.textPrimary,
        fontSize: 14,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },

    modalContent: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },

    option: {
        padding: 16,
    },

    optionText: {
        color: colors.textPrimary,
        fontSize: 15,
    },
});