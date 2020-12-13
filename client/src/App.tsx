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

  
  //set the initial state 
   useEffect(() => { 

      let oldDateObj, newDateObj; 
      let randomMinutes; 
      InitialState.forEach((elem, index) => {
        oldDateObj = new Date(); 
        randomMinutes = Math.floor(Math.random() * 59) + 1; 
        newDateObj = new Date(oldDateObj.getTime() - randomMinutes*60000);
        elem.lastScreenDT = newDateObj.toISOString(); 
        newDateObj.setHours( newDateObj.getHours() + 1 );
        elem.nextScreenDT = newDateObj.toISOString(); 
      });

      setAppState(preprocessPatients(InitialState));
  }, [])


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
