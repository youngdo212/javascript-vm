let money_types = data.money_types
let money_buttons_container = document.querySelector(".money_buttons")
let money_counts_container = document.querySelector(".money_counts")

for(i in money_types) {
    let button = document.createElement("button")
    let money_count = document.createElement("span")
    button.textContent = money_types[i]
    money_count.textContent = "0 개"
    money_buttons_container.appendChild(button)
    money_counts_container.appendChild(money_count)
}
