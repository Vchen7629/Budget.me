import React, { useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { LucideLogIn } from 'lucide-react';

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
				<button className="flex bg-blue-550 p-2 h-fit  items-center border-2 border-white space-x-2 rounded-md shadow-md">
          <div onClick={handleLogout}>Logout</div>
					<LucideLogIn />
				</button>
        </>
      ) : (
				<button className="flex bg-blue-550 p-2 h-fit  items-center border-2 border-white space-x-2 rounded-md shadow-md">
					<div onClick={handleLogin}>Login</div>
					<LucideLogIn />
				</button>
      )
	  }
    </div>)
}

export default AuthCard
