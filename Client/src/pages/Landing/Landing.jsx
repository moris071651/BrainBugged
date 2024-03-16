import { useEffect, useMemo, useState } from "react";

import "./Landing.css";

import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className="Landing">
        <h1>(CO)do</h1>
        <h2>Let your ideas thrive together!</h2>
        <p>Find or create projects to participate in,  gather a team and change the world together.</p>
        {/* <button></button> */}
        <Link className="buttonclass" to='/signup'>Get started!</Link>
        <img src="/src/assets/arts/circle1.svg" alt="" className="art-circle" />
        <img src="/src/assets/arts/mainpage-blob.svg" alt="" className="art-blob" />
    </div>
  );
};

export default Main;
