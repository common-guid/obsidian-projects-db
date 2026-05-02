export class Plugin {
    constructor(app, manifest) {
        this.app = app;
        this.manifest = manifest;
    }
    onload() {}
    onunload() {}
}

export class ItemView {
    constructor(leaf) {
        this.leaf = leaf;
    }
}

export const App = {};
