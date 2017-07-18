import React from 'react';
import { render } from 'react-dom';

import Home from './components/Home';
import Splash from './components/Splash';
import Edit from './components/Edit';

import { createHashHistory } from 'history';
import { Router, Route } from 'react-router-dom'

//import all css and js files
import './styles/App.css';
import './styles/Google.css';
import './styles/MediumDraft.css';
import './styles/Bulma.css';
import './styles/Photon.css';
import './scripts/js/MediumDraft';

window.onload = () => {
	render(
		<Router history={createHashHistory()}>
			<div>
				<Route exact path="/" component={Splash} />
				<Route path="/edit" component={Edit} />
				<Route path="/home" component={Home} />
			</div>
		</Router>, document.getElementById('app'))
}
