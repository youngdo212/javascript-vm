/*
아이템 선택 버튼에 이벤트를 등록하는 클래스
*/
class SelectButtonList{
  constructor({selectButtonList}){
    this.$selectButtonList = selectButtonList
  }

  bindSelectItem(handler){
    this.$selectButtonList.addEventListener('click', ({target}) => {
      if(target.tagName !== 'BUTTON') return;
      handler(target.textContent);
    })
  }
}

export {SelectButtonList};