import { Plugin } from 'obsidian';

export default class TaskDBPlugin extends Plugin {
	async onload() {
		console.log('Loading Obsidian TaskDB Plugin');
	}

	onunload() {
		console.log('Unloading Obsidian TaskDB Plugin');
	}
}
