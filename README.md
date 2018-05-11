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

### MVC 패턴 설계 하기 



1. Model 

VendingMachineModel
WalletModel
View


vendingMachineView 

1. 초기 렌더링 
[O] Dom이 load될 때  snackList, buttonList, .. 정적 template 을 렌더한다 
 -> + myMoney를 바탕으로 -> totalMoney까지 렌더링한다.

2.
[O] 돈 입력 버튼이 클릭 되었을 때 해당 돈이 있으면  토탈 금액이 클릭된 금액 만큼 감소하고 + 해당 금액 갯수가 감소된다. 
질문  
1. 이 처리를 뷰에서만 하고 data로 넘겨줘서 처리 하는지 ->  view->event->viewupdate->controller->model
2. 이벤트를 넘겨주고 data가 업데이트 된다음 뷰를 업데이트 시켜주는지 ?.?
view -event-> controller->model->controller -> view

처음에 1번 방향으로 진행하려 했는데 데이터를 뷰에서 처리해줘야 되는 부분이 어색하다... 
2번으로 다시 선회 

[ ] 검색 상품명 입력 폼이 위치한다. 검색어가 없는 경우이므로 x 버튼을 숨긴다

[ ] 검색어를 입력하면 x버튼이 보인다

[ ] 엔터를 입력하면 검색 결과가 보인다

[ ] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다

검색 결과 구현
[ ] 검색 결과가 검색폼 아래 위치한다

[ ] 검색 결과가 보인다

[ ] x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다

탭 구현
[ ] 추천 검색어, 최근 검색어 탭이 검색폼 아래 위치한다

[ ] 기본으로 추천 검색어 탭을 선택한다

[ ] 각 탭을 클릭하면 탭 아래 내용이 변경된다

추천 검색어 구현
[ ] 번호, 추천 검색어 목록이 탭 아래 위치한다

[ ] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동

[ ] 검색폼에 선택된 추천 검색어 설정

최근 검색어 구현
[ ] 최근 검색어, 목록이 탭 아래 위치한다

[ ] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동

[ ] 검색일자, 버튼 목록이 있다

[ ] 목록에서 x 버튼을 클릭하면 선택된 검색어가 목록에서 삭제

[ ] 검색시마다 최근 검색어 목록에 추가된다


