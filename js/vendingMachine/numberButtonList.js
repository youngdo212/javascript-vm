/*
아이템 선택 버튼에 이벤트를 등록하는 클래스
*/
class NumberButtonList{
  constructor({numberButtonList}){
    this.$numberButtonList = numberButtonList
  }

  bindSelectNumber(handler){
    this.$numberButtonList.addEventListener('click', ({target}) => {
      if(target.tagName !== 'BUTTON') return;
      handler(target.textContent);
    })
  }
}

export {NumberButtonList};