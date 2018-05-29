const moneyButtonList = document.querySelectorAll('.money_button');

Array.from(moneyButtonList).forEach(button=>{
  button.addEventListener('click', function(){
    console.log(button.textContent);
  });
})