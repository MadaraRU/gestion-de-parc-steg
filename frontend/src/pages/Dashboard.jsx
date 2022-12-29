import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Parc from '../components/Parc';
import Voiture from '../components/Voiture';

const Dashboard = () => {
  return (
    <>
      {/* <Header />
      <Parc />
      <Routes>
        <Route path="/voiture" element={<Voiture />} />
      </Routes> */}
    </>
  );
};

export default Dashboard;
