import logo from './logo.svg';
import Home from "./pages/home/Home";
import Notation from './pages/notation/notation'
import Staff from "./pages/staff/Staff"
import './App.css';
import Sidebar from './components/sidebar';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Settings from './pages/settings/setting';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />

        <Routes>
          <Route path="/staff" element={<Staff />} />
          <Route path="/notation" element={<Notation />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
