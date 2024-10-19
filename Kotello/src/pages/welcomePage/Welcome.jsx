import React, { useContext } from "react";
import "./welcome.css";
import ApiContext from '../../context/ApiContext';

const Welcome = () => {
    const {polish} = useContext(ApiContext);
  return (
    <div >
        <p className="welcomeSign">{polish?'Witaj w Kotello':'Welcome to Kotello'}</p>
    </div>
  )
}

export default Welcome