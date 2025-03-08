import React, { useState } from 'react';
import { Route, Routes } from "react-router";
import HomePage from "./pages/homepage.tsx";
import AuthCard from "./components/AuthCard.tsx";
import { Auth0Wrapper } from './Auth0Env';

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
    </Routes>
    <AuthCard />
  </>
  );
}

export default Auth0Wrapper(App)
