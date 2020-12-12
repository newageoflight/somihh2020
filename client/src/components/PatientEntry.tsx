import React from 'react'
import { PatientInterface } from './../interfaces/Patient';

export const PatientEntry: React.FC<PatientInterface> = (pt) => {
    return (
        <li className="patient-entry">
            <div className="bed-number">
                {pt.bedNumber}
            </div>
            <div className="test-info">
                <dl>
                    <dt>Last screen performed:</dt>
                    <dd>{pt.lastScreenDT.toLocaleDateString("en-AU")} ({renderScreenResult(pt.lastScreenPassed)})</dd>
                    <dt>Next screen due:</dt>
                    <dd>{pt.nextScreenDT.toLocaleDateString("en-AU")}</dd>
                </dl>
            </div>
        </li>
    )
}

function renderScreenResult(result: string | null) {
    if (result === null) {
        return "N/A"
    }
    else {
        switch (result) {
            case "passed":
                return "Passed"
            case "failed":
                return "Failed"
            case "notDone":
                return "Not performed"
        }
    }
}