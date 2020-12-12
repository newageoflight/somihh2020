import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface } from './interfaces/Patient';

import './App.css';
import { AddPatient } from './components/AddPatient';

function App() {
  const [appState, setAppState] = useState<Array<PatientInterface>>([]);

  useEffect(() => {
    async function getData() {
      const getFetch = await fetch("fake-data.json");
      const getJSON = await getFetch.json();
      const appData = preprocessPatients(getJSON);

      setAppState(appData);
    }

    getData();
  }, [])

  return (
    <div className="App">
      <div id = "title">Patient List</div>
      <div className="container">
        <div className="above-table">
          <AddPatient />
        </div>
        <PatientList patients={appState}/>
      </div>
    </div>
  );
}

export default App;
