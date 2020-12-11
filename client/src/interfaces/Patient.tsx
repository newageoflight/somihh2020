export interface PatientInterface {
    bedNumber: string;
    lastScreenDT: Date;
    lastScreenPassed: "passed" | "failed" | "notDone" | null;
    nextScreenDT: Date;
    connected: boolean;
}