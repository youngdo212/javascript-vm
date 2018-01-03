let menu = data.menu
let moneyTypes = data.moneyTypes

let menuContainer = document.querySelector(".menu")

let monitorConsole = document.querySelector(".monitor_console")
let monitorInsertedAmount = document.querySelector(".monitor_inserted_amount")
let monitorButtons = document.querySelector(".monitor_number_buttons")

let walletTotalAmount = document.querySelector(".total_amount");
let moneyButtonsContainer = document.querySelector(".money_buttons")
let moneyCounts = document.querySelector(".money_counts").childNodes
let moneyCountsContainer = document.querySelector(".money_counts")

let selected = "" 

function initMenu() {
	for(let i = 0; i < menu.length; i++) {
		item = menu[i]

		let itemContainer = document.createElement("div")
		let namefield = document.createElement("span")
		namefield.id = "item" + (i + 1)
		let pricefield = document.createElement("span")
		pricefield.id = "item" + (i + 1)

		namefield.textContent = item.name;
		pricefield.textContent = (i + 1) + ". " + item.price

		itemContainer.appendChild(namefield)
		itemContainer.appendChild(pricefield)

		menuContainer.appendChild(itemContainer)
	}
}

function initMonitor() {
	let buttons = monitorButtons.children

	for(let i = 0; i < buttons.length; i++) {
		let currButton = buttons[i] 

		currButton.addEventListener("click", function() {
			let currValue = this.innerHTML 
			selected += currValue 

			addLog(selected)
		})
	}
}

function initWallet() {
	for(let i = 0; i < moneyTypes.length; i++) {
	    let button = document.createElement("button")
	    let moneyCount = document.createElement("span")
	    button.textContent = moneyTypes[i]
	    button.addEventListener("click", function() {
	    	let currType = parseInt(this.innerHTML)
	    	let currCountContainer = document.getElementById(currType + "type")
	    	let currCount = parseInt(currCountContainer.textContent)

	    	if(currCount > 0) {
	    		let currInsertedAmount = parseInt(monitorInsertedAmount.textContent)
		    	let newInsertedAmount = currType + currInsertedAmount
				monitorInsertedAmount.textContent = newInsertedAmount + " 원"

				let currWalletAmount = parseInt(walletTotalAmount.textContent)
				let newWalletAmount = currWalletAmount - currType 
				walletTotalAmount.textContent = newWalletAmount 

				currCountContainer.textContent = (currCount - 1) + " 개"

				addLog(currType + "원 투입됨.")
	    	}	    	
	    })
	    moneyCount.textContent = "1 개"
	    moneyCount.id = moneyTypes[i] + "type";
	    moneyButtonsContainer.appendChild(button)
	    moneyCountsContainer.appendChild(moneyCount)
	}
    walletTotalAmount.textContent = getWalletTotalAmount() + " 원"
}

function addLog(message) {
	monitorConsole.appendChild(document.createTextNode(message))
	monitorConsole.appendChild(document.createElement("br"))
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

initMenu()
initMonitor()
initWallet()
