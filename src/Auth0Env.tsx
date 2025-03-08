import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const envConfig = {
	domain: "dev-hoixp3jjti4nlbl0.us.auth0.com",
	clientId: "z6qIeQlYrXfWAxLGSSEA6VaEN5kp8GUB",
};
  
export function Auth0Wrapper(App) {
	return () => (
		<Auth0Provider
			{...envConfig}
			authorizationParams={{
				redirect_uri: "http://localhost:5173"
			}}
		>
			<App />
		</Auth0Provider>
	)
}
