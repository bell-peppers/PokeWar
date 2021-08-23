import React from 'react';
import { AuthProvider } from '../src/contexts/AuthContext';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
	return (
		<div>
			<AuthProvider>
				<Navbar />
				<Routes />
			</AuthProvider>
		</div>
	);
};

export default App;
