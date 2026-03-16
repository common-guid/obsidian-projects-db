export class Plugin {
  app: any;
  constructor(app: any, _manifest: any) {
    this.app = app;
  }
  onload() {}
  registerBasesView(_viewId: string, _registration: any): boolean { return true; }
}

export class Component {
  addChild() {}
  removeChild() {}
}

export class BasesView {
  app: any;
  data: any;
  constructor(public controller: any) {}
}

(global as any).BasesView = BasesView;

(global as any).document = {
  createElement: () => ({
    createDiv: () => ({
      empty: () => {},
      createDiv: () => {}
    })
  })
};
