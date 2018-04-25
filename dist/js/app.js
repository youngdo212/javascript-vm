const render = new Renders();
const vmView = new VMViewer();
const vmControl = new VMController(vmView);

render.init();
vmControl.init();