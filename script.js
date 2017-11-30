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

    var elements = { //전역으로 사용하지만 뭔가 코드들이 길어지는 느낌
        money_button : document.querySelector(".money_button"),
        money_have : document.querySelector(".money_have"),
        money_insert : document.querySelector(".money_insert"),
        button_clicked : document.querySelector(".button_clicked"),
        status_log : document.querySelector(".status_log"),
        refresh_wallet : document.querySelector(".refreshWallet"),
        select_button : document.querySelector(".select_button")
    }

    var item_panel = {
        highLighting :  function(){ //highLighting()
            var list = document.querySelectorAll(".item_panel li");
            
            list.forEach(function(value,index){
                var cost = item_list[index].cost;
                if (elements.money_insert.value >= cost) {
                    value.classList.add("yellow");
                }
                else value.classList.remove("yellow");
            });

        },
        buyable : function(money_insert,index){
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
            }.bind(this)); //timer에 대한 접근을 위해 bind
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
            else if(flag == "구매가능"){//구매
                elements.money_insert.value -= item_list[index-1].cost;
                elements.button_clicked.value = "";
                this.addLog(item_list[index-1].name + "선택됨\n");
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
                    var value = e.target.parentNode.dataset.value;
                    select_panel.addLog(e.target.innerText+"이 투입됨\n");
                    
                    setHaveMoney(-value);
                    setInsertMoney(value);
                    this.refreshWallet();
                    item_panel.highLighting();
                }
            }.bind(this)); //refreshWallet에 대한 접근을 위한 bind
        },
        refreshWallet : function(){
            var money_button = elements.money_button.children;
            var temp = elements.money_have.value;
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
