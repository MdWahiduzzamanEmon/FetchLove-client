
import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginForm from "./Form/LoginForm/LoginForm";
import Chats from "./Components/Chats/Chats";



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path="/chats" element={<Chats />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
