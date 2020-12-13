import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface, ServerPatient } from './interfaces/Patient';

import './App.css';
import { InitialState } from './context/InitialState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'; 
import { Modal } from './components/Modal';
import { getRandomIntegerInclusive } from './utils/RandomInteger';

function App() {

  const [appState, setAppState] = useState<Array<PatientInterface>>([]);

  const [showModal, setShowModal] = useState(false);

  //set initial state 
  // useEffect(() => {
  //   async function getData() {

  //     //localhost/4000/stream 



  //     // const requestOptions = {
  //     //   method: 'POST',
  //     //   headers: { 'Content-Type': 'application/json' },
  //     //   body: "example_station", 
  //     // };
      

  //     // // create a new station
  //     // const postNewStation = await fetch("http://localhost:4000/station-api/new", requestOptions)
  //     // const postNewStationResponse = await postNewStation.json();
  //     // const {id: stationId} = postNewStationResponse;
      
<<<<<<< HEAD
      // // add 10 patients
      // let patientIds = new Array<string>();
      // for (let index = 0; index < 10; index++) {
      //   let newPtPost = await fetch(`http://localhost:4000/station-api/${stationId}`, requestOptions);
      //   let newPtPostResponse = await newPtPost.json();
      //   let {id: ptId} = newPtPostResponse;
      //   patientIds.push(ptId)
      // }

      //console.log(InitialState[3].lastScreenDT);

      //console.log(new Date().toISOString()); 
      setAppState(preprocessPatients(InitialState));

      

      //console.log(InitialState[3].lastScreenPassed); 

    }

    getData();
  }, [])
=======
  //     // // add 10 patients
  //     // let patientIds = new Array<ServerPatient>();
  //     // for (let index = 0; index < 10; index++) {
  //     //   let newPtPost = await fetch(`http://localhost:4000/station-api/${stationId}`, requestOptions);
  //     //   let newPtPostResponse = await newPtPost.json();
  //     //   let {id: newPtId, code: newPtCode} = newPtPostResponse;
  //     //   // set options randomly
  //     //   await fetch(`http://localhost:4000/station-api/${stationId}/${newPtId}`, {
  //     //     method: "POST",
  //     //     headers: { "Content-Type": "application/json" },
  //     //     body: JSON.stringify({
  //     //       frequency: getRandomIntegerInclusive(1,4),
  //     //       interactive: getRandomIntegerInclusive(0,1)
  //     //     })
  //     //   })
  //     // }

  //     // setAppState(preprocessPatients(InitialState));

  //     //console.log(InitialState[3].lastScreenPassed); 

  //   }

  //   getData();
  // }, [])
>>>>>>> 4fb50dbeb2daf1af21f1eb2d52b2eee1fbab1645


  useEffect(() => {
    
    let events = new EventSource("http://localhost:4000/stream");

      events.onmessage = event => {

        //not used, hard-coded instead 
        const parsedData = JSON.parse(event.data);
        

        console.log(event); 

        console.log("Initial state \n", InitialState); 
        
        /*
        setAppState(preprocessPatients(parsedData)); 
        */ 

       InitialState[3].lastScreenPassed = 2; 
       InitialState[3].lastScreenDT = new Date().toISOString(); 

      //set the next screen for 1 hour!
      let myDate = new Date(); 
      myDate.setHours( myDate.getHours() + 1 );
      InitialState[3].nextScreenDT = myDate.toISOString();  

      setAppState(preprocessPatients(InitialState)); 

      };

  }, []) 



  return (
    <div className="App">
      <div id = "title"><FontAwesomeIcon icon = {faBars} /> Patient List</div>
      <div className="container">
        <div className="above-table">
          <button className="settings">
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button className="add-patient" onClick={() => setShowModal(true)}>
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
