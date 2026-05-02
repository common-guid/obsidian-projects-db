export class Events {
    on(name, callback, ctx) {
        if (!this._events) this._events = {};
        if (!this._events[name]) this._events[name] = [];
        this._events[name].push({ callback, ctx });
        return { name, callback, ctx };
    }
    trigger(name, ...args) {
        if (!this._events || !this._events[name]) return;
        this._events[name].forEach(e => e.callback.apply(e.ctx, args));
    }
}

export class Plugin {
    constructor(app, manifest) {
        this.app = app;
        this.manifest = manifest;
    }
    async onload() {}
    onunload() {}
    registerEvent(eventRef) {}
}

export class ItemView {
    constructor(leaf) {
        this.leaf = leaf;
    }
}

export class MetadataCache extends Events {}

export const App = {
    metadataCache: new MetadataCache()
};
