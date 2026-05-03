import {ItemView} from 'obsidian';

/**
 * Custom view type for TaskDB.
 */
const VIEW_TYPE_TASKDB = 'taskdb-view';

/**
 * TaskDB View class.
 */
class TaskDBView extends ItemView {
  getViewType() {
    return VIEW_TYPE_TASKDB;
  }

  getDisplayText() {
    return 'TaskDB';
  }

  async onOpen() {
    // To be implemented
  }

  async onClose() {
    // To be implemented
  }
}

export {VIEW_TYPE_TASKDB, TaskDBView};
