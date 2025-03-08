import React, { useState } from 'react';
import { Route, Routes } from "react-router";
import BudgetPage from "./pages/budgetpage.js"
import HomePage from "./pages/homepage.js";

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import envConfig from './Env';


function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  return (
  <>
    <Routes>
      <Route path="/budget" element={<BudgetPage/>} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    <div>
      {isAuthenticated ? (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )

      }

    </div>
  </>
  );
}

export default () => (
  <Auth0Provider
	{...envConfig}
	  authorizationParams={{
		  redirect_uri: "http://localhost:5173"
	  }}
  >
    <App />
  </Auth0Provider>
)
