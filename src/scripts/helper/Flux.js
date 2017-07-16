import Fluxify from 'fluxify';

const flux = Fluxify.createStore({
	id: 'NoteClient',
	initialState: {
		notes: [],
	},
	actionCallbacks: {
		updateNotes: (updater, notes) => {
			updater.set({ notes: notes.slice() });
		}
	}
});

export default flux;