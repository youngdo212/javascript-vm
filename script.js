document.addEventListener("DOMContentLoaded", function(event) {
    (function() { //make item list
        var ul = document.querySelector(".item_panel ul");
        item_list.forEach(function(value,index){
            var node = document.createElement("li");
            node.innerHTML = 
            "<div>"+value.name+"</div><div><span>"+(index+1)+"</span>. <span>"+value.cost+"</span></div>";
            ul.appendChild(node);
        });
    })();

    var item_panel = {
        li : document.querySelectorAll(".item_panel li"),
        highLighting :  function(){ //highLighting()
            var list = document.querySelectorAll(".item_panel li");
            var money_insert = parseInt(document.querySelector(".money_insert").value);
            
            list.forEach(function(value){
                var cost = parseInt(value.children[1].children[1].innerText);
                if (money_insert >= cost) {
                    value.classList.add("yellow");
                }
                else value.classList.remove("yellow");
            });

        },
        buyable : function(money_insert,index){
            console.log(money_insert);
            if(item_list.length < index || index <= 0){
                return "없는번호";
            }
            else if(item_list[index-1].cost > money_insert){
                return "잔액부족";
            }
            else return "구매가능";
        }
    }

    var select_panel = {
        timer : null,
        button_clicked  : document.querySelector(".button_clicked"),
        money_insert : document.querySelector(".money_insert"),
        run : function(){
            this.setSelectNumber();
        },
        setSelectNumber : function(){ 
            document.querySelector(".select_button").addEventListener("click",function(e){
                if(e.target && e.target.nodeName == "BUTTON"){
                    this.button_clicked.value += e.target.innerText;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(this.executeSelection.bind(this,this.button_clicked.value),3000);
                }
            }.bind(this)); //timer에 대한 접근을 위해 bind
        },
         statusLogChanger : function(arg){ 
            var statusLog = document.querySelector(".status_log");
            statusLog.value += arg;
            
            if (statusLog.selectionStart == statusLog.selectionEnd) {
                statusLog.scrollTop = statusLog.scrollHeight;
            }
        },

        executeSelection : function(index){
            //console.log(item_panel.buyable(this.money_insert.value,index)); //없는번호 , 잔액부족 , 구매가능
            var money_insert = this.money_insert;
            var money_have = money_panel.money_have;
            var flag;
            index && (flag = item_panel.buyable(money_insert.value,index));

            if(this.button_clicked.value == ""){//반환
                this.statusLogChanger(money_insert.value + "원 반환\n");
                money_have.value = parseInt(money_have.value)+ parseInt(money_insert.value);
                money_insert.value = "0";
                item_panel.highLighting();
                money_panel.refreshWallet();
            }
            else if(flag == "구매가능"){//구매
                this.money_insert.value -= item_list[index-1].cost;
                this.button_clicked.value = "";
                this.statusLogChanger(item_list[index-1].name + "선택됨\n");
                item_panel.highLighting();

                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
            else {//없는번호 , 잔액부족
                this.statusLogChanger(flag+"\n");
                document.querySelector(".button_clicked").value = "";
                
                clearTimeout(this.timer);
                this.timer = setTimeout(this.executeSelection.bind(this), 3000);
            }
            
        }
        
    }

    var money_panel = {
        money_button : document.querySelector(".money_button").children,
        money_have : document.querySelector(".money_have"),
        run : function() {
            this.refreshWallet();
            this.clickMoneyButton();
            document.querySelector(".refreshWallet").addEventListener("click",this.refreshWallet.bind(this));
        },
        clickMoneyButton : function(){
            var money_insert = document.querySelector(".money_insert");
    
            document.querySelector(".money_button").addEventListener("click",function(e){
                if (e.target && e.target.nodeName == "BUTTON"){
                    select_panel.statusLogChanger(e.target.innerText+"이 투입됨\n");
                    setHaveMoney(-e.target.parentNode.dataset.value);
                    setInsertMoney(e.target.parentNode.dataset.value);
                    this.refreshWallet();
                    item_panel.highLighting();
                }
            }.bind(this)); //refreshWallet에 대한 접근을 위한 bind
        },
        refreshWallet : function(){
            var money_button = document.querySelector(".money_button").children;
            var temp = this.money_have.value;
            for(var i = money_button.length-1;i>=0;i--){
                var container = money_button[i];
                var button = container.children[0];
                var span = container.children[1];
                var spanData = span.dataset;
                spanData.value = Math.floor(temp/container.dataset.value); 
                
                if(spanData.value == 0){
                    button.disabled = true;
                }
                else{
                    button.disabled = false;
                }

                span.innerText = spanData.value + "개";
                temp = temp % container.dataset.value;
            }
        }
    }        
    console.log("DOM fully loaded and parsed");
    money_panel.run();
    select_panel.run();
});

function setInsertMoney(arg){
    var money_insert = document.querySelector(".money_insert");
    money_insert.value = parseInt(money_insert.value) + parseInt(arg);
}
function setHaveMoney(arg){
    var money_have = document.querySelector(".money_have");
    money_have.value = parseInt(money_have.value) + parseInt(arg);
}
