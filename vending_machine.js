let menu = data.menu
let moneyTypes = data.moneyTypes

let menuContainer = document.querySelector(".menu")

let monitorConsole = document.querySelector(".monitor_console")
let monitorInsertedAmount = document.querySelector(".monitor_inserted_amount")
let monitorButtons = document.querySelector(".monitor_number_buttons")
let monitorCurrSelected = document.querySelector(".monitor_curr_selected")

let walletTotalAmount = document.querySelector(".total_amount");
let moneyButtonsContainer = document.querySelector(".money_buttons")
let moneyCounts = document.querySelector(".money_counts").childNodes
let moneyCountsContainer = document.querySelector(".money_counts")

let selected = ""
let selectTimer
let returnTimer

function initMenu() {
	for(let i = 0; i < menu.length; i++) {
		item = menu[i]
		let nameHtml = "<span id='name'>" + item.name + "</span>"
		let priceHtml = "<span id='price'>" + (i + 1) + ". " + item.price + "</span>"
		let html = "<div>" + nameHtml + priceHtml + "</div>"
		menuContainer.innerHTML += html
	}
}

function initMonitor() {
	let buttons = monitorButtons.children

	// for(let i = 0; i < buttons.length; i++) {
	// 	let currButton = buttons[i]
    //
	// 	currButton.addEventListener("click", function() {
    //         clearTimeout(selectTimer)
	// 		clearTimeout(returnTimer)
	// 		let currValue = parseInt(this.textContent)
	// 		selected += currValue
	// 		monitorCurrSelected.textContent = selected
    //
    //         if(parseInt(selected) > menu.length || parseInt(selected) < 1) {
    //             addLog("입력한 번호의 메뉴가 없습니다.")
    //             selected = ""
    //             monitorCurrSelected.textContent = selected
    //
    //             return
    //         }
    //
    //         selectTimer = setTimeout(function() {
    //             selectMenuItem()
	// 			updateAffordableItems()
    //         }, 3000)
	// 	})
	// }

	monitorButtons.addEventListener("click", function(event) {
		if(event.target.nodeName === "BUTTON") {
			clearTimeout(selectTimer)
			clearTimeout(returnTimer)
			let currValue = parseInt(event.target.textContent)
			selected += currValue
			monitorCurrSelected.textContent = selected

            if(parseInt(selected) > menu.length || parseInt(selected) < 1) {
                addLog("입력한 번호의 메뉴가 없습니다.")
                selected = ""
                monitorCurrSelected.textContent = selected
                return
            }

            selectTimer = setTimeout(function() {
                selectMenuItem()
				updateAffordableItems()
            }, 3000)
		}
	})
}

function selectMenuItem() {
	let selectedMenu = menu[selected-1]
	let menuName = selectedMenu.name
	let menuPrice = selectedMenu.price

	let insertedAmount = parseInt(monitorInsertedAmount.textContent)
	if(insertedAmount < menuPrice) {
        addLog("잔액이 부족합니다.")
    } else {
    	addLog(selected + "번 " + menuName + " 선택됨.")
    	monitorInsertedAmount.textContent = insertedAmount - menuPrice
    }

    selected = ""
    monitorCurrSelected.textContent = selected

	returnTimer = setTimeout(function() {
		changeObj = getReturnChange(parseInt(monitorInsertedAmount.textContent))
	    applyChange(changeObj)
		updateAffordableItems()
	}, 3000)
}

function applyChange(change) {
	for(var key in change) {
		walletMoneyCount = document.getElementById(key + "type")
		if (change[key]) {
			walletMoneyCount.textContent = (parseInt(walletMoneyCount.textContent) + change[key]) + " 개"
		}
	}

	walletTotalAmount.textContent = getWalletTotalAmount() + " 원"
}

function getReturnChange(amount) {
	let initialAmount = amount
	let retval = {}
	for(let i = moneyTypes.length - 1; i >= 0; i--) {
		while(parseInt(moneyTypes[i]) <= amount) {
			amount -= parseInt(moneyTypes[i])

			if(retval[moneyTypes[i]]) {
				retval[moneyTypes[i]] += 1
			} else {
				retval[moneyTypes[i]] = 1
			}
		}
	}

	addLog(initialAmount + "원 반환됨.")
	monitorInsertedAmount.textContent = 0 + " 원"

	return retval
}

function initWallet() {
	for(let i = 0; i < moneyTypes.length; i++) {
		let button = "<button>" + moneyTypes[i] + "원" + "</button>"
		let moneyCount = "<span id=" + moneyTypes[i] + "type>2 개</span>"
		moneyButtonsContainer.innerHTML += button
		moneyCountsContainer.innerHTML += moneyCount
	}
	moneyButtonsContainer.addEventListener("click", function(event) {
		if(event.target.nodeName === "BUTTON") {
			walletButtonEventListener(event.target)
		}
	})
    walletTotalAmount.textContent = getWalletTotalAmount() + " 원"
}

function updateAffordableItems() {
	let insertedAmount = parseInt(monitorInsertedAmount.textContent)
	let menuSpanTag = menuContainer.querySelectorAll("span")

	for(var i = 0; i < menu.length; i++) {
		if(menu[i].price <= insertedAmount) {
			menuSpanTag[i*2].style.backgroundColor = "#f4f142";
			menuSpanTag[i * 2 + 1].style.backgroundColor = "#f4f142";
		} else {
			menuSpanTag[i*2].style.backgroundColor = "#ffffff";
			menuSpanTag[i * 2 + 1].style.backgroundColor = "#ffffff";
		}
	}
}

function walletButtonEventListener(button) {
	let currType = parseInt(button.textContent)
	let currCountContainer = document.getElementById(currType + "type")
	let currCount = parseInt(currCountContainer.textContent)

	if(currCount > 0) {
		updateInsertedAmount(currType)
		updateAffordableItems()
		let currWalletAmount = parseInt(walletTotalAmount.textContent)
		let newWalletAmount = currWalletAmount - currType
		walletTotalAmount.textContent = newWalletAmount + " 원"

		currCountContainer.textContent = (currCount - 1) + " 개"

		addLog(currType + "원 투입됨.")
	}
}

function updateInsertedAmount(currType) {
	let currInsertedAmount = parseInt(monitorInsertedAmount.textContent)
	let newInsertedAmount = currType + currInsertedAmount
	monitorInsertedAmount.textContent = newInsertedAmount + " 원"
}

function addLog(message) {
	monitorConsole.innerHTML += message + "<br>"
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
