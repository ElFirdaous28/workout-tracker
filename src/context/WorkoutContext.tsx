import React, { createContext, useReducer, useEffect, Children, ReactNode } from "react";
import { Workout } from "@/types/workout";
import { workoutStorage } from "@/storage/workoutStorage";

type State = {
    workouts: Workout[];
    loading: boolean;
}

type Action =
    | { type: "ADD_WORKOUT"; payload: Workout }
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
            return { ...state, workouts: [...state.workouts, action.payload] };
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
                const data = await workoutStorage.loadWorkouts();
                dispatch({ type: "SET_WORKOUTS", payload: data })
            } catch (error) {
                console.error("Failed to load workouts", error);
                dispatch({ type: "SET_WORKOUTS", payload: [] })
            }
        }
        loadWorkouts();
    }, [])

    // save workouts to AsyncStorage whenever they change
    useEffect(() => {
        if (!state.loading) {
            workoutStorage.saveWorkouts(state.workouts).catch(
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