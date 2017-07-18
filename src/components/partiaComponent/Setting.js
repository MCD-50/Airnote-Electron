import React, { Component } from 'react';
const shell = require('electron').shell

class Settings extends Component {
	render() {
		return (
			<div className="setting-base-div">
				<h3>
					Airnotes
					<br />
					<small style={{ fontSize: 13, color: '#737373' }}>Beta</small>
					<br />
					<p style={{ fontSize: 16 }}>Airnotes is free and opensource text editor for Mac, Windows and Linux.</p>
					<p style={{ fontSize: 16 }}>It uses power of <a onClick={() => {
						shell.openExternal("https://github.com/brijeshb42/medium-draft")
					}}> Medium Draft Editor </a> to give you rich text editing experience.</p>
				</h3>

				<hr />

				<h3>
					Key board shortcuts
					<br />
					<small style={{ fontSize: 13, color: '#737373' }}>Press and hold on Alt/Option and hit</small>
					<br />
					<p style={{ fontSize: 14 }}>1 - TOGGLE ORDERED LIST</p>
					<p style={{ fontSize: 14 }}>* - TOGGLE UNORDERED LIST</p>
					<p style={{ fontSize: 14 }}># - TOGGLE HEADER</p>
					<p style={{ fontSize: 14 }}>&lt; - TOGGLE CAPTION</p>
					<p style={{ fontSize: 14 }}>&gt; - TOGGLE UNSTYLED OR PARAGRAPH GRAPH</p>
					<p style={{ fontSize: 14 }}>H - HIGHLIGHT SELECTION</p>
				</h3>

				<hr />

				<h3>
					Libraries used
					<br />
					<small style={{ fontSize: 13, color: '#737373' }}>Github urls</small>
					<br />

					<ul>
						<li style={{ fontSize: 14 }}>
							<a onClick={() => {
								shell.openExternal("https://github.com/arqex/fluxify")
							}}> Fluxify
							</a>
						</li>
						<li style={{ fontSize: 14 }}>
							<a onClick={() => {
								shell.openExternal("https://github.com/brijeshb42/medium-draft")
							}}> Medium Draft
							</a>
						</li>
						<li style={{ fontSize: 14 }}>
							<a onClick={() => {
								shell.openExternal("https://github.com/louischatriot/nedb")
							}}> NeDB
							</a>
						</li>
						<li style={{ fontSize: 14 }}>
							<a onClick={() => {
								shell.openExternal("https://github.com/HubSpot/draft-convert")
							}}> Draft Convert
							</a>
						</li>
						<li style={{ fontSize: 14 }}>
							<a onClick={() => {
								shell.openExternal("https://github.com/facebook/draft-js")
							}}> Draft JS
							</a>
						</li>
					</ul>

				</h3>


				<hr />

				<div style={{ display: 'flex', width: 200, justifyContent: 'space-between', alignItems: 'flex-end' }}>
					<a className="button is-primary" onClick={() => {
						shell.openExternal("https://github.com/MCD-50/Airnote-electron")
					}}>
						<span className="icon">
							<i className="fa fa-github"></i>
						</span>
						<span>Github</span>
					</a>
					<a className="button is-primary" onClick={() => {
						shell.openExternal("https://github.com/MCD-50/Airnote-electron")
					}}>
						<span className="icon">
							<i className="fa fa-share-alt"></i>
						</span>
						<span>Share</span>
					</a>
				</div>
			</div>);
	}
}



export default Settings
