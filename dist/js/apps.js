var vmView = VMViewer(coin, snacksList);
var vmTemplate = VMTemplate(vmView);
var vmControl = VMController(vmView, vmTemplate);


Object.setPrototypeOf(vmTemplate, templateObj);
Object.setPrototypeOf(vmView, viewerObj);
Object.setPrototypeOf(vmControl, controllerObj);


vmControl.init();