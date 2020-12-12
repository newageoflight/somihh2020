import React from 'react'
import { PatientInterface } from './../interfaces/Patient';
import { PatientEntry } from './PatientEntry';

interface Props {
    patients: Array<PatientInterface>;    
}

export const PatientList: React.FC<Props> = ({ patients }) => {
    return (
        <div className="patient-container">
            <div id = "table-headers">
                <div id = "bed-number-header">Bed Number</div>
                <div id = "test-info-header">
                    <div>
                        <span>Last Screen Performed</span>
                    </div>
                    <div>
                        <span>Next Screen Due</span>
                    </div>      
                </div>
            </div>
            {
                patients.map((pt, index) => (
                    <PatientEntry key = {index} {...pt} />
                ))
            }
        </div>
    )
}
