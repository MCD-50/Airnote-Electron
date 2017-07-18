
import React, { Component } from 'react';


//helpers
import { SIDE_VIEW_ITEMS, DETAIL_LINUX_COLOR } from './../scripts/helper/Constant';
import { getAllNotes } from '../scripts/helper/Database';
import { getCreatedOn, getDateTime } from '../scripts/helper/Collection'

//enums
import { Type } from './../scripts/enum/Type';

//components
import Settings from './partiaComponent/Setting';
import Others from './partiaComponent/Other';

//store
import Flux from '../scripts/helper/Flux';
import Fluxify from 'fluxify';

//
import { Link } from 'react-router-dom';


class Home extends Component {
	constructor() {
		super();
		this.state = {
			notes: [],
			tasks: [],
			title: 'Notes',
			selectedIndex: 0,
			length: 0,
			isMounted: false
		};

		this.loadNotes = this.loadNotes.bind(this);
		this.renderSideView = this.renderSideView.bind(this);
		this.renderPane = this.renderPane.bind(this);

		this.renderNotes = this.renderNotes.bind(this);
		this.getNotes = this.getNotes.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
		this.getTasks = this.getTasks.bind(this);

		this.onAddClick = this.onAddClick.bind(this);
		this.renderSettings = this.renderSettings.bind(this);
		this.onSideViewItemClick = this.onSideViewItemClick.bind(this);
	}

	componentWillMount() {
		this.setState({ isMounted: true });
		this.loadNotes();
	}


	componentWillUnMount() {
		this.setState({ isMounted: false });
	}

	componentDidMount() {
		Flux.on('change:notes', (notes) => {
			const _notes = notes.filter(x => x.type == Type.NOTE).slice();
			const _tasks = notes.filter(x => x.type == Type.TASK).slice();
			if (this.state.isMounted) {
				this.setState({
					notes: _notes,
					tasks: _tasks,
					length: this.state.selectedIndex == 1 ? _tasks.length : (this.state.selectedIndex == 0 ? _notes.length : -1)
				});
			}
		});
	}

	loadNotes() {
		getAllNotes((data) => {
			if (!data.error) {
				Fluxify.doAction("updateNotes", data.result.slice())
			}
		});
	}

	renderSideView() {
		const items = SIDE_VIEW_ITEMS;
		return items.map((item, key) => {
			const icon = `fa ${item.icon}`
			return (
				<li key={key} onClick={this.onSideViewItemClick}>
					<a className="side-bar-li">
						<i className={icon} aria-hidden="true" style={{ marginRight: 20 }}></i>
						{item.name}
					</a>
				</li>
			);
		});
	}

	onSideViewItemClick(e) {
		const { tasks, notes } = this.state;
		const selectedIndex = SIDE_VIEW_ITEMS.findIndex(item => item.name == e.target.text.trim());
		this.setState({
			selectedIndex: selectedIndex,
			title: e.target.text.trim(),
			length: selectedIndex == 1 ? tasks.length : (selectedIndex == 0 ? notes.length : -1)
		});
	}


	renderTasks(content, tasks) {
		tasks = tasks.slice();
		//get array length
		const arrayLength = tasks.length;
		//find last index
		const lastIndex = arrayLength > 3 ? 3 : arrayLength;
		const chunk = tasks.splice(0, lastIndex);
		const _tasks = this.getTasks(chunk);
		content.push(_tasks);
		if (tasks.length > 0) {
			return this.renderTasks(content, tasks);
		}
		return (<div style={{ margin: 3, marginTop: 120 }}> {content} </div>);
	}


	getTasks(items) {
		return (
			<div className="tile is-ancestor" style={{ margin: 2 }}>
				{
					items.map((item, key) => {
						return (
							<div key={key} className="tile is-parent">
								<Link to={{ pathname: '/edit', state: { item: item } }} style={{ width: '100%', maxHeight: 300, overflowY: 'hidden' }}>
									<article className="tile is-child box">
										<p className="title">{getCreatedOn(item.modifiedOn)}</p>
										<p className="subtitle">{item.title}</p>
										<div className="content" style={{minHeight:250, maxHeight: 300, overflowY: 'hidden' }}>
											<p>{item.text}</p>
										</div>
									</article>
								</Link>
							</div>
						)
					})
				}
			</div>
		);
	}


	renderSettings() {
		return <Settings />
	}

	renderNotes(content, notes) {
		notes = notes.slice();
		//get array length
		const arrayLength = notes.length;
		//find last index
		const lastIndex = arrayLength > 3 ? 3 : arrayLength;
		const chunk = notes.splice(0, lastIndex);
		const _notes = this.getNotes(chunk);
		content.push(_notes);
		if (notes.length > 0) {
			return this.renderNotes(content, notes);
		}
		return (<div style={{ margin: 3, marginTop: 120 }}> {content} </div>);
	}

	getNotes(items) {
		return (
			<div className="tile is-ancestor" style={{ margin: 2 }}>
				{
					items.map((item, key) => {
						return (
							<div key={key} className="tile is-parent">
								<Link to={{ pathname: '/edit', state: { item: item } }} style={{ width: '100%' }}>
									<article className="tile is-child box">
										<p className="title">{getCreatedOn(item.modifiedOn)}</p>
										<p className="subtitle">{item.title}</p>
										<div className="content" style={{height:300, overflowY: 'hidden' }}>
											<p>{item.text}</p>
										</div>
									</article>
								</Link>
							</div>
						)
					})
				}
			</div>
		);
	}

	onAddClick(e) {
		this.props.history.push('./edit');
	}


	renderPane() {
		const { tasks, notes, selectedIndex } = this.state;
		if (selectedIndex == 0) {
			return this.renderNotes([], notes);
		} else if (selectedIndex == 1 && tasks.length > 0) {
			return this.renderTasks([], tasks);
		} else if (selectedIndex == 2) {
			return this.renderSettings()
		} else {
			return null;
		}
	}



	render() {
		return (
			<div className="window">
				<div className="window-content">
					<div className="pane-group">
						<div className="pane-sm sidebar">
							<ul className="menu-list">
								{this.renderSideView()}
							</ul>
						</div>
						<div className="pane">
							<Others title={this.state.title} size={this.state.length} />
							<div>
								{this.renderPane()}
							</div>
						</div>
					</div>
				</div>
				{
					this.state.selectedIndex == 2
						? ''
						:
						<a onClick={this.onAddClick} className="btn-floating btn-large waves-effect waves-light floating-button-add div-right"
							style={{ padding: 0, bottom: 16 }}>
							<i className="material-icons">add</i>
						</a>
				}
			</div>
		)
	}
}


export default Home
