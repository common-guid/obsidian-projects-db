export class Plugin {
  onload() {}
  registerBasesView() {}
}

export class Component {
  addChild() {}
  removeChild() {}
}

// Global mocks for Bases
(global as any).BasesView = class {
  constructor(public controller: any) {}
  createDiv() {}
};
