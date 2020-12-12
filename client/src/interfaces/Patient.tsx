export interface PatientInterface {
    bedNumber: string;
    lastScreenDT: Date;
    lastScreenPassed: number;
    nextScreenDT: Date;
    connected: boolean;
}

interface RawPatientInterface {
    bedNumber: string;
    lastScreenDT: string;
    lastScreenPassed: number;
    nextScreenDT: string;
    connected?: boolean;
}

export function preprocessPatients(pts: Array<RawPatientInterface>): Array<PatientInterface> {
    let newPts = Array<PatientInterface>();
    for (let index = 0; index < pts.length; index++) {
        const rawPt = pts[index];
        let {lastScreenDT, nextScreenDT} = rawPt;
        let lastScreenDate = new Date(lastScreenDT);
        let nextScreenDate = new Date(nextScreenDT);
        let newPt = {
            ...rawPt, lastScreenDT: lastScreenDate, nextScreenDT: nextScreenDate, connected: true
        }
        newPts.push(newPt);
    }
    return newPts;
}