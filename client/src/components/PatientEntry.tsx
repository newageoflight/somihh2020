import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PatientInterface } from './../interfaces/Patient';
import { faCheck, faTimes, faQuestion, faMinus } from '@fortawesome/free-solid-svg-icons';

export const PatientEntry: React.FC<PatientInterface> = (pt) => {
    return (
        <li className="patient-entry">
            <div className="bed-number">
                {pt.bedNumber}
            </div>
            <div className="test-info">
                <div>
                    <span>Last screen performed:</span>
                    <span>{pt.lastScreenDT.toLocaleString("en-AU")} {renderScreenResult(pt.lastScreenPassed)}</span>
                </div> 
                <div>
                    <span>Next screen due:</span>
                    <span>{pt.nextScreenDT.toLocaleString("en-AU")}</span>
                </div> 
            </div>
        </li>
    )
}

// for some bizarre ass reason this isn't working properly, the return values just don't show up in the main component
function renderScreenResult(result: string | null) {
    switch (result) {
        case "passed":
            return <FontAwesomeIcon icon={faCheck} />
        case "failed":
            return <FontAwesomeIcon icon={faTimes} />
        case "notDone":
            return <FontAwesomeIcon icon={faMinus} />
        case null:
            return <FontAwesomeIcon icon={faQuestion} />
    }
}