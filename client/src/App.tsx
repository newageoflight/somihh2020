import React, { useEffect, useState } from 'react';
import { PatientList } from './components/PatientList';

function App() {
  const [appState, setAppState] = useState([]);

  useEffect(() => {
    async function getData() {
      const getFetch = await fetch("fake-data.json");
      const getJSON = await getFetch.json();

      setAppState(getJSON);
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
