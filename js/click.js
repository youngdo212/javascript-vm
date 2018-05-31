class Button{
  constructor(buttonList){
    this.buttons = Array.from(buttonList)
  }
  addClickPrintEvent(){
    this.buttons.forEach(button =>{
      button.addEventListener('click', function(){
        console.log(button.textContent);
      });
    })
  }
}

const moneyButtonList = document.querySelectorAll('.money_button');
const buttons = new Button(moneyButtonList);
buttons.addClickPrintEvent();