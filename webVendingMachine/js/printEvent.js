rederingView.getSearched('.money-button-list').addEventListener('click',(e)=>{
  if(e.target.localName!=="button") return;
  const choseMoney =e.target.dataset.money
  const moneyCountElement = e.target.nextElementSibling
  let moneyCount = wallet.moneyKinds[choseMoney]
  // 해당 돈의 종류가 있으면 
  if(moneyCount){
    const willUseMoney = wallet.useMoney(Number(choseMoney));
    moneyCountElement.innerText=`${wallet.moneyKinds[choseMoney]}개`
    vendingMachine.insertMoney(willUseMoney);
    viewUpdateWalletTotal();
    viewUpdateInsertedMoney();
  }
})