let menu = data.menu;
let moneyTypes = data.moneyTypes
let menuContainer = document.querySelector(".menu")
let moneyButtonsContainer = document.querySelector(".money_buttons")
let moneyCountsContainer = document.querySelector(".money_counts")
let monitorInsertedAmount = document.querySelector(".monitor_inserted_amount");
let walletTotalAmount = document.querySelector(".total_amount");

function initWallet() {
	for(let i = 0; i < moneyTypes.length; i++) {
	    let button = document.createElement("button")
	    let moneyCount = document.createElement("span")
	    button.textContent = moneyTypes[i]
	    button.addEventListener("click", function() {
	    	let amount = parseInt(this.innerHTML) + parseInt(monitorInsertedAmount.textContent);
	    	monitorInsertedAmount.textContent = amount + " 원";
	    	// 카운트 뺴는거 해야됨
	    });
	    moneyCount.textContent = "1 개"
	    moneyCount.id = moneyTypes[i] + "type";
	    moneyButtonsContainer.appendChild(button)
	    moneyCountsContainer.appendChild(moneyCount)
	}
    walletTotalAmount.textContent = getWalletTotalAmount() + " 원"
}

function getWalletTotalAmount() {
	let moneyCounts = document.querySelector(".money_counts").childNodes
    let totalAmount = 0
    for(let i = 1; i < moneyCounts.length; i++) {
        let moneyCount = parseInt(moneyCounts[i].textContent)
        let moneyType = parseInt(moneyCounts[i].id)
        totalAmount += moneyType * moneyCount
    }
    return totalAmount
}

function initMenu() {
	for(let i = 0; i < menu.length; i++) {
		item = menu[i];

		let itemContainer = document.createElement("div");
		let namefield = document.createElement("span");
		namefield.id = "item" + (i + 1);
		let pricefield = document.createElement("span");
		pricefield.id = "item" + (i + 1);

		namefield.textContent = item.name;
		pricefield.textContent = (i + 1) + ". " + item.price;

		itemContainer.appendChild(namefield);
		itemContainer.appendChild(pricefield);

		menuContainer.appendChild(itemContainer);
	}
}

initWallet();
initMenu();
