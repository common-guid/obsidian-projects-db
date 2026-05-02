import { Plugin } from 'obsidian';

export default class TaskDBPlugin extends Plugin {
	async onload() {
		console.log('Loading Obsidian TaskDB Plugin');

		this.registerEvent(
			this.app.metadataCache.on('changed', (file) => {
				// TODO: Trigger re-parsing and state update
			})
		);

		this.registerEvent(
			this.app.metadataCache.on('resolved', () => {
				// TODO: Trigger initial scan or full refresh
			})
		);
	}

	onunload() {
		console.log('Unloading Obsidian TaskDB Plugin');
	}
}
