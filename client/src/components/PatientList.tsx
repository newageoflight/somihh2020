import React from 'react'
import { PatientInterface } from './../interfaces/Patient';
import { PatientEntry } from './PatientEntry';

interface Props {
    patients: Array<PatientInterface>;    
}

export const PatientList: React.FC<Props> = ({ patients }) => {
    return (
        <table className="patient-container">
            <tbody>
            <tr id = "table-headers">
                <th id = "bed-number-header">Bed Number</th>
                <th id = "test-info-last-header">
                   Last Screen Performed
                </th> 
                <th id = "test-info-next-header">
                    Next Screen Due
                </th>      
            </tr>
            {
                patients.map((pt, index) => (
                    <PatientEntry key = {index} {...pt} />
                ))
            }
            </tbody>
        </table>
    )
}
