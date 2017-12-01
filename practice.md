# DOM 조작 API

## 실습1 
### 지금 나온 DOM API를 사용해서, strawberry 아래에 새로운 과일을 하나 더 추가해보기. 추가 된 이후에는 다시 삭제해보기.
 http://jsbin.com/mebuha/1/edit?html,js,output 
```
var node = doccument.createElement("li");
node.innerText = "mango";
document.querySelector("ul").appendChild(node);
```

## 실습2
### 지금 나온 DOM API를 사용해서, 바나나와 오렌지 사이에 새로운 과일을 추가하기
 http://jsbin.com/mebuha/1/edit?html,js,output
```
var node = document.createElement("li");
node.innerText = "mango";
var list = document.querySelector("ul");
list.insertBefore(node,list.children[2]);
```

## 실습3
### apple을 grape 와 strawberry 사이로 옮기기.
 http://jsbin.com/mebuha/1/edit?html,js,output
```
var node = document.querySelector("ul");
var child = node.children[0]; //<li>apple</li>
node.insertBefore(child,node.children[4]);
```


## 실습4
### class 가 'red'인 노드만 삭제.
 http://jsbin.com/redetul/1/edit?html,css,js,output
```
var redNode = document.getElementsByClassName("red");
var node = document.querySelector("ul");
var i = redNode.length;
while(i--){
  node.removeChild(redNode[0]);
}
```

## 실습5
### section 태그의 자손 중에 blue라는 클래스를 가지고 있는 노드가 있다면, 그 하위에 있는 h2 노드를 삭제.
 http://jsbin.com/ricopa/1/edit?html,css,js,output
```
 var section = document.querySelectorAll("section");
 section.forEach(function(value){
	 if(value.querySelector("h2") !== null && value.querySelector(".blue") !== null ){
    value.removeChild(value.querySelector("h2"));
   }
 });
```

##  참고 
https://developer.mozilla.org/ko/docs/Web/API/Document/createElement
https://www.w3schools.com/jsref/dom_obj_document.asp
https://www.w3schools.com/jsref/dom_obj_all.asp

+ var node = document.createElement("LI"); // Create a \<li> node
+ var textnode = document.createTextNode("mango"); // Create a text node
+ node.appendChild(textnode); // \<li>mango\</li>

