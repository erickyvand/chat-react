import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginEmail from './components/auth/LoginEmail';
import LoginPassword from './components/auth/LoginPassword';
import Signup from './components/auth/Signup';
import Chat from './components/chat/Chat';
import NotFound from './components/Layouts/NotFound';

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/' component={Signup} />
					<Route exact path='/email' component={LoginEmail} />
					<Route exact path='/password' component={LoginPassword} />
					<Route path='/chat' component={Chat} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
