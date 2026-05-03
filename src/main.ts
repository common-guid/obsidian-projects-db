import {Plugin} from 'obsidian';

/**
 * Main plugin class for Obsidian TaskDB.
 */
class TaskDBPlugin extends Plugin {
  /**
   * Initializes the plugin, registering events and commands.
   */
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

  /**
   * Cleanup logic when the plugin is disabled.
   */
  onunload() {
    console.log('Unloading Obsidian TaskDB Plugin');
  }
}

export {TaskDBPlugin};
