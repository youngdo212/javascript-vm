/*
log box에 로그를 찍는 클래스
*/
class LogBox{
  constructor({logBox, maxMessageNumber = 10}){
    this.$logBox = logBox;
    this.MAX_MESSAGE_NUMBER = maxMessageNumber;
  }

  appendMessage(message){
    this._hasMaxMessage(this.$logBox, this.MAX_MESSAGE_NUMBER) && this._deleteFirstMessage(this.$logBox);

    let messageElem = this._makeMessageElem(message);
    this.$logBox.appendChild(messageElem);
  }

  _makeMessageElem(message){
    let messageElem = document.createElement("DIV");
    let textNode = document.createTextNode(message);
    messageElem.appendChild(textNode);

    return messageElem;
  }

  _deleteFirstMessage(logBox){
    let firstMessage = logBox.firstElementChild;
    logBox.removeChild(firstMessage);
  }

  _hasMaxMessage(logBox, maxMessageNumber){
    let messageNumber = logBox.children.length;
    return messageNumber === maxMessageNumber;
  }
}

export {LogBox};