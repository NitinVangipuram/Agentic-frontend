import React from 'react'
import { useEffect, useState } from "react";
import AgentOutputViewer from "./components/AgentOutputViewer";
import ChatInterface from "./components/ChatInterface/ChatInterface";
import Titlebar from "./components/Titlebar/Titlebar";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LogStream from './components/LogStream';

const App = () => {

  const [messages, setMessages] = useState([]);

  const Mainscreen = () => (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <div className="MainScreen">
        <Titlebar />
        <ChatInterface />
      </div>
    </div>
  );

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Mainscreen />} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </Router>
    <div>
      {/* <Login/> */}
      {/* <Titlebar/> */}
      <ChatInterface/>
      {/* <LogStream/> */}
    </div>
  );
}

export default App;
