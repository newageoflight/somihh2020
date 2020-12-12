import React from 'react'
import { PatientInterface } from './../interfaces/Patient';
import { PatientEntry } from './PatientEntry';

interface Props {
    patients: Array<PatientInterface>;    
}

export const PatientList: React.FC<Props> = ({ patients }) => {
    return (
        <ul className="patient-container">
            {
                patients.map((pt, index) => (
                    <PatientEntry key = {index} {...pt} />
                ))
            }
        </ul>
    )
}
