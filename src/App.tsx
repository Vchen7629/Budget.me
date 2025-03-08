import React, { useState } from 'react';
import { Route, Routes } from "react-router";
import BudgetPage from "./pages/budgetpage.js"
import HomePage from "./pages/homepage.js";
import AuthCard from "./components/AuthCard.tsx";
import { Auth0Wrapper } from './Auth0Env';

function App() {
  return (
  <>
    <Routes>
      <Route path="/budget" element={<BudgetPage/>} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    <AuthCard />
  </>
  );
}

export default Auth0Wrapper(App)
