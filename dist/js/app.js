const vmTemplate = new VMTemplate();
const vmModel = new VMModel();
const vmView = new VMViewer();
const vmControl = new VMController(vmView);

vmTemplate.init();
vmControl.init();