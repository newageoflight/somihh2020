import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface } from './interfaces/Patient';

import './App.css';
import { AddPatient } from './components/AddPatient';
import { InitialState } from './context/InitialState';

function App() {
  const [appState, setAppState] = useState<Array<PatientInterface>>([]);

  useEffect(() => {
    async function getData() {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: "example_station", 
      };
      
      console.log(InitialState); 

      // create a new station
      const postNewStation = await fetch("http://localhost:4000/station-api/new", requestOptions)
      const postNewStationResponse = await postNewStation.json();
      const {id: stationId} = postNewStationResponse;
      // fetch('http://localhost:4000/station-api/new', requestOptions)
      //   .then(response => response.json())
      //   .then(data => console.log(data)) 
      
      // add 10 patients
      for (let index = 0; index < 10; index++) {
        let newPtPost = await fetch(`http://localhost:4000/station-api/${stationId}`, requestOptions);
        let newPtPostResponse = await newPtPost.json();
        
      }

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
