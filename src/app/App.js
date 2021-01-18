import React, { Component } from 'react';
import rootRoutes from './components/web/rootRoutes';
import NotFound from './NotFound';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
/** Redux Provider */
import { Provider } from 'react-redux';
/** Store */
import store from './store';
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<NotificationContainer />
					<BrowserRouter>
						<Switch>
							<Route path='/' component={rootRoutes} />
							<Route component={NotFound} />
						</Switch>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}
