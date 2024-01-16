export interface ProfileTracker {
    message: String;
    statusCode: number;
    success: boolean;
    payload: {
        percentage: number;
        message: String;
        profileTracker: Tracker;
        bioTracker: Tracker;
        educationTracker: Tracker;
        skillsTracker: Tracker;
        careerTracker: Tracker;
    }
}

interface Tracker {
    percentageDone: number;
    pending: String[];
}