import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface } from './interfaces/Patient';

import './App.css';

function App() {
  const [appState, setAppState] = useState<Array<PatientInterface>>([]);

  let fake_patients = [
    {
        "bedNumber": "X10N22",
        "lastScreenDT": "2020-12-12T07:00Z",
        "lastScreenPassed": "passed",
        "nextScreenDT": "2020-12-13T07:00Z",
        "connected": true
    },
    {
        "bedNumber": "X10N20",
        "lastScreenDT": "2020-12-12T04:20Z",
        "lastScreenPassed": "failed",
        "nextScreenDT": "2020-12-13T04:20Z",
        "connected": true
    }
  ]

  useEffect(() => {
    async function getData() {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: "example_station", 
      };
      

      console.log(fake_patients); 

      fetch('http://localhost:4000/station-api/new', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data)) 
      

      /* 
      const getFetch = await fetch("fake-data.json");
      const getJSON = await getFetch.json();
      
      const appData = preprocessPatients(getJSON);
      

      setAppState(appData);

      */ 
    }

    getData();
  }, [])

  return (
    <div className="App">
      <div id = "title">Patient List</div>
      <PatientList patients={appState}/>
    </div>
  );
}

export default App;
