import React, { useCallback, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";


const socket = io("http://localhost:3333", { transports : ['websocket'] });
const baseWeight = 10;
const  App: React.FC = () => {
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    console.log('called');

    socket.on('result', (data) => {
      
      
      setWeight(data);
      
    })

  }, [])

  const handleWeightEWaste = useCallback(() => {

    socket.emit('weight_e_waste')
    
  }, [])

  const money = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(weight / baseWeight)
  }, [weight])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{weight}Kg</code>
        </p>
        <p>
        <code>{money}</code>

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleWeightEWaste}>Calcular</button>
      </header>
    </div>
  );
}

export default App;
