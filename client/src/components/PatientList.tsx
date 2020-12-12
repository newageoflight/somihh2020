import React from 'react'
import { PatientInterface } from './../interfaces/Patient';
import { PatientEntry } from './PatientEntry';

interface Props {
    patients: Array<PatientInterface>;    
}

export const PatientList: React.FC<Props> = ({ patients }) => {
    if (patients.length == 0)  {
        return (
            <div>
                There are no patients currently being tracked. 
            </div>
        )
    } else {
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
}
