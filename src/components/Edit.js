

import React, { Component } from 'react';
import Flux from '../scripts/helper/Flux';
import Fluxify from 'fluxify';

import { getCreatedOn } from '../scripts/helper/Collection';
import { EditorState, ContentState, CompositeDecorator } from 'draft-js'
import mediumDraftExporter from 'medium-draft/lib/exporter';

import {
	Editor as MediumEditor,
	findLinkEntities,
	Link
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
			html: '',
			text: '',
			editorState: this.setEditorSate('Loading...')
		};

		this.onEditorStateChange = this.onEditorStateChange.bind(this);
		this.setEditorSate = this.setEditorSate.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			try {
				const item = this.props.location.state.item || null;
				if (item) {
					this.setState({
						editorState: this.setEditorSate(item.description),
						note: item
					});
				} else {
					this.setState({ editorState: this.setEditorSate('') });
				}
			} catch (e) {
				this.setState({ editorState: this.setEditorSate('') });
			}
		}, 30);
	}

	setEditorSate(text) {
		return EditorState.createWithContent(ContentState.createFromText(text), decorator)
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState: editorState,
			html: mediumDraftExporter(editorState.getCurrentContent()),
			text: editorState.getCurrentContent().getPlainText() || ''
		});
		console.log(this.state.html);
	}

	render() {
		return (
			<div style={{ maxWidth:800, margin:'auto', marginTop:70 }}>
				<MediumEditor
					ref="medium_editor"
					placeholder="Make a note"
					spellCheck={true}
					editorState={this.state.editorState}
					onChange={this.onEditorStateChange} />
			</div>
		)
	}
}

export default Edit;