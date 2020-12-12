export interface PatientInterface {
    bedNumber: string;
    lastScreenDT: Date;
    lastScreenPassed: "passed" | "failed" | "notDone" | null;
    nextScreenDT: Date;
    connected: boolean;
}

interface RawPatientInterface {
    bedNumber: string;
    lastScreenDT: string;
    lastScreenPassed: "passed" | "failed" | "notDone" | null;
    nextScreenDT: string;
    connected: boolean;
}

export function preprocessPatients(pts: Array<RawPatientInterface>): Array<PatientInterface> {
    let newPts = Array<PatientInterface>();
    for (let index = 0; index < pts.length; index++) {
        const rawPt = pts[index];
        let {lastScreenDT, nextScreenDT} = rawPt;
        let lastScreenDate = new Date(lastScreenDT);
        let nextScreenDate = new Date(nextScreenDT);
        let newPt = {
            ...rawPt, lastScreenDT: lastScreenDate, nextScreenDT: nextScreenDate
        }
        newPts.push(newPt);
    }
    return newPts;
}