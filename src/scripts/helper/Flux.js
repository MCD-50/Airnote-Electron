import Fluxify from 'fluxify';

const flux = Fluxify.createStore({
	id: 'NoteClient',
	initialState: {
		notes: [],
		type: 'Note'
	},
	actionCallbacks: {
		updateNotes: (updater, notes) => {
			updater.set({ notes: notes.slice() });
		},
		updateType: (updater, type) => {
			updater.set({ type: type });
		}
	}
});

export default flux;