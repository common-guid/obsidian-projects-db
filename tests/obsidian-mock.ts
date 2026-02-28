export class Plugin {
  onload() {}
  registerBasesView() {}
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
