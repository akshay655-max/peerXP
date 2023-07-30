import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Expense from "./components/Expense";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </>
  );
}

export default App;
