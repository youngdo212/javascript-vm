// print
walletButtonListElement.addEventListener('click',(e)=>{
  if(e.target.localName!=="button") return;
  // console.dir(e.target);
  const choseMoney =e.target.dataset.money
  const moneyCountElement = e.target.nextElementSibling
  let moneyCount = wallet.getCountKinds(choseMoney)
  // 해당 돈의 종류가 있으면 
  if(moneyCount){
    wallet.useMoney(choseMoney);
    moneyCountElement.innerText=`${moneyCount-1}개`
    walletTotalMoneyElement.innerText = `${wallet.totalMoney}`   
    vendingMachine.insertMoney(Number(choseMoney));
    vendingMachineMoneyElement.innerText = `${vendingMachine.money}`
  }
})