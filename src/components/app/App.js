import React, { useState, useEffect } from 'react';
import './App.css';
import Spaces from '../spaces/Spaces';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [spaces, setSpaces] = useState([]);
  const [roomDetail, setRoomDetail] = useState([false]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json')
        .then(res => res.json()).then(res => {
            setSpaces(res);
        });
  }, []);

  function mostrarDetalle(homeId) {
    setRoomDetail(true);
  }

  return (
    <div className="App">
      <Spaces spaces={spaces} detalle={mostrarDetalle}/>
    </div>
  );
}

export default App;
