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
                <dl>
                    <dt>Last screen performed:</dt>
                    <dd>{pt.lastScreenDT.toLocaleString("en-AU")} {renderScreenResult(pt.lastScreenPassed)}</dd>
                    <dt>Next screen due:</dt>
                    <dd>{pt.nextScreenDT.toLocaleString("en-AU")}</dd>
                </dl>
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