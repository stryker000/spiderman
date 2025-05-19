// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Home      from './pages/Home';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Catalogue from './pages/Catalogue';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/catalogue" element={<Catalogue />} />
        </Routes>
      </main>
    </>
  );
}
