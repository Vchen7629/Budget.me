import React, { useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

function AuthCard() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  return (<div>
      {isAuthenticated ? (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )
	  }
    </div>)
}

export default AuthCard
