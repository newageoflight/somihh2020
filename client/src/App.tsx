import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface } from './interfaces/Patient';

import './App.css';
import { InitialState } from './context/InitialState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'; 
import { Modal } from './components/Modal';

function App() {
  const [appState, setAppState] = useState<Array<PatientInterface>>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getData() {

      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: "example_station", 
      // };
      
      // console.log(InitialState); 

      // // create a new station
      // const postNewStation = await fetch("http://localhost:4000/station-api/new", requestOptions)
      // const postNewStationResponse = await postNewStation.json();
      // const {id: stationId} = postNewStationResponse;
      // console.log(stationId); 
      // // fetch('http://localhost:4000/station-api/new', requestOptions)
      // //   .then(response => response.json())
      // //   .then(data => console.log(data)) 
      
      // // add 10 patients
      // for (let index = 0; index < 10; index++) {
      //   let newPtPost = await fetch(`http://localhost:4000/station-api/${stationId}`, requestOptions);
      //   let newPtPostResponse = await newPtPost.json();
      //   let {id: ptId} = newPtPostResponse;
      // }

      setAppState(preprocessPatients(InitialState));

    }

    getData();
  }, [])

  return (
    <div className="App">
      <div id = "title"><FontAwesomeIcon icon = {faBars} /> Patient List</div>
      <div className="container">
        <div className="above-table">
          <button onClick={() => setShowModal(true)}>
            Add patient
          </button>
        </div>
        <PatientList patients={appState}/>
        <Modal onClose={() => setShowModal(false)} open={showModal}>
          <p>Show patient ID</p>
        </Modal>
      </div>
    </div>
  );
}

export default App;
