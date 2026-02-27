import React, { createContext, useReducer, useEffect, Children, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "@/types/workout";

type State = {
    workouts: Workout[];
    loading: boolean;
}

type Action =
    | { type: "ADD_WORKOUT"; playload: Workout }
    | { type: "REMOVE_WORKOUT"; payload: string }
    | { type: "SET_WORKOUTS"; payload: Workout[] };

type WorkoutContextType = {
    state: State;
    dispatch: React.Dispatch<Action>
}

// initial state
const initialState: State = {
    workouts: [],
    loading: true,
};


// REDUSER
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return { ...state, workouts: action.payload, loading: false };
        case "ADD_WORKOUT":
            return { ...state, workouts: [...state.workouts, action.playload] };
        case "REMOVE_WORKOUT":
            return {
                ...state,
                workouts: state.workouts.filter((w) => w.id !== action.payload)
            };
        default:
            return state
    }
}

// context 
export const WorkoutContext = createContext<WorkoutContextType>({
    state: initialState,
    dispatch: () => null,
})

// provider
export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // load workouts from AsyncStorage
    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const data = await AsyncStorage.getItem("@workouts");
                if (data) {
                    dispatch({ type: "SET_WORKOUTS", payload: JSON.parse(data) })
                }
                else {
                    dispatch({ type: "SET_WORKOUTS", payload: [] })
                }
            } catch (error) {
                console.error("Failed to load workouts", error);
                dispatch({ type: "SET_WORKOUTS", payload: [] })
            }
        }
    }, [])

    // save worjouts to AsyncStorage whenever they change
    useEffect(() => {
        if (!state.loading) {
            AsyncStorage.setItem("@workouts", JSON.stringify(state.workouts)).catch(
                (error) => console.error("Failed to save workouts", error)
            );
        }
    }, [state.workouts]);

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}