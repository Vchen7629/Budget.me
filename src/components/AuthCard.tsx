import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@/app/api-slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSendUsernameMutation } from '@/app/api-slices/usersApiSlice';
import { LucideLogIn } from 'lucide-react';

function AuthCard() {
  const { isAuthenticated, user, isLoading, loginWithRedirect, logout } = useAuth0();
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

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex w-full space-x-[2vw]">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <p className="text-center">
              {user ? `Logged in as ${user.name}` : 'User data not available'}
            </p>
          )}
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg border-2 focus:outline-none shadow-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="flex flex-row bg-green-700 px-4 py-2 rounded-lg border-2 focus:outline-none shadow-lg space-x-2"
          onClick={handleLogin}
        >
          <LucideLogIn />
          <span>Login</span>
        </button>
      )}
    </div>
  );
}

export default AuthCard;