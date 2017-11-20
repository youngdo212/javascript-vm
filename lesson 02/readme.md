# Google.co.kr 첫페이지 구성 정리

## Schema
~~~
<html itemscope itemtype="http://schema.org/WebPage" lang="ko"> == $0
~~~
- html 5를 확장하는 기능: 마이크로 데이터인 것 같다? [참고](http://www.carpeau.net/html5-semantic-sprinkles-microdata/)

## body
- div 태그 안에 있고 id가 body이다. 

### <div id="viewport">
- 페이지에 보이는 모든 구성요소는 viewport라는 아이디를 가진 div 안에 들어가 있다.
- 내부 구성요소도 div 태그 안에 들어있다.

### <div id="searchform">
- 검색 기능은 form 태그 안에 들어있고 메소드는 get이다. 
  - role이라는 속성을 지정하는 것은 처음 보는데 ARIA와 연관되어있는 것 같다.
- Google 검색, I'm Feeling Lucky 버튼은 input submit 태그이다. aria-label이라는 속성도 달려 있다.
  - input들을 감싸고 있는 것은 center 태그이다. center태그는 html 5에서 사라졌고 css로 쓰라고 하는데 구글도 이런 것을 써서 신기.
- 입력도구와 음성 검색은 a 태그로 감싸져 있다.
- 검색어 입력공간은 input text 태그이다.
- 검색어 자동완성 기능은 javascript로 구현된 것으로 보인다. 
  - 자동완성 내용들은 ul->li 태그들로 구성되어 있다.

### 상단 버튼들
- Gmail, 이미지 등은 a 태그로 링크되어 있다.
- 유튜브 등으로의 링크가 있는 구글 앱 버튼 안에는 ul > li 들로 내부 버튼이 나열되어 있고 버튼은 a 태그로 감싸여 있다.

### logo
- img 태그 안에 들어 있다.

## footer
- div 태그 안에 있고 id가 footer이다. 

## 주로 쓰이는 태그들
- div: 모든 것을 나누는 데 쓰인다. 중첩 처리도 많다. 
- span: 엘리먼트 라벨에 주로 쓰이는 것 같다.
- a: input이 아니라면 외부 링크에는 전부 a 태그가 쓰인다. 
- 그 외: center, iframe 등