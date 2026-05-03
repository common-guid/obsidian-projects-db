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
  app: any;
  manifest: any;
}

export class ItemView {
  constructor(leaf: any) {
    this.leaf = leaf;
  }
  leaf: any;
}

export class MetadataCache extends Events {}

export const App = {
  metadataCache: new MetadataCache(),
};
