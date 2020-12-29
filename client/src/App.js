import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/auth/Signup';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={Signup} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
