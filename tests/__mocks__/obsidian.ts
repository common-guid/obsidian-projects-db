export class Events {
  on(name: string, callback: (...args: any[]) => any, ctx?: any) {
    if (!this._events) this._events = {};
    if (!this._events[name]) this._events[name] = [];
    this._events[name].push({callback, ctx});
    return {name, callback, ctx};
  }
  trigger(name: string, ...args: any[]) {
    if (!this._events || !this._events[name]) return;
    this._events[name].forEach((e: any) => e.callback.apply(e.ctx, args));
  }
  private _events: any;
}

export class Plugin {
  constructor(app: any, manifest: any) {
    this.app = app;
    this.manifest = manifest;
  }
  async onload() {}
  onunload() {}
  registerEvent(eventRef: any) {}
  registerView(type: string, viewCreator: any) {}
  addRibbonIcon(icon: string, title: string, callback: any) {
    return { icon, title, callback };
  }
  addCommand(command: any) {}
  app: any;
  manifest: any;
}

export class ItemView {
  constructor(leaf: any) {
    this.leaf = leaf;
  }
  leaf: any;
  getViewType() { return ''; }
  getDisplayText() { return ''; }
  onOpen() {}
  onClose() {}
}

export class MetadataCache extends Events {}

export const App = {
  metadataCache: new MetadataCache(),
  workspace: {
    getLeavesOfType: (type: string) => [],
    revealLeaf: (leaf: any) => {},
    getLeaf: (type: string) => ({ setViewState: (state: any) => {} }),
    getRightLeaf: (toggle: boolean) => ({ setViewState: (state: any) => {} }),
  }
};
