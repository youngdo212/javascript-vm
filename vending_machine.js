let menu = data.menu;
let moneyTypes = data.moneyTypes
let menuContainer = document.querySelector(".menu")
let moneyButtonsContainer = document.querySelector(".money_buttons")
let moneyCountsContainer = document.querySelector(".money_counts")
let monitorInsertedAmount = document.querySelector(".monitor_inserted_amount");
let walletTotalAmount = document.querySelector(".total_amount");
let moneyCounts = document.querySelector(".money_counts").childNodes

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

function initWallet() {
	for(let i = 0; i < moneyTypes.length; i++) {
	    let button = document.createElement("button")
	    let moneyCount = document.createElement("span")
	    button.textContent = moneyTypes[i]
	    button.addEventListener("click", function() {
	    	let thisType = parseInt(this.innerHTML)
	    	let thisCountContainer = document.getElementById(thisType + "type")
	    	let thisCount = parseInt(thisCountContainer.textContent)

	    	if(thisCount > 0) {
	    		let currInsertedAmount = parseInt(monitorInsertedAmount.textContent)
		    	let newInsertedAmount = thisType + currInsertedAmount
				monitorInsertedAmount.textContent = newInsertedAmount + " 원";

				let currWalletAmount = parseInt(walletTotalAmount.textContent)
				let newWalletAmount = currWalletAmount - thisType 
				walletTotalAmount.textContent = newWalletAmount 

				thisCountContainer.textContent = (thisCount - 1) + " 개"
	    	}	    	
	    });
	    moneyCount.textContent = "1 개"
	    moneyCount.id = moneyTypes[i] + "type";
	    moneyButtonsContainer.appendChild(button)
	    moneyCountsContainer.appendChild(moneyCount)
	}
    walletTotalAmount.textContent = getWalletTotalAmount() + " 원"
}

function getWalletTotalAmount() {
    let totalAmount = 0
    for(let i = 0; i < moneyCounts.length; i++) {
        let moneyCount = parseInt(moneyCounts[i].textContent)
        let moneyType = parseInt(moneyCounts[i].id)
        totalAmount += moneyType * moneyCount
    }
    return totalAmount
}

initMenu();
initWallet();
