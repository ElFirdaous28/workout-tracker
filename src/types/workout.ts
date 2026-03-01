export enum Intensity {
    Low = "low",
    Medium = "medium",
    High = "high",
}

export enum ActivityType {
    Running = "Running",
    Cycling = "Cycling",
    Strength = "Strength",
    Swimming = "Swimming",
}

export interface Workout {
    id: string;
    type: ActivityType;
    duration: number; // in minutes
    intensity: Intensity;
    date: string;
    notes?: string;
}