import React from 'react'; 
import { PatientInterface } from './../interfaces/Patient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCheck, faTimes, faQuestion, faMinus } from '@fortawesome/free-solid-svg-icons'; 

export const PatientEntry: React.FC<PatientInterface> = (pt) => {
    console.log(pt); 
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

function renderScreenResult(result: number) {
    switch (result) {
        case 2:
            return <FontAwesomeIcon icon={faCheck} />; 
        case -2:
            return <FontAwesomeIcon icon={faTimes} />; 
        case 3:
            return <FontAwesomeIcon icon={faMinus} />;
        case -1:
            return <FontAwesomeIcon icon={faQuestion} />;
    }
}