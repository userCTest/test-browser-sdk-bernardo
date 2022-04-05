import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UsercentricsCmp} from "./components/UsercentricsCmp/UsercentricsCmp";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      Teste
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/Consent">Consent</Link>
        <UsercentricsCmp settingsId={'lGqePJA75'}/>
      </nav>
    </div>
  );
}

export default App;
