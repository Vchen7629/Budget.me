import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@/app/api-slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSendUsernameMutation } from '@/app/api-slices/usersApiSlice';

function AuthCard() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [_, setShowLogin] = useState(!isAuthenticated);
  const dispatch = useDispatch()
  const [sendusername] = useSendUsernameMutation()

  useEffect(() => {
    const handleAuth = async () => {
      if (isAuthenticated && user) {
          const result = dispatch(setCredentials({ username: user.name }));
          console.log(result)
          const payload = result.payload.username
          const results = await sendusername({ username: payload })
          console.log(results)
      }
    }

    handleAuth()
  }, [isAuthenticated, user, dispatch, sendusername])

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  return (<div>
      {isAuthenticated ? (
        <div className='flex w-full space-x-[2vw] '>
          <p className='text-center'>Logged in as {user.name}</p>
          <button className="bg-blue-500 px-4 py-2 rounded-lg border-2 focus:outline-none shadow-lg" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className="bg-blue-500 px-4 py-2 rounded-lg border-2 focus:outline-none shadow-lg" onClick={handleLogin}>Login</button>
      )
	  }
    </div>)
}

export default AuthCard
