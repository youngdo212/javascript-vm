
function main() {
    var vendingMachine = {
        model: app.model,
        view: app.view,
        controller: app.controller,
        run: function() {
            this.controller.init(this.model, this.view);
        }
    }

    vendingMachine.run();
}

document.addEventListener('DOMContentLoaded', main);
