export class Plugin {
  app: any;
  constructor(app: any, _manifest: any) {
    this.app = app;
  }
  onload() {}
  registerBasesView(_viewId: string, _registration: any): boolean { return true; }
  addSettingTab(_tab: any) {}
  loadData() { return Promise.resolve({}); }
  saveData(_data: any) { return Promise.resolve(); }
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

export class PluginSettingTab {
  containerEl: HTMLElement = {
    empty: () => {},
    createEl: () => ({})
  } as any;
  constructor(public app: any, public plugin: any) {}
  display() {}
}

export class Setting {
  constructor(public containerEl: HTMLElement) {}
  setName(_name: string) { return this; }
  setDesc(_desc: string) { return this; }
  addColorPicker(_cb: (cp: any) => void) { return this; }
  addToggle(_cb: (t: any) => void) { return this; }
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
