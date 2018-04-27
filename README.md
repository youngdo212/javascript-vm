# javascript-vm
레벨3


### 01 html 설계 하기 

자판기 
* 상품들 
* 버튼들 
* 디스플레이 창 입력된 금액
* 로그 창 행동들 기록 

지갑 
* 버튼들
* 디스플레이 창 갖고 있는 금액

## 02 css 자판기 상품들만 layout Design

### CSS Text vertical 가운데 정렬 !!!

```css

//부모
position: relative;
//자식
transform: translate(-50%,-50%);
position: absolute;
top: 50%;
left: 50%;

or 하위 지원도 가능함 ! 

//부모
display: table
//자식
display: table-cell;
vertical-align: middle;


```