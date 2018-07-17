/*
log box에 로그를 찍는 클래스
*/
class LogBox{
  constructor({logBox}){
    this.$logBox = logBox;
  }

  printMessage(message){
    const log = document.createElement("DIV");
    const text = document.createTextNode(message);
    log.appendChild(text);

    if(this.$logBox.children.length >= 10) this.$logBox.removeChild(this.$logBox.firstElementChild);

    this.$logBox.appendChild(log);
  }
}

export {LogBox};