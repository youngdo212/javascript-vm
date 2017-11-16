
function main() {
    const vendingMachine = {
        model: vm.model,
        view: vm.view,
        controller: vm.controller,
        run: function() {
            this.controller.init(this.model, this.view);
        }
    }

    vendingMachine.run();
}

document.addEventListener('DOMContentLoaded', main);
