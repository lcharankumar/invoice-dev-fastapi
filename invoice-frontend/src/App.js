
import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./style/style.scss";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {
  BrowserRouter,
  Routes, 
  Route,
  Redirect,
} from "react-router-dom";

import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import ProgressComponent from "./components/ProgressComponent"

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [login, setLogin] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 20,
    y: 30,
    w: 100,
    h: 50,
  });
  const [img, setImg] = useState(null);
  useEffect(() => {
    console.log(coordinates);
    console.log(img);
  }, [coordinates]);
 
  return (
    <div className={darkMode ? "app-dark" : "app-light"}>
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={<LoginComponent setLogin={setLogin}></LoginComponent>}
          />
          <Route
            path="/dashboard"
            element={<DashboardComponent ></DashboardComponent>}
          />
          <Route
            path="/request"
            element={<ProgressComponent coordinates={coordinates}
            setCoordinates={setCoordinates}
            img={img}
            setImg={setImg}
             ></ProgressComponent>}
          />
           </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
