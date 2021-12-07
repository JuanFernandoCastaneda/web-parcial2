import React, { useState, useEffect } from 'react';
import './App.css';
import Spaces from '../spaces/Spaces';
import Home from '../spaces/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [spaces, setSpaces] = useState([]);
  const [homeId, setHomeId] = useState(-1);
  const [homeName, setHomeName] = useState('');

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json')
      .then(res => res.json()).then(res => {
        setSpaces(res);
      });
  }, []);

  function mostrarDetalle(homeId, homeName) {
    setHomeId(homeId);
    setHomeName(homeName);
  }

  function retroceder() {
    setHomeId(-1);
  }

  return (
    <div className="App">
      {homeId !== -1 ? <Home homeId={homeId} homeName={homeName} retroceder={retroceder} /> : <Spaces spaces={spaces} detalle={mostrarDetalle} />}
    </div>
  );
}

export default App;
