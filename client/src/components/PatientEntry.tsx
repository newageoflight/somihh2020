import React from 'react'; 
import { PatientInterface } from './../interfaces/Patient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCheck, faTimes, faQuestion, faMinus } from '@fortawesome/free-solid-svg-icons'; 
import ReactTooltip from 'react-tooltip';

export const PatientEntry: React.FC<PatientInterface> = (pt) => {

    let patientStyle = {
        backgroundColor: '', 
    }; 
    
    pt.lastScreenPassed === -2 ? patientStyle.backgroundColor = "#f06356" : pt.lastScreenPassed === 3 ? patientStyle.backgroundColor = "#f0d969" : pt.lastScreenPassed === 2 ? patientStyle.backgroundColor = "#c6f0b4" : patientStyle.backgroundColor = "white"; 
    
    return (
        <tr className="patient-entry" style = {patientStyle}>
            <td className="bed-number">
                <FontAwesomeIcon icon={ faBed } />
                <span>{pt.bedNumber.toUpperCase()}</span>
            </td>
            <td className="test-info-last">
                <span>{pt.lastScreenDT.toLocaleString('en-AU', {timeZone: "Australia/Sydney"})}</span>
            </td> 
            <td className="test-status">
                {renderScreenResult(pt.lastScreenPassed)}
                <ReactTooltip />
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
            return (
                <>
                    <FontAwesomeIcon title="Responded to message (interactive only)" data-tip="Responded" icon={faCheck}  />
                </>
            ); 
        case -2:
            return (
                <>
                    <FontAwesomeIcon title="Error" data-tip="Error" icon={faTimes} />
                </>
            );
        case 3:
            return (
                <>
                    <FontAwesomeIcon title="Not responded (interactive only)" data-tip="No response" icon={faMinus} />
                </>
            );
        case -1:
            return (
                <>
                    <FontAwesomeIcon title="Not connected" data-tip="Not connected" icon={faQuestion} />
                </>
            );
        default:
            return (
                <>
                    <FontAwesomeIcon title="Error" data-tip="Error" icon={faTimes} />
                </>
            );
    }
}