let menu = data.menu;
let money_types = data.money_types
let menu_container = document.querySelector(".menu")
let money_buttons_container = document.querySelector(".money_buttons")
let money_counts_container = document.querySelector(".money_counts")
let monitor_inserted_amount = document.querySelector(".monitor_inserted_amount"); 

function init_wallet() {
	for(i in money_types) {
	    let button = document.createElement("button")
	    let money_count = document.createElement("span")
	    button.textContent = money_types[i]
	    button.addEventListener("click", function() {
	    	let amount = parseInt(this.innerHTML) + parseInt(monitor_inserted_amount.textContent);
	    	monitor_inserted_amount.textContent = amount + " 원"; 
	    	// 카운트 뺴는거 해야됨 
	    });
	    money_count.textContent = "0 개"
	    money_buttons_container.appendChild(button)
	    money_counts_container.appendChild(money_count)
	}	
}

function init_menu() {
	for(let i = 0; i < menu.length; i++) {
		item = menu[i]; 

		let item_container = document.createElement("div"); 
		let namefield = document.createElement("span"); 
		namefield.id = "item" + (i + 1); 
		let pricefield = document.createElement("span"); 
		pricefield.id = "item" + (i + 1);

		namefield.textContent = item.name; 
		pricefield.textContent = (i + 1) + ". " + item.price; 

		console.log(item.name); 
		console.log(item.price); 
		item_container.appendChild(namefield); 
		item_container.appendChild(pricefield); 

		menu_container.appendChild(item_container); 
	}
}

init_wallet();
init_menu(); 


