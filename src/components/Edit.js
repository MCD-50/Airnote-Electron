

import React, { Component } from 'react';
import Flux from '../scripts/helper/Flux';
import Fluxify from 'fluxify';

import { getCreatedOn, getDateTime, getKey } from '../scripts/helper/Collection';
import { EditorState, ContentState, CompositeDecorator } from 'draft-js'
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { addNote, updateNote, deleteNote } from '../scripts/helper/Database';
import { BLOCK_BUTTONS, INLINE_BUTTONS } from '../scripts/helper/Constant';

import { stateFromHTML } from 'draft-js-import-html';


import {
	Editor as MediumEditor,
	findLinkEntities,
	Link,
} from 'medium-draft';


const decorator = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: Link,
	},
]);

class Edit extends Component {
	constructor() {
		super();
		this.state = {
			note: null,
			prevText: '',
			html: '',
			text: '',
			title: '',
			editorState: this.setEditorSate('Loading...')
		};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
		this.setEditorSate = this.setEditorSate.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.popToHome = this.popToHome.bind(this);
		this.onBackPressed = this.onBackPressed.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			try {
				const item = this.props.location.state.item || null;
				if (item) {
					this.setState({
						editorState: this.setEditorSate(item.html),
						note: item,
						text: item.text,
						title: item.title
					});
				} else {
					this.setState({ editorState: this.setEditorSate('') });
				}
			} catch (e) {
				this.setState({ editorState: this.setEditorSate('') });
			}
		}, 30);
	}

	onDeleteClick(e) {
		const { note } = this.state;
		if (note) {
			deleteNote({ _id: note._id }, (data) => {
				this.popToHome();
			});
		}
	}

	popToHome() {
		this.props.history.goBack();
	}

	setEditorSate(text) {
		return EditorState.createWithContent(stateFromHTML(text), decorator)
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState: editorState,
			html: mediumDraftExporter(editorState.getCurrentContent()),
			text: editorState.getCurrentContent().getPlainText() || ''
		});
	}

	onTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	onBackPressed() {
		const { title, html, note, text, prevText } = this.state;
		const dateTime = getDateTime();
		if (note && text.trim() != '') {
			updateNote({ _id: note._id }, {
				$set: {
					title: title || getCreatedOn(dateTime),
					html: html,
					text: text,
					modifiedOn: dateTime,
				}
			}, (data) => {
				this.popToHome();
			});
		} else if (note && text.trim() == '') {
			deleteNote({ _id: note._id }, (data) => {
				this.popToHome();
			});
		} else if (note == null && text.length > 0) {
			addNote({
				_id: getKey(dateTime),
				title: title || text,
				text: text,
				html: html,
				modifiedOn: dateTime,
				createdOn: dateTime,
				userId: 1,
				type: Flux.type
			}, (data) => {
				this.popToHome();
			});
		} else {
			this.popToHome();
		}
	}

	render() {
		return (
			<div>
				<div style={{ maxWidth: 750, margin: 'auto', marginTop: 70 }}>

					<h1 style={{ textAlign: 'center' }}>{this.state.note && this.state.note.modifiedOn || getCreatedOn(getDateTime())}
						<br />
						<input placeholder={"Your title..."} value={this.state.title} onChange={this.onTitleChange}
							style={{ fontSize: 15, color: '#737373', maxWidth: 200, textAlign: 'center' }} />
					</h1>

					<div style={{ display: 'list-item' }}>
						<div style={{ float: 'left' }}>
							<a className="button" onClick={this.onBackPressed}>
								<span className="icon is-small">
									<i className="fa fa-arrow-left"></i>
								</span>
								<span>Back</span>
							</a>
						</div>
					</div>

					<hr />
					<MediumEditor
						ref="medium_editor"
						placeholder="Start typing from here..."
						spellCheck={true}
						blockButtons={BLOCK_BUTTONS}
						inlineButtons={INLINE_BUTTONS}
						sideButtons={[]}
						editorState={this.state.editorState}
						onChange={this.onEditorStateChange} />

				</div>
				{
					this.state.note == null
						? ''
						: <a onClick={this.onDeleteClick} className="btn-floating btn-large waves-effect waves-light floating-button-add"
							style={{ padding: 0, bottom: 16, right: 30, position: 'fixed' }}>
							<i className="material-icons">delete</i>
						</a>
				}
			</div>
		)
	}
}

export default Edit;