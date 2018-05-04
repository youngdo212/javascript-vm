const walletButtonList = document.querySelectorAll('.wallet-money-buttonSet > button')
console.log(walletButtonList)
const map = (list, fn)=> {
  const mappingList = [];
  for(item of list){
    mappingList.push(fn(item))
  }
  return mappingList;
}
map(walletButtonList, (button)=>{
  button.addEventListener('click',(e)=>{
    console.log(e.target.innerText)
  })
})