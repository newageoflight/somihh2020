import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';
import { preprocessPatients, PatientInterface } from './interfaces/Patient';

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
      <PatientList patients={appState}/>
    </div>
  );
}

export default App;
