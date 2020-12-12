import React from 'react'; 
import { PatientInterface } from './../interfaces/Patient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCheck, faTimes, faQuestion, faMinus } from '@fortawesome/free-solid-svg-icons'; 

export const PatientEntry: React.FC<PatientInterface> = (pt) => {
    return (
        <tr className="patient-entry">
            <td className="bed-number">
                <FontAwesomeIcon icon={ faBed } />
                <span>{pt.bedNumber.toUpperCase()}</span>
            </td>
            <td className="test-info-last">
                <span>{pt.lastScreenDT.toLocaleString('en-AU', {timeZone: "Australia/Sydney"})}</span>
            </td> 
            <td className="test-status">
                {renderScreenResult(pt.lastScreenPassed)}
            </td>
            <td className="test-info-next">
                {pt.nextScreenDT.toLocaleString('en-AU', {timeZone: "Australia/Sydney"})}
            </td> 
        </tr>
    )
}

// for some bizarre ass reason this isn't working properly, the return values just don't show up in the main component
function renderScreenResult(result: number) {
    switch (result) {
        case -1:
            return <FontAwesomeIcon icon={faCheck} />; 
        case 0:
            return <FontAwesomeIcon icon={faTimes} />; 
        case 1:
            return <FontAwesomeIcon icon={faMinus} />;
        case 2:
            return <FontAwesomeIcon icon={faQuestion} />;
        }
}