document.addEventListener("DOMContentLoaded", setLoad);

function setLoad() {
    (function() { //make item list
        var ul = document.querySelector(".item_panel ul");
        item_list.forEach(function(key,index){
            var node = document.createElement("li");
            node.innerHTML = 
            "<div>"+key.name+"</div><div><span>"+(index+1)+"</span>. <span>"+key.price+"</span></div>";
            ul.appendChild(node);
        });
    })();

    (function(){ //make money_button list
        var buttonDiv = document.querySelector(".money_button");
        button_list.forEach(function(key,index){
            var node = document.createElement("div");
            node.innerHTML = "<button data-value="+index+">"+key.value+"원</button> <span>"+key.count+"개</span>";
            buttonDiv.appendChild(node);
        });
    }());
    
    var message = ["구매가능","없는번호","잔액부족"];
    var elements = { 
        money_button : document.querySelector(".money_button"),
        money_have : document.querySelector(".money_have"),
        money_insert : document.querySelector(".money_insert"),
        button_clicked : document.querySelector(".button_clicked"),
        status_log : document.querySelector(".status_log"),
        refresh_wallet : document.querySelector(".refreshWallet"),
        select_button : document.querySelector(".select_button")
    }

    var item_panel = {
        highLighting :  function(){
            var list = document.querySelectorAll(".item_panel li");
            
            list.forEach(function(value,index){
                var price = item_list[index].price;
                if (elements.money_insert.value >= price) {
                    value.classList.add("yellow");
                }
                else value.classList.remove("yellow");
            });

        },
        buyable : function(money_insert,index){
            if(item_list.length < index || index <= 0){
                return message[1];
            }
            else if(item_list[index-1].price > money_insert){
                return message[2];
            }
            else return message[0];
        }
    }

    var select_panel = {
        timer : null,
        run : function(){
            this.setSelectNumber();
        },
        setSelectNumber : function(){ 
            elements.select_button.addEventListener("click",function(e){
                if(e.target && e.target.nodeName == "BUTTON"){
                    elements.button_clicked.value += e.target.innerText;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this.executeSelection.bind(this,elements.button_clicked.value),3000);
                }
            }.bind(this)); 
        },
         addLog : function(arg){ 
            elements.status_log.value += arg;
            
            if (elements.status_log.selectionStart == elements.status_log.selectionEnd) {
                elements.status_log.scrollTop = elements.status_log.scrollHeight;
            }
        },

        executeSelection : function(index){
            var flag;
            index && (flag = item_panel.buyable(elements.money_insert.value,index));
            
            if(elements.button_clicked.value == ""){//반환
                this.addLog(elements.money_insert.value + "원 반환\n");
                elements.money_have.value = parseInt(elements.money_have.value)+ parseInt(elements.money_insert.value);
                elements.money_insert.value = "0";
                item_panel.highLighting();
                money_panel.refreshWallet();
            }
            else if(!message.indexOf(flag)){//구매가능
                elements.money_insert.value -= item_list[index-1].price;
                elements.button_clicked.value = "";
                this.addLog(item_list[index-1].name + " 선택됨\n");
                item_panel.highLighting();

                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
            else {//없는번호 , 잔액부족
                this.addLog(flag+"\n");
                elements.button_clicked.value = "";
                
                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
        }
        
    }

    var money_panel = {
        run : function() {
            this.refreshWallet();
            this.clickMoneyButton();
            elements.refresh_wallet.addEventListener("click",this.refreshWallet.bind(this));
        },
        clickMoneyButton : function(){
            elements.money_button.addEventListener("click",function(e){
                if (e.target && e.target.nodeName == "BUTTON"){
                    var value = button_list[e.target.dataset.value].value;
                    select_panel.addLog(e.target.innerText+"이 투입됨\n");
                    
                    setHaveMoney(-value);
                    setInsertMoney(value);
                    this.refreshWallet();
                    item_panel.highLighting();
                }
            }.bind(this)); 
        },
        refreshWallet : function(){
            var money_button = elements.money_button.children;
            var temp = elements.money_have.value;
            
            for(var i = button_list.length-1;i>=0;i--){
                button_list[i].count = Math.floor(temp/button_list[i].value);
                temp = temp % button_list[i].value;
                money_button[i].children[1].innerHTML =  button_list[i].count+"개";
                button_list[i].count == 0 ?
                 money_button[i].children[0].disabled = true : money_button[i].children[0].disabled = false;
            }
        }
    }        
    money_panel.run();
    select_panel.run();
}
function setInsertMoney(arg){
    var money_insert = document.querySelector(".money_insert");
    money_insert.value = parseInt(money_insert.value) + parseInt(arg);
}
function setHaveMoney(arg){
    var money_have = document.querySelector(".money_have");
    money_have.value = parseInt(money_have.value) + parseInt(arg);
}
