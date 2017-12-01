var vm = {

    message : ["구매가능","없는번호","잔액부족"],
    
    item_panel : {
        init : function(){
          this.makeItemList();  
        },
        makeItemList : function() { //make item list
            var ul = document.querySelector(".item_panel ul");
            item_list.forEach(function(key,index){
                var node = document.createElement("li");
                node.innerHTML = 
                "<div>"+key.name+"</div><div><span>"+(index+1)+"</span>. <span>"+key.price+"</span></div>";
                ul.appendChild(node);
            });
        },
        highLighting :  function(){
            var list = document.querySelectorAll(".item_panel li");
            
            list.forEach(function(value,index){
                var price = item_list[index].price;
                if (vm.select_panel.moneyInsert.value >= price) {
                    value.classList.add("yellow");
                }
                else value.classList.remove("yellow");
            });

        },
        buyable : function(money_insert,index){
            if(item_list.length < index || index <= 0){
                return vm.message[1];
            }
            else if(item_list[index-1].price > money_insert){
                return vm.message[2];
            }
            else return vm.message[0];
        }
    },

    select_panel : {
        timer : null,
        init : function(){
            this.clickButtonWindow = document.querySelector(".button_clicked");
            this.statusLog = document.querySelector(".status_log");
            this.moneyInsert = document.querySelector(".money_insert");
            this.selectButton = document.querySelector(".select_button");
            
            this.setSelectNumber();
        },
        setInsertMoney : function(arg){
            var money_insert = this.moneyInsert;
            money_insert.value = parseInt(money_insert.value) + parseInt(arg);
        },
        setSelectNumber : function(){ 
            this.selectButton.addEventListener("click",function(e){
                if(e.target && e.target.nodeName == "BUTTON"){
                    this.clickButtonWindow.value += e.target.innerText;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this.executeSelection.bind(this,this.clickButtonWindow.value),3000);
                }
            }.bind(this)); 
        },
         addLog : function(arg){ 
            this.statusLog.value += arg;
            
            if (this.statusLog.selectionStart == this.statusLog.selectionEnd) {
                this.statusLog.scrollTop = this.statusLog.scrollHeight;
            }
        },
        executeSelection : function(index){
            var flag = null;
            index && (flag = vm.item_panel.buyable(this.moneyInsert.value,index));
            
            if(this.clickButtonWindow.value == ""){//반환
                this.addLog(this.moneyInsert.value + "원 반환\n");
                vm.money_panel.moneyHave.value = parseInt(vm.money_panel.moneyHave.value)+ parseInt(this.moneyInsert.value);
                this.moneyInsert.value = "0";
                vm.item_panel.highLighting();
                vm.money_panel.refreshWallet();
            }
            else if(!vm.message.indexOf(flag)){//구매가능
                this.moneyInsert.value -= item_list[index-1].price;
                this.clickButtonWindow.value = "";
                this.addLog(item_list[index-1].name + " 선택됨\n");
                vm.item_panel.highLighting();

                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
            else {//없는번호 , 잔액부족
                this.addLog(flag+"\n");
                this.clickButtonWindow.value = "";
                
                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
        }
    },

    money_panel : {
        init : function() {
            this.moneyHave = document.querySelector(".money_have");
            this.moneyButton = document.querySelector(".money_button");
            this.refreshButton = document.querySelector(".refreshWallet");
            
            this.makeButtonList();
            this.refreshWallet();
            this.clickMoneyButton();
            this.refreshButton.addEventListener("click",this.refreshWallet.bind(this));
        },
        makeButtonList : function(){ //make money_button list
            button_list.forEach(function(key,index){
                var node = document.createElement("div");
                node.innerHTML = "<button data-value="+index+">"+key.value+"원</button> <span>"+key.count+"개</span>";
                this.moneyButton.appendChild(node);
            }.  bind(this));
        },
        setHaveMoney : function(arg){ //넣을까;
            this.moneyHave.value = parseInt(this.moneyHave.value) + parseInt(arg);
        },
        clickMoneyButton : function(){
            this.moneyButton.addEventListener("click",function(e){
                if (e.target && e.target.nodeName == "BUTTON"){
                    var value = button_list[e.target.dataset.value].value;
                    vm.select_panel.addLog(e.target.innerText+"이 투입됨\n");
                    
                    this.setHaveMoney(-value);
                    vm.select_panel.setInsertMoney(value);
                    this.refreshWallet();
                    vm.item_panel.highLighting();
                }
            }.bind(this)); 
        },
        refreshWallet : function(){
            var buttonList = this.moneyButton.children;
            var temp = this.moneyHave.value;
            
            for(var i = button_list.length-1;i>=0;i--){
                button_list[i].count = Math.floor(temp/button_list[i].value);
                temp = temp % button_list[i].value;
                buttonList[i].children[1].innerHTML =  button_list[i].count+"개";
                button_list[i].count == 0 ?
                 buttonList[i].children[0].disabled = true : buttonList[i].children[0].disabled = false;
            }
        }
    }        
}

function init(){
    vm.item_panel.init();
    vm.select_panel.init();
    vm.money_panel.init();
}

window.addEventListener("DOMContentLoaded", init);